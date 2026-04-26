'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

export function SendWelcomeButton({ count }: { count: number }) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<{ sent: number; failed: number } | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  async function send() {
    setConfirmOpen(false)
    setStatus('sending')
    try {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data: { session } } = await supabase.auth.getSession()
      if (!session) throw new Error('Non authentifié')

      const res = await fetch(`${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/process-onboarding`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ mode: 'batch-welcome' }),
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

      {status === 'error' && (
        <p className="text-sm text-red-600">Erreur lors de l'envoi.</p>
      )}
    </>
  )
}
