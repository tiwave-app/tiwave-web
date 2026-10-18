'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function ConfirmationStatus() {
  const [failed, setFailed] = useState(false)
  // Le lien tiwave:// n'ouvre l'app que sur un téléphone. Depuis un ordinateur,
  // on dit d'aller sur le téléphone plutôt que d'afficher un bouton qui ne fait rien.
  const [onPhone, setOnPhone] = useState(true)

  useEffect(() => {
    // Supabase renvoie le résultat dans le fragment : jetons de session en cas
    // de succès, `error=...` si le lien a expiré ou a déjà servi.
    const params = new URLSearchParams(window.location.hash.slice(1))
    setFailed(params.has('error'))
    setOnPhone(/iphone|ipad|ipod|android/i.test(navigator.userAgent))
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
          : 'Ton compte TiWave est prêt. Connecte-toi dans l’app avec ton adresse e-mail et ton mot de passe.'}
      </p>
      {onPhone ? (
        <div className="mb-10">
          <a
            href="tiwave://"
            className="inline-block bg-[#2ed6b0] text-[#020c1b] font-semibold rounded-full px-8 py-3 shadow-[0_0_20px_rgba(46,214,176,0.3)]"
          >
            Ouvrir TiWave
          </a>
          <p className="text-white/50 text-sm mt-4">
            L’app n’est pas sur ce téléphone ?{' '}
            <a href="/telecharger" className="text-[#2ed6b0] hover:underline">
              Télécharger TiWave
            </a>
          </p>
        </div>
      ) : (
        <p className="text-white/70 mb-10">Ouvre TiWave sur ton téléphone pour te connecter.</p>
      )}
      <Link href="/" className="inline-block text-[#2ed6b0] text-sm hover:underline">
        ← Retour à tiwave.app
      </Link>
    </>
  )
}
