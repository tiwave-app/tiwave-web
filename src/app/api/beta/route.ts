import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { BETA_FROM, MARIA_EMAIL, mariaNotification, testerConfirmation, type BetaSignup } from './emails'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { first_name, os_type, email, accepts_citation } = body

    if (!first_name || typeof first_name !== 'string' || !first_name.trim()) {
      return NextResponse.json({ error: 'Prénom requis.' }, { status: 400 })
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
