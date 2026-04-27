'use client'

import { useState } from 'react'

export function SendWelcomeButton({ count }: { count: number }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<{ sent: number; failed: number } | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')

  async function send() {
    setConfirmOpen(false)
    setStatus('sending')
    try {
      const res = await fetch('/api/admin/batch-welcome', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Erreur inconnue')
      setResult(data)
      setStatus('done')
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Erreur inconnue')
      setStatus('error')
    }
  }

  if (status === 'done' && result) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 text-sm text-green-800">
        ✓ Email de bienvenue envoyé à {result.sent} abonné{result.sent > 1 ? 's' : ''}
        {result.failed > 0 && ` — ${result.failed} échec(s)`}
      </div>
    )
  }

  return (
    <>
      <button
        onClick={() => setConfirmOpen(true)}
        disabled={count === 0 || status === 'sending'}
        className="bg-[#0093d0] text-white text-sm px-4 py-2 rounded-lg hover:bg-[#007ab5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'sending' ? 'Envoi…' : `Envoyer email 1 aux ${count} abonnés`}
      </button>

      {status === 'error' && (
        <p className="text-sm text-red-600 mt-1">{errorMsg}</p>
      )}

      {confirmOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl">
            <h2 className="font-bold text-[#013a63] text-lg mb-2">Confirmer l'envoi</h2>
            <p className="text-sm text-gray-600 mb-6">
              L'email de bienvenue sera envoyé à <strong>{count} abonnés</strong> qui ne l'ont pas encore reçu.
              Les emails de test sont exclus automatiquement.
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
    </>
  )
}
