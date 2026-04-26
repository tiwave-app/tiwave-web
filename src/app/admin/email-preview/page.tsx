// Route de preview locale — pas de protection auth (usage dev uniquement)
'use client'

import { useState } from 'react'

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

// URLs locales pour la preview (chargement instantané)
const LOGO_ROUND = `<img src="/logo.png" alt="" style="width:18px;height:18px;border-radius:50%;vertical-align:middle;margin-right:6px;display:inline-block;" />`

function applyInlineStyles(escaped: string) {
  return escaped
    .replace(/\[logo\]/g, LOGO_ROUND)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
}

function bodyToHtml(text: string): string {
  return text.split('\n\n').map(block => {
    const trimmed = block.trim()
    if (!trimmed) return ''
    if (trimmed === '---') return `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 28px;"><tr><td style="border-top:2px solid #2ed6b0;opacity:0.35;font-size:0;">&nbsp;</td></tr></table>`
    if (trimmed === '[hero-beach]') return `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;"><tr><td><img src="/hero-beach.jpg" alt="Plage Martinique" style="display:block;width:100%;max-width:100%;height:200px;object-fit:cover;border-radius:10px;" /></td></tr></table>`
    const ctaLink = trimmed.match(/^→\s+\[(.+?)\]\((.+?)\)$/)
    if (ctaLink) {
      const [, label, url] = ctaLink
      return `<table cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;"><tr><td style="background:#0093d0;border-radius:10px;"><a href="${escapeHtml(url)}" style="display:inline-block;padding:14px 32px;color:#fff;font-size:15px;font-weight:600;text-decoration:none;">${escapeHtml(label)}</a></td></tr></table>`
    }
    if (trimmed.startsWith('→')) {
      const label = trimmed.replace(/^→\s+/, '').replace(/^\*\*|\*\*$/g, '')
      return `<table cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;"><tr><td style="background:#0093d0;border-radius:10px;"><a href="https://tiwave.app" style="display:inline-block;padding:14px 32px;color:#fff;font-size:15px;font-weight:600;text-decoration:none;">${escapeHtml(label)}</a></td></tr></table>`
    }
    const lines = trimmed.split('\n')
    if (lines.every(l => l.trimStart().match(/^[•\-]\s/))) {
      const items = lines.map(l => `<li style="margin-bottom:8px;">${applyInlineStyles(escapeHtml(l.replace(/^[•\-]\s/, '').trim()))}</li>`).join('')
      return `<ul style="margin:0 0 20px;padding-left:20px;line-height:1.75;">${items}</ul>`
    }
    return `<p style="margin:0 0 20px;line-height:1.75;">${applyInlineStyles(escapeHtml(trimmed).replace(/\n/g, '<br>'))}</p>`
  }).join('\n')
}

function buildHtml(subject: string, body: string, logoSize: number, logoAlign: string) {
  const align = logoAlign === 'center' ? 'text-align:center;' : ''
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(subject)}</title></head>
<body style="margin:0;padding:20px 12px;background:#f4e9d8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;">
<div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(1,58,99,0.08);">
  <div style="background:#013a63;padding:20px 32px;${align}">
    <img src="/logo-name.svg" alt="TiWave" style="display:${logoAlign === 'center' ? 'inline-block' : 'block'};height:${logoSize}px;max-width:${Math.round(logoSize * 5.7)}px;" />
  </div>
  <div style="padding:36px 32px 8px;color:#1a1a1a;font-size:15px;line-height:1.75;">${bodyToHtml(body)}</div>
  <div style="padding:16px 32px 24px;border-top:1px solid #f0ece6;">
    <p style="margin:0;font-size:11px;color:#bbb;text-align:center;line-height:1.8;">Tu reçois cet email car tu t'es inscrit·e sur <span style="color:#0093d0;">tiwave.app</span> · <span style="color:#ccc;text-decoration:underline;">Se désinscrire</span></p>
  </div>
</div>
</body></html>`
}

const EMAIL1 = {
  subject: 'Bienvenue dans TiWave',
  body: `Hello,

Tu viens de rejoindre TiWave — bienvenue 💙

TiWave, c'est né d'un constat simple :
Aller à la plage ne devrait jamais être une mauvaise surprise.

Eau trouble, méduses, pollution, algues…
On a tous déjà vécu ça.

L'idée ?
Créer une app simple où chacun peut partager l'état des plages en temps réel.

Une communauté locale
Des infos utiles
Et surtout… de meilleures baignades

[hero-beach]

Le projet avance vite, et tu fais maintenant partie des premiers à le suivre.
Très bientôt, tu pourras tester l'app en avant-première.

→ [Nous suivre sur Instagram](https://www.instagram.com/tiwave.app)

À très vite,
[logo] **Maria**
*Fondatrice de Tiwave*`,
}

export default function EmailPreviewPage() {
  const [logoSize, setLogoSize] = useState(28)
  const [logoAlign, setLogoAlign] = useState<'left' | 'center'>('left')

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8f8f8' }}>
      {/* Controls */}
      <div style={{ width: 260, padding: 24, background: '#013a63', color: '#fff', flexShrink: 0 }}>
        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 24 }}>⚙️ Réglages logo</div>

        <label style={{ fontSize: 13, opacity: 0.7 }}>Taille (hauteur px)</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8, marginBottom: 24 }}>
          <input
            type="range" min={18} max={60} value={logoSize}
            onChange={e => setLogoSize(Number(e.target.value))}
            style={{ flex: 1 }}
          />
          <span style={{ fontSize: 14, fontWeight: 600, minWidth: 32 }}>{logoSize}px</span>
        </div>

        <label style={{ fontSize: 13, opacity: 0.7 }}>Alignement</label>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          {(['left', 'center'] as const).map(a => (
            <button
              key={a}
              onClick={() => setLogoAlign(a)}
              style={{
                flex: 1, padding: '8px 0', borderRadius: 8, border: 'none', cursor: 'pointer',
                background: logoAlign === a ? '#0093d0' : 'rgba(255,255,255,0.1)',
                color: '#fff', fontWeight: 600, fontSize: 13,
              }}
            >
              {a === 'left' ? '⬅ Gauche' : '↔ Centré'}
            </button>
          ))}
        </div>

        <div style={{ marginTop: 32, padding: 12, background: 'rgba(255,255,255,0.08)', borderRadius: 8, fontSize: 12, opacity: 0.7, lineHeight: 1.6 }}>
          Une fois satisfaite, dis-moi les valeurs et je les applique dans le code.
        </div>
      </div>

      {/* Preview */}
      <div style={{ flex: 1, padding: 32, overflowY: 'auto' }}>
        <div style={{ fontSize: 13, color: '#666', marginBottom: 16 }}>
          <strong>Objet :</strong> {EMAIL1.subject}
        </div>
        <iframe
          srcDoc={buildHtml(EMAIL1.subject, EMAIL1.body, logoSize, logoAlign)}
          style={{ width: '100%', minHeight: 700, border: 'none', borderRadius: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
          sandbox="allow-same-origin"
          title="Preview email"
        />
      </div>
    </div>
  )
}
