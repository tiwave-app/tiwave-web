'use client'

import { useState } from 'react'

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

const LOGO_ROUND = `<img src="/logo-round-email.png" alt="" style="width:18px;height:18px;border-radius:50%;vertical-align:middle;margin-right:6px;display:inline-block;" />`

function applyInlineStyles(escaped: string) {
  return escaped
    .replace(/\[logo\]/g, LOGO_ROUND)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
}

function bodyToHtml(text: string): string {
  return text
    .split('\n\n')
    .map(block => {
      const trimmed = block.trim()
      if (!trimmed) return ''
      if (trimmed === '---') {
        return `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:8px 0 28px;"><tr><td style="border-top:2px solid #2ed6b0;opacity:0.35;font-size:0;">&nbsp;</td></tr></table>`
      }
      if (trimmed === '[hero-beach]') {
        return `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;"><tr><td><img src="/hero-beach-email.jpg" alt="Plage Martinique" style="display:block;width:100%;max-width:100%;height:200px;object-fit:cover;border-radius:10px;" /></td></tr></table>`
      }
      if (trimmed === '[intro-maria]') {
        return `<table width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 28px;"><tr><td style="vertical-align:top;padding-right:20px;font-size:15px;line-height:1.7;color:#1a1a1a;"><p style="margin:0 0 14px;">Moi, c'est <strong>Maria</strong> 👋</p><p style="margin:0 0 14px;">Je suis martiniquaise, et TiWave, c'est mon projet depuis juin 2025.</p><p style="margin:0 0 14px;">Je ne viens pas de la Silicon Valley.<br>Je viens d'ici.</p><p style="margin:0;">D'une île où l'eau est magnifique… mais où on ne sait jamais vraiment à quoi s'attendre avant d'arriver à la plage.</p></td><td width="160" style="vertical-align:top;padding-left:4px;"><img src="/maria-portrait-email.jpg" alt="Maria, fondatrice de TiWave" style="display:block;width:160px;border-radius:12px;border:0;" /></td></tr></table>`
      }
      const ctaLink = trimmed.match(/^→\s+\[(.+?)\]\((.+?)\)$/)
      if (ctaLink) {
        const [, label, url] = ctaLink
        return `<table cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;"><tr><td style="background:#0093d0;border-radius:10px;"><a href="${escapeHtml(url)}" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">${escapeHtml(label)}</a></td></tr></table>`
      }
      if (trimmed.startsWith('→')) {
        const label = trimmed.replace(/^→\s+/, '').replace(/^\*\*|\*\*$/g, '').replace(/^\[|\]$/g, '')
        return `<table cellpadding="0" cellspacing="0" border="0" style="margin:28px 0;"><tr><td style="background:#0093d0;border-radius:10px;"><a href="https://tiwave.app" style="display:inline-block;padding:14px 32px;color:#ffffff;font-size:15px;font-weight:600;text-decoration:none;">${escapeHtml(label)}</a></td></tr></table>`
      }
      const lines = trimmed.split('\n')
      if (lines.every(l => l.trimStart().match(/^[•\-]\s/))) {
        const items = lines
          .map(l => `<li style="margin-bottom:8px;">${applyInlineStyles(escapeHtml(l.replace(/^[•\-]\s/, '').trim()))}</li>`)
          .join('')
        return `<ul style="margin:0 0 20px;padding-left:20px;line-height:1.75;">${items}</ul>`
      }
      const html = applyInlineStyles(escapeHtml(trimmed).replace(/\n/g, '<br>'))
      return `<p style="margin:0 0 20px;line-height:1.75;">${html}</p>`
    })
    .join('\n')
}

function buildEmailHtml(subject: string, body: string): string {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(subject)}</title></head><body style="margin:0;padding:20px 12px;background:#f4e9d8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;"><div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(1,58,99,0.08);"><div style="background:#013a63;padding:20px 32px;"><img src="/logo-name.svg" alt="TiWave" style="display:block;height:28px;max-width:160px;" /></div><div style="padding:36px 32px 8px;color:#1a1a1a;font-size:15px;line-height:1.75;">${bodyToHtml(body)}</div><div style="padding:16px 32px 24px;border-top:1px solid #f0ece6;"><p style="margin:0;font-size:11px;color:#bbb;text-align:center;line-height:1.8;">Tu reçois cet email car tu t'es inscrit·e sur <span style="color:#0093d0;">tiwave.app</span> · <span style="color:#ccc;text-decoration:underline;">Se désinscrire</span></p></div></div></body></html>`
}

