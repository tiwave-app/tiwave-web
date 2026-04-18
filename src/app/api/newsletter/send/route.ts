import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  // Auth check
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) => {
          try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {}
        },
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { subject, body } = await request.json()
  if (!subject?.trim() || !body?.trim()) {
    return NextResponse.json({ error: 'Sujet et contenu requis' }, { status: 400 })
  }

  // Fetch subscribers
  const adminSupabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
  const { data: subscribers, error: dbError } = await adminSupabase
    .from('newsletter_subscribers')
    .select('email')

  if (dbError) return NextResponse.json({ error: 'Erreur base de données' }, { status: 500 })
  if (!subscribers?.length) return NextResponse.json({ error: 'Aucun abonné' }, { status: 400 })

  const resend = new Resend(process.env.RESEND_API_KEY)

  // Convert line breaks to HTML
  const htmlBody = body
    .split('\n\n')
    .map((p: string) => `<p>${p.replace(/\n/g, '<br/>')}</p>`)
    .join('')

  const html = `
<!DOCTYPE html>
<html lang="fr">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4e9d8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <div style="max-width:600px;margin:40px auto;background:#fff;border-radius:12px;overflow:hidden;">
    <div style="background:#013a63;padding:24px 32px;">
      <span style="color:#0093d0;font-size:22px;font-weight:700;">Ti</span><span style="color:#f4e9d8;font-size:22px;font-weight:700;">Wave</span>
    </div>
    <div style="padding:32px;color:#1a1a1a;font-size:16px;line-height:1.7;">
      ${htmlBody}
    </div>
    <div style="padding:24px 32px;border-top:1px solid #f0ece6;font-size:12px;color:#999;text-align:center;">
      Tu reçois cet email car tu t'es inscrit(e) sur <a href="https://tiwave.app" style="color:#0093d0;">tiwave.app</a>
    </div>
  </div>
</body>
</html>`

  // Send in batches of 50 (Resend free tier limit)
  const emails = subscribers.map(s => s.email)
  const batches = []
  for (let i = 0; i < emails.length; i += 50) {
    batches.push(emails.slice(i, i + 50))
  }

  let sent = 0
  let failed = 0

  for (const batch of batches) {
    try {
      await resend.batch.send(
        batch.map(email => ({
          from: 'Maria de Tiwave <newsletter@tiwave.app>',
          to: email,
          subject,
          html,
        }))
      )
      sent += batch.length
    } catch {
      failed += batch.length
    }
  }

  return NextResponse.json({ sent, failed, total: emails.length })
}
