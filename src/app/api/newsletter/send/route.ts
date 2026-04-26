import { createClient } from '@supabase/supabase-js'
import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function applyInlineStyles(text: string) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
}

function bodyToHtml(text: string): string {
  return text
    .split('\n\n')
    .map(block => {
      const trimmed = block.trim()
      if (!trimmed) return ''

      // Divider
      if (trimmed === '---') {
        return `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 28px;">
          <tr><td style="border-top:2px solid #2ed6b0;opacity:0.35;font-size:0;">&nbsp;</td></tr>
        </table>`
      }

      // CTA button: → [Texte](url) or → **[Texte]**
      const ctaLink = trimmed.match(/^→\s+\[(.+?)\]\((.+?)\)$/)
      if (ctaLink) {
        const [, label, url] = ctaLink
        return `<table cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;">
          <tr><td style="background:#0093d0;border-radius:10px;">
            <a href="${escapeHtml(url)}" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;letter-spacing:-0.2px;">${escapeHtml(label)}</a>
          </td></tr>
        </table>`
      }

      // CTA button without URL: → **[Texte]** or → Texte (starting with →)
      const ctaPlain = trimmed.match(/^→\s+\*?\*?\[?(.+?)\]?\*?\*?$/)
      if (ctaPlain && trimmed.startsWith('→')) {
        const label = trimmed.replace(/^→\s+/, '').replace(/^\*\*|\*\*$/g, '').replace(/^\[|\]$/g, '')
        return `<table cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;">
          <tr><td style="background:#0093d0;border-radius:10px;">
            <a href="https://tiwave.app" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;letter-spacing:-0.2px;">${escapeHtml(label)}</a>
          </td></tr>
        </table>`
      }

      // List items: lines starting with • or -
      const lines = trimmed.split('\n')
      if (lines.every(l => l.trimStart().match(/^[•\-]\s/))) {
        const items = lines
          .map(l => `<li style="margin-bottom:8px;">${applyInlineStyles(escapeHtml(l.replace(/^[•\-]\s/, '').trim()))}</li>`)
          .join('')
        return `<ul style="margin:0 0 20px;padding-left:22px;line-height:1.75;">${items}</ul>`
      }

      // Regular paragraph
      const html = applyInlineStyles(escapeHtml(trimmed).replace(/\n/g, '<br>'))
      return `<p style="margin:0 0 20px;line-height:1.75;">${html}</p>`
    })
    .join('\n')
}

function buildHtml(subject: string, previewText: string, body: string): string {
  const preview = escapeHtml(previewText || subject)
  const content = bodyToHtml(body)

  return `<!DOCTYPE html>
<html lang="fr" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="x-apple-disable-message-reformatting">
  <title>${escapeHtml(subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:#f4e9d8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;-webkit-text-size-adjust:100%;">

  <!-- Preview text (hidden) -->
  <div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${preview}&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌&nbsp;‌</div>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f4e9d8;">
    <tr>
      <td align="center" style="padding:32px 16px 48px;">

        <!-- Card -->
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(1,58,99,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#013a63;padding:22px 40px 20px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="vertical-align:middle;">
                    <span style="color:#0093d0;font-size:22px;font-weight:700;letter-spacing:-0.5px;">Ti</span><span style="color:#f4e9d8;font-size:22px;font-weight:700;letter-spacing:-0.5px;">Wave</span>
                  </td>
                  <td style="padding-left:12px;vertical-align:middle;">
                    <span style="color:#2ed6b0;font-size:12px;letter-spacing:0.5px;opacity:0.8;">🌊 Martinique</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px 40px 8px;color:#1a1a1a;font-size:16px;line-height:1.75;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px 32px;border-top:1px solid #f0ece6;">
              <p style="margin:0;font-size:12px;color:#aaa;text-align:center;line-height:1.8;">
                Tu reçois cet email car tu t'es inscrit·e sur
                <a href="https://tiwave.app" style="color:#0093d0;text-decoration:none;">tiwave.app</a><br>
                <a href="https://tiwave.app/unsubscribe" style="color:#ccc;text-decoration:underline;">Se désinscrire</a>
              </p>
            </td>
          </tr>

        </table>
        <!-- /Card -->

      </td>
    </tr>
  </table>

</body>
</html>`
}

export async function POST(request: Request) {
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

  const { subject, previewText, body } = await request.json()
  if (!subject?.trim() || !body?.trim()) {
    return NextResponse.json({ error: 'Sujet et contenu requis' }, { status: 400 })
  }

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
  const html = buildHtml(subject, previewText || '', body)

  const emails = subscribers.map(s => s.email)
  let sent = 0
  let failed = 0

  for (let i = 0; i < emails.length; i += 50) {
    const batch = emails.slice(i, i + 50)
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
