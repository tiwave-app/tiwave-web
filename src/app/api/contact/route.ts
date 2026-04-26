import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, organisation, type, subject, message } = body

  if (!name || !email || !organisation || !type || !subject || !message) {
    return NextResponse.json({ error: 'Tous les champs sont obligatoires.' }, { status: 400 })
  }
  if (!email.includes('@')) {
    return NextResponse.json({ error: 'Email invalide.' }, { status: 400 })
  }
  if (!['professionnel', 'collectivite'].includes(type)) {
    return NextResponse.json({ error: 'Type invalide.' }, { status: 400 })
  }

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any).from('contact_requests').insert({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    organisation: organisation.trim(),
    type,
    subject: subject.trim(),
    message: message.trim(),
  })

  if (error) {
    console.error('[contact] Supabase error:', error)
    return NextResponse.json({ error: error.message ?? 'Erreur serveur.' }, { status: 500 })
  }

  const typeLabel = type === 'collectivite' ? 'Collectivité / Institution' : 'Professionnel'

  if (resend) {
    await Promise.allSettled([
      // Notification interne
      resend.emails.send({
        from: 'TiWave <contact@tiwave.app>',
        to: 'contact@tiwave.app',
        subject: `[TiWave] Nouvelle demande — ${name} (${organisation})`,
        html: `
          <h2>Nouvelle demande de contact</h2>
          <table cellpadding="8" style="border-collapse:collapse">
            <tr><td><strong>Nom</strong></td><td>${name}</td></tr>
            <tr><td><strong>Email</strong></td><td>${email}</td></tr>
            <tr><td><strong>Organisation</strong></td><td>${organisation}</td></tr>
            <tr><td><strong>Type</strong></td><td>${typeLabel}</td></tr>
            <tr><td><strong>Sujet</strong></td><td>${subject}</td></tr>
          </table>
          <h3>Message</h3>
          <p style="white-space:pre-wrap">${message}</p>
        `,
      }),
      // Confirmation au demandeur
      resend.emails.send({
        from: 'TiWave <contact@tiwave.app>',
        to: email,
        subject: 'Votre demande a bien été reçue — TiWave',
        html: `
          <p>Bonjour ${name},</p>
          <p>Nous avons bien reçu votre demande concernant <strong>${subject}</strong>.</p>
          <p>Notre équipe reviendra vers vous sous 48h ouvrées.</p>
          <br/>
          <p>— L'équipe TiWave</p>
          <p style="color:#888;font-size:12px">TiWave · Martinique, Antilles françaises · contact@tiwave.app</p>
        `,
      }),
    ])
  }

  return NextResponse.json({ ok: true })
}
