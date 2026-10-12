import { ConfirmationStatus } from './ConfirmationStatus'

export const metadata = {
  title: 'Adresse confirmée — TiWave',
  description: 'Ton adresse e-mail est confirmée.',
  robots: { index: false },
}

// Page d'arrivée du lien « Confirmer mon adresse » (Site URL de Supabase Auth).
export default function CompteConfirmePage() {
  return (
    <main
      className="min-h-screen flex items-center py-24"
      style={{ background: 'linear-gradient(160deg, #013a63 0%, #020c1b 50%, #071e38 100%)' }}
    >
      <div className="w-full max-w-xl mx-auto px-6">
        <ConfirmationStatus />
      </div>
    </main>
  )
}
