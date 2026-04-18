'use client'

import { useState } from 'react'

const TEMPLATES = {
  founder: {
    label: 'Email #1 — Founder story',
    subject: '45 minutes de route. Pas de baignade possible.',
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

Et si tu connais quelqu'un qui mérite de savoir que ça existe : transfère-lui cet email.

Le site est en ligne → tiwave.app

À très bientôt,
Maria
Fondatrice de Tiwave — Prix Mitan Tjè, Fanm Dijital`,
  },
  blank: { label: 'Nouveau (vide)', subject: '', body: '' },
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function bodyToHtml(text: string) {
  return text
    .split('\n\n')
    .map(p => `<p style="margin:0 0 16px">${escapeHtml(p).replace(/\n/g, '<br/>')}</p>`)
    .join('')
}

export default function NewsletterPage() {
  const [subject, setSubject] = useState('')
  const [body, setBody] = useState('')
  const [preview, setPreview] = useState(false)
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<{ sent: number; failed: number; total: number } | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  function loadTemplate(key: keyof typeof TEMPLATES) {
    const t = TEMPLATES[key]
    setSubject(t.subject)
    setBody(t.body)
    setPreview(false)
  }

  async function send() {
    setConfirmOpen(false)
    setStatus('sending')
    try {
      const res = await fetch('/api/newsletter/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ subject, body }),
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

      {/* Templates */}
      <div className="flex gap-2 mb-6">
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
        {/* Subject */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Objet</label>
          <input
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="Objet de l'email"
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-[#0093d0]"
          />
        </div>

        {/* Body */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="block text-sm font-medium text-gray-700">Contenu</label>
            <button
              onClick={() => setPreview(!preview)}
              className="text-xs text-[#0093d0] hover:underline"
            >
              {preview ? 'Éditer' : 'Prévisualiser'}
            </button>
          </div>

          {preview ? (
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-[#013a63] px-6 py-4">
                <span className="text-[#0093d0] font-bold">Ti</span>
                <span className="text-[#f4e9d8] font-bold">Wave</span>
              </div>
              <div
                className="p-6 text-sm text-gray-800 leading-relaxed bg-white"
                dangerouslySetInnerHTML={{ __html: bodyToHtml(body) }}
              />
            </div>
          ) : (
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={20}
              placeholder="Contenu de l'email — texte brut, paragraphes séparés par une ligne vide"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-mono focus:outline-none focus:border-[#0093d0] resize-none"
            />
          )}
        </div>

        {/* Status messages */}
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

        {/* Send button */}
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

      {/* Confirm dialog */}
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
