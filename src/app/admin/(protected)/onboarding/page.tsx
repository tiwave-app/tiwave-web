'use client'

import { useState } from 'react'

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function applyInlineStyles(escaped: string) {
  return escaped
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
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(subject)}</title></head><body style="margin:0;padding:20px 12px;background:#f4e9d8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;"><div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(1,58,99,0.08);"><div style="background:#013a63;padding:22px 32px;text-align:center;"><img src="https://tiwave.app/logo-name.svg" alt="TiWave" style="display:inline-block;height:38px;max-width:210px;" /></div><div style="padding:36px 32px 8px;color:#1a1a1a;font-size:15px;line-height:1.75;">${bodyToHtml(body)}</div><div style="padding:16px 32px 24px;border-top:1px solid #f0ece6;"><p style="margin:0;font-size:11px;color:#bbb;text-align:center;line-height:1.8;">Tu reçois cet email car tu t'es inscrit·e sur <span style="color:#0093d0;">tiwave.app</span> · <span style="color:#ccc;text-decoration:underline;">Se désinscrire</span></p></div></div></body></html>`
}

const EMAILS = [
  {
    num: 1,
    timing: 'J+0 — à l\'inscription',
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

Le projet avance vite, et tu fais maintenant partie des premiers à le suivre.
Très bientôt, tu pourras tester l'app en avant-première.

→ [Nous suivre sur Instagram](https://www.instagram.com/tiwave.app)

À très vite,
**Maria**
*Fondatrice de Tiwave*`,
  },
  {
    num: 2,
    timing: 'J+3',
    subject: '45 minutes de route. Pas de baignade possible.',
    previewText: "Ce que j'ai trouvé aux Salines a tout changé.",
    body: `Les Salines. Fin d'après-midi. Mes deux enfants dans les bras.

Quarante-cinq minutes de route pour leur montrer la plage de mon enfance — là où j'avais campé, pêché les ciriques, regardé les tortues pondre à l'aube. Je leur en parlais depuis des mois comme d'un endroit qui leur appartenait déjà.

On n'a pas pu entrer dans l'eau. Les sargasses avaient tout pris.

Sur le chemin du retour, j'ai cherché sur mon téléphone. Rien d'utile. Un post Facebook de trois jours, une météo générique, quelques commentaires contradictoires. Pour une île dont l'identité repose sur ses plages, c'était vertigineux.

---

Je suis ingénieure mobile. Treize ans à Paris, des dizaines d'applications pour des startups et des grandes entreprises. En 2024, j'ai choisi de rentrer. Avec ma famille. Avec l'idée que ce que je sais faire pouvait servir ici.

J'ai construit ce qui manquait.

→ [Découvrir tiwave.app](https://tiwave.app)

À très bientôt,
**Maria**
*Fondatrice de Tiwave*`,
  },
  {
    num: 3,
    timing: 'J+7',
    subject: 'Les sargasses arrivent. Voilà comment on les surveille.',
    previewText: 'Chaque matin, Tiwave scrute les données satellites pour tes plages.',
    body: `Hey,

Tu le sais — avec mai, la saison des sargasses redémarre.

Chaque année, c'est la même histoire : tu arrives à la plage, et là… l'odeur. Les algues entassées sur le sable. Personne ne t'a prévenu·e.

Chez Tiwave, on a décidé que ça ne devrait plus arriver.

---

**Comment on surveille les sargasses pour toi :**

Chaque jour, nos systèmes analysent les données satellites de la NOAA pour détecter les concentrations de sargasses autour de la Martinique, croisées avec les rapports de la communauté.

Résultat : une carte mise à jour quotidiennement, avec 4 niveaux clairs :

• 🟢 Faible — RAS, bonne baignade
• 🟡 Modéré — présence visible mais tolérable
• 🟠 Élevé — gêne certaine
• 🔴 Critique — plage fortement impactée

→ [Voir la carte sargasses en temps réel](https://tiwave.app)

Bonne saison,
**Maria**
*Fondatrice de Tiwave*`,
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
          <p className="text-sm text-gray-500 mt-1">3 emails envoyés automatiquement après l'inscription</p>
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
