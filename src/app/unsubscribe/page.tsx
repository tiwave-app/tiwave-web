import Link from 'next/link'
import { UnsubscribeForm } from './UnsubscribeForm'

export const metadata = {
  title: 'Se désinscrire — TiWave',
  description: 'Ne plus recevoir les mails de TiWave.',
  robots: { index: false },
}

export default async function UnsubscribePage({
  searchParams,
}: {
  searchParams: Promise<{ t?: string }>
}) {
  // Présent quand on arrive depuis un mail envoyé à un compte de l'app.
  const { t: token } = await searchParams

  return (
    <main
      className="min-h-screen flex items-center py-24"
      style={{ background: 'linear-gradient(160deg, #013a63 0%, #020c1b 50%, #071e38 100%)' }}
    >
      <div className="w-full max-w-xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4 leading-[1.15]">
          Se désinscrire des mails TiWave
        </h1>
        <p className="text-white/50 text-lg mb-8 leading-relaxed">
          {token
            ? 'Confirmez pour ne plus recevoir les nouvelles de TiWave par mail. Votre compte et vos notifications ne changent pas.'
            : 'Indiquez l’adresse qui reçoit nos mails. Elle sera supprimée de notre liste.'}
        </p>

        <UnsubscribeForm token={token} />

        {!token && (
          <p className="text-white/30 text-sm mt-8 leading-relaxed">
            Vous avez un compte dans l&apos;application ? Le réglage se trouve dans
            Profil → Réglages.
          </p>
        )}

        <Link href="/" className="inline-block text-[#2ed6b0] text-sm mt-6 hover:underline">
          ← Retour à tiwave.app
        </Link>
      </div>
    </main>
  )
}
