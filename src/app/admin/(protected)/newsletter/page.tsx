'use client'

import { useState } from 'react'

const TEMPLATES: Record<string, { label: string; subject: string; previewText: string; body: string }> = {
  sargasses: {
    label: '🌿 Sargasses — Mai 2026',
    subject: 'Les sargasses arrivent. Voilà comment on les surveille.',
    previewText: 'Chaque matin, Tiwave scrute les données satellites pour tes plages.',
    body: `Hey,

Tu le sais — avec mai, la saison des sargasses redémarre.

Chaque année, c'est la même histoire : tu arrives à la plage, et là… l'odeur. Les algues entassées sur le sable. Personne ne t'a prévenu·e.

Chez Tiwave, on a décidé que ça ne devrait plus arriver.

---

**Comment on surveille les sargasses pour toi :**

Chaque jour, nos systèmes analysent les données satellites de la NOAA — les mêmes qu'utilisent les scientifiques — pour détecter les concentrations de sargasses dans les eaux autour de la Martinique. Ces données sont croisées avec les rapports soumis par la communauté sur place.

Résultat : une carte mise à jour quotidiennement, avec 4 niveaux clairs :

• 🟢 Faible — RAS, bonne baignade
• 🟡 Modéré — présence visible mais tolérable
• 🟠 Élevé — gêne certaine, à éviter si tu es sensible
• 🔴 Critique — plage fortement impactée

---

**Ce que tu peux faire :**

Avant de partir, ouvre Tiwave. Consulte le niveau sargasses de ta plage. Si c'est rouge, l'app te suggère les plages alternatives les plus proches en bon état.

Et si tu es sur place et que tu vois quelque chose que la carte ne montre pas encore — soumets un rapport. En 30 secondes, tu protèges les prochains visiteurs.

→ [Voir la carte sargasses en temps réel](https://tiwave.app)

Bonne saison,
**Maria**
Fondatrice de Tiwave`,
  },
  founder: {
    label: '👋 Onboarding #1 — Founder story',
    subject: '45 minutes de route. Pas de baignade possible.',
    previewText: "Ce que j'ai trouvé aux Salines a tout changé.",
    body: `Les Salines. Fin d'après-midi. Mes deux enfants dans les bras.

Quarante-cinq minutes de route pour leur montrer la plage de mon enfance — là où j'avais campé, pêché les ciriques, regardé les tortues pondre à l'aube. Je leur en parlais depuis des mois comme d'un endroit qui leur appartenait déjà.

On n'a pas pu entrer dans l'eau. Les sargasses avaient tout pris.

Sur le chemin du retour, j'ai cherché sur mon téléphone. Rien d'utile. Un post Facebook de trois jours, une météo générique, quelques commentaires contradictoires. Pour une île dont l'identité repose sur ses plages, c'était vertigineux.

---

Je suis ingénieure mobile. Treize ans à Paris, des dizaines d'applications pour des startups et des grandes entreprises. En 2024, j'ai choisi de rentrer. Avec ma famille. Avec l'idée que ce que je sais faire pouvait servir ici.

Ce que j'ai trouvé : un marché qui ne savait pas quoi faire de mon profil. Et une île dont les plages — notre bien commun le plus fragile — n'avaient aucun outil sérieux pour les suivre.

Le lien entre les deux, je l'ai fait aux Salines.

---

On réserve un vol en deux clics. On suit la météo à la minute. Mais pour savoir si la plage vaut le déplacement ce matin — sargasses, qualité de l'eau, UV, houle — on poste encore sur Facebook.

J'ai construit ce qui manquait.

Tiwave : une application collaborative pour consulter et signaler l'état réel des plages de Martinique. Pas en théorie. Maintenant.

Le lancement iOS + Android arrive dans quelques semaines. Tu fais partie des premières à le savoir — et j'ai besoin de toi avant le jour J.

Est-ce que tu as déjà annulé une sortie à la plage à cause des sargasses ou de la qualité de l'eau ?
Réponds à cet email — ça m'aide énormément.

→ [Découvrir tiwave.app](https://tiwave.app)

À très bientôt,
**Maria**
Fondatrice de Tiwave — Prix Mitan Tjè, Fanm Dijital`,
  },
  blank: { label: '✏️ Nouveau (vide)', subject: '', previewText: '', body: '' },
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function applyInlineStyles(escaped: string) {
  // Input is already HTML-escaped; only wrap with safe tags
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

function buildPreviewHtml(subject: string, body: string): string {
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(subject)}</title></head><body style="margin:0;padding:20px 12px;background:#f4e9d8;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;"><div style="max-width:560px;margin:0 auto;background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 4px 20px rgba(1,58,99,0.08);"><div style="background:#013a63;padding:22px 32px;text-align:center;"><img src="https://tiwave.app/logo-name.svg" alt="TiWave" style="display:inline-block;height:38px;max-width:210px;" /></div><div style="padding:36px 32px 8px;color:#1a1a1a;font-size:15px;line-height:1.75;">${bodyToHtml(body)}</div><div style="padding:16px 32px 24px;border-top:1px solid #f0ece6;"><p style="margin:0;font-size:11px;color:#bbb;text-align:center;line-height:1.8;">Tu reçois cet email car tu t'es inscrit·e sur <span style="color:#0093d0;">tiwave.app</span> · <span style="color:#ccc;text-decoration:underline;">Se désinscrire</span></p></div></div></body></html>`
}

export default function NewsletterPage() {
  const [subject, setSubject] = useState('')
  const [previewText, setPreviewText] = useState('')
  const [body, setBody] = useState('')
  const [preview, setPreview] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<{ sent: number; failed: number; total: number } | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  function loadTemplate(key: keyof typeof TEMPLATES) {
    const t = TEMPLATES[key]
    setSubject(t.subject)
    setPreviewText(t.previewText)
    setBody(t.body)
    setPreview(false)
  }

  async function send() {
    setConfirmOpen(false)
    setStatus('sending')
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
      const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      const { createClient } = await import('@supabase/supabase-js')
      const supabase = createClient(supabaseUrl, anonKey)
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('Non authentifié')

      const res = await fetch(`${supabaseUrl}/functions/v1/send-newsletter`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ subject, previewText, body }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      setResult(data)
      setStatus('done')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#013a63]">Envoyer une newsletter</h1>
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {Object.entries(TEMPLATES).map(([key, t]) => (
          <button
            key={key}
            onClick={() => loadTemplate(key as keyof typeof TEMPLATES)}
            className="text-sm px-3 py-1.5 rounded-lg border border-gray-200 hover:border-[#0093d0] hover:text-[#0093d0] transition-colors"
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Objet</label>
          <input
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="Objet de l'email"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0093d0]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Preview text
            <span className="ml-1.5 text-xs font-normal text-gray-400">— affiché sous l'objet dans la boîte mail</span>
          </label>
          <input
            value={previewText}
            onChange={e => setPreviewText(e.target.value)}
            placeholder="Une phrase courte qui complète l'objet…"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0093d0]"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">
              Contenu
              <span className="ml-1.5 text-xs font-normal text-gray-400">
                — **gras**, • listes, --- séparateur, → [Bouton](url)
              </span>
            </label>
            <button
              onClick={() => setPreview(!preview)}
              className="text-xs text-[#0093d0] hover:underline"
            >
              {preview ? 'Éditer' : 'Prévisualiser'}
            </button>
          </div>

          {preview ? (
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <iframe
                srcDoc={buildPreviewHtml(subject, body)}
                className="w-full"
                style={{ minHeight: 600, border: 'none' }}
                sandbox="allow-same-origin"
                title="Prévisualisation email"
              />
            </div>
          ) : (
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={22}
              placeholder={`Contenu de l'email\n\nParagraphes séparés par une ligne vide.\n\n--- pour un séparateur\n**texte** pour le gras\n• élément de liste\n→ [Bouton CTA](https://tiwave.app)`}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-[#0093d0] resize-none"
            />
          )}
        </div>

        {status === 'done' && result && (
          <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm text-green-800">
            ✓ Envoyé à {result.sent} abonné{result.sent > 1 ? 's' : ''}
            {result.failed > 0 && ` — ${result.failed} échec(s)`}
          </div>
        )}
        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm text-red-800">
            Erreur lors de l'envoi. Vérifie ta clé RESEND_API_KEY et ton domaine d'envoi.
          </div>
        )}

        <div className="flex justify-end">
          <button
            onClick={() => setConfirmOpen(true)}
            disabled={!subject.trim() || !body.trim() || status === 'sending'}
            className="bg-[#013a63] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#012d4e] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {status === 'sending' ? 'Envoi en cours…' : 'Envoyer à tous les abonnés'}
          </button>
        </div>
      </div>

      {confirmOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <h2 className="font-bold text-[#013a63] text-lg mb-2">Confirmer l'envoi</h2>
            <p className="text-sm text-gray-600 mb-1">
              Objet : <span className="font-medium text-gray-900">{subject}</span>
            </p>
            <p className="text-sm text-gray-500 mb-6">
              Cet email sera envoyé à tous tes abonnés. Cette action est irréversible.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmOpen(false)}
                className="flex-1 border border-gray-200 rounded-lg py-2 text-sm hover:bg-gray-50"
              >
                Annuler
              </button>
              <button
                onClick={send}
                className="flex-1 bg-[#013a63] text-white rounded-lg py-2 text-sm font-medium hover:bg-[#012d4e]"
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