const EMAILS = [
  {
    num: 1,
    timing: "J+0 — à l'inscription",
    subject: 'Bienvenue dans TiWave',
    previewText: 'Une nouvelle façon de choisir ta plage arrive.',
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
  },
  {
    num: 2,
    timing: 'J+3',
    subject: 'Derrière TiWave, il y a une Martiniquaise',
    previewText: 'Pas une grande boîte tech. Une femme, une idée, une île.',
    body: `Hello,

Je voulais me présenter, maintenant que tu fais partie de l'aventure.

[intro-maria]

Et ça, ça m'a toujours frustrée.

Alors j'ai décidé de développer TiWave.
Une app simple, utile, locale.

Depuis, le projet a grandi :

• sélectionné au **Prix Mitan Tjè — Fanm Dijital 5**
• accompagné par la pépinière du **Technopole CACEM**

C'est une belle reconnaissance.
Mais le plus important reste à venir :
les premières personnes qui vont suivre, comprendre, et utiliser TiWave.

En attendant le lancement, je partage les coulisses du projet sur le blog

→ [Lire le blog TiWave](https://tiwave.app/blog)

À très vite,
[logo] **Maria**
*Fondatrice de TiWave*`,
  },
  {
    num: 3,
    timing: 'J+7',
    subject: 'Ce qui arrive sur Tiwave (et tu peux en faire partie)',
    previewText: "J'ouvre bientôt les accès — tu peux en faire partie",
    body: `Hello,

On y est presque.

Après des mois de travail, TiWave est en train de prendre vie.

[hero-beach]

L'objectif est simple :
t'aider à savoir où aller à la plage, au bon moment.

Mais avant le lancement officiel,
j'ai besoin de quelques personnes pour tester l'app en conditions réelles.

• détecter les bugs
• donner un premier ressenti
• aider à améliorer l'expérience

Et j'aimerais que tu en fasses partie.
Les places seront limitées.

→ [Rejoindre les beta testeurs](https://tiwave.app/beta)

À très vite,
[logo] **Maria**
*Fondatrice de TiWave*`,
  },
]

export default function OnboardingPage() {
  const [activeEmail, setActiveEmail] = useState(0)
  const [showPreview, setShowPreview] = useState(false)

  const email = EMAILS[activeEmail]

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#013a63]">Séquence onboarding</h1>
          <p className="text-sm text-gray-500 mt-1">3 emails envoyés automatiquement après l&apos;inscription</p>
        </div>
      </div>

      {/* Email selector */}
      <div className="flex gap-3 mb-6">
        {EMAILS.map((e, i) => (
          <button
            key={i}
            onClick={() => { setActiveEmail(i); setShowPreview(false) }}
            className={`flex-1 text-left px-4 py-3 rounded-xl border transition-all ${
              activeEmail === i
                ? 'border-[#0093d0] bg-[#0093d0]/5'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className={`text-xs font-semibold mb-0.5 ${activeEmail === i ? 'text-[#0093d0]' : 'text-gray-400'}`}>
              Email {e.num}
            </div>
            <div className="text-sm font-medium text-gray-800 truncate">{e.timing}</div>
          </button>
        ))}
      </div>

      {/* Metadata */}
      <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 mb-4 space-y-2">
        <div className="flex gap-2 items-start">
          <span className="text-xs font-semibold text-gray-400 w-20 pt-0.5">Objet</span>
          <span className="text-sm text-gray-900 font-medium">{email.subject}</span>
        </div>
        <div className="flex gap-2 items-start">
          <span className="text-xs font-semibold text-gray-400 w-20 pt-0.5">Preview</span>
          <span className="text-sm text-gray-500 italic">{email.previewText}</span>
        </div>
      </div>

      {/* Body / Preview toggle */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <span className="text-sm font-medium text-gray-700">Contenu</span>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="text-xs text-[#0093d0] hover:underline"
          >
            {showPreview ? 'Voir le texte brut' : 'Prévisualiser le rendu email'}
          </button>
        </div>

        {showPreview ? (
          <iframe
            srcDoc={buildEmailHtml(email.subject, email.body)}
            className="w-full"
            style={{ minHeight: 600, border: 'none' }}
            sandbox="allow-same-origin"
            title={`Prévisualisation email ${email.num}`}
          />
        ) : (
          <pre className="px-5 py-4 text-sm text-gray-700 whitespace-pre-wrap font-mono leading-relaxed">
            {email.body}
          </pre>
        )}
      </div>
    </div>
  )
}
