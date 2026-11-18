import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { BETA_FROM, MARIA_EMAIL, mariaNotification, testerConfirmation, type BetaSignup } from './emails'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

async function verifyTurnstile(secret: string, token: unknown, forwardedFor: string | null): Promise<boolean> {
  if (typeof token !== 'string' || !token) return false
  const form = new URLSearchParams({ secret, response: token })
  const ip = forwardedFor?.split(',')[0]?.trim()
  if (ip) form.set('remoteip', ip)
  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', { method: 'POST', body: form })
    const data = (await res.json()) as { success?: boolean }
    return data.success === true
  } catch (err) {
    console.error('Turnstile verify error:', err)
    return false
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { first_name, os_type, email, accepts_citation, website, elapsed_ms, turnstile_token } = body

    // Piège à robots : champ caché rempli, ou formulaire envoyé en moins de 2 s.
    // On répond comme si tout allait bien, sans rien enregistrer ni envoyer.
    if ((typeof website === 'string' && website.trim() !== '') || (typeof elapsed_ms === 'number' && elapsed_ms < 2000)) {
      return NextResponse.json({ ok: true })
    }

    const turnstileSecret = process.env.TURNSTILE_SECRET_KEY
    if (turnstileSecret) {
      const human = await verifyTurnstile(turnstileSecret, turnstile_token, request.headers.get('x-forwarded-for'))
      if (!human) {
        return NextResponse.json({ error: 'Vérification anti-robot échouée, réessaie.' }, { status: 400 })
      }
    }

    if (!first_name || typeof first_name !== 'string' || !first_name.trim()) {
      return NextResponse.json({ error: 'Prénom requis.' }, { status: 400 })
    }
    // Le prénom est repris dans l'e-mail envoyé à l'adresse saisie : on n'accepte
    // qu'un vrai prénom (lettres, espaces, tirets, apostrophes), pour que le
    // formulaire ne serve pas à envoyer un lien ou un message à un inconnu.
    if (!/^[\p{L}][\p{L}\p{M} '’-]{0,39}$/u.test(first_name.trim())) {
      return NextResponse.json({ error: 'Prénom invalide.' }, { status: 400 })
    }
    if (!os_type || !['ios', 'android'].includes(os_type)) {
      return NextResponse.json({ error: "Type d'appareil requis." }, { status: 400 })
    }
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.replace(/\s/g, '')

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { error } = await supabase
      .from('beta_testers')
      .insert({
        first_name: first_name.trim(),
        os_type,
        email: email.toLowerCase().trim(),
        accepts_citation: accepts_citation === true,
      })

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Cet email est déjà inscrit.' }, { status: 409 })
      }
      console.error('Beta insert error:', JSON.stringify(error))
      return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
    }

    // L'inscription est enregistrée : un e-mail qui échoue ne doit pas la faire échouer.
    if (resend) {
      const signup: BetaSignup = {
        firstName: first_name.trim(),
        email: email.toLowerCase().trim(),
        os: os_type as BetaSignup['os'],
        acceptsCitation: accepts_citation === true,
      }
      const results = await Promise.allSettled([
        resend.emails.send({
          from: BETA_FROM,
          to: signup.email,
          replyTo: MARIA_EMAIL,
          ...testerConfirmation(signup),
        }),
        resend.emails.send({
          from: BETA_FROM,
          to: MARIA_EMAIL,
          replyTo: signup.email,
          ...mariaNotification(signup),
        }),
      ])
      results.forEach((r) => {
        if (r.status === 'rejected') console.error('Beta email error:', r.reason)
        else if (r.value.error) console.error('Beta email error:', JSON.stringify(r.value.error))
      })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Beta route unexpected error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
