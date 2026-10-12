'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function ConfirmationStatus() {
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    // Supabase renvoie le résultat dans le fragment : jetons de session en cas
    // de succès, `error=...` si le lien a expiré ou a déjà servi.
    const params = new URLSearchParams(window.location.hash.slice(1))
    setFailed(params.has('error'))
    if (window.location.hash) {
      window.history.replaceState(null, '', window.location.pathname)
    }
  }, [])

  return (
    <>
      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-[1.15]">
        {failed ? 'Ce lien n’est plus valable' : 'Ton adresse est confirmée'}
      </h1>
      <p className="text-white/50 text-lg mb-8 leading-relaxed">
        {failed
          ? 'Il a expiré ou a déjà été utilisé. Ouvre l’app TiWave et essaie de te connecter : si ton adresse est déjà confirmée, ça fonctionnera. Sinon, inscris-toi de nouveau pour recevoir un nouveau lien.'
          : 'Ton compte TiWave est prêt. Retourne dans l’app et connecte-toi avec ton adresse e-mail et ton mot de passe.'}
      </p>
      <Link href="/" className="inline-block text-[#2ed6b0] text-sm hover:underline">
        ← Retour à tiwave.app
      </Link>
    </>
  )
}
