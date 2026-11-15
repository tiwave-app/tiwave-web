import type { Metadata } from 'next'
import Link from 'next/link'

// Page de téléchargement vue depuis un ordinateur : tiwave.app/telecharger y
// renvoie quand il ne reconnaît ni un iPhone ni un Android.
export const metadata: Metadata = {
  title: 'Télécharger TiWave',
  description:
    'TiWave est disponible sur l\'App Store. Sur Android, l\'app s\'ouvre avec ses premiers testeurs.',
}

const APP_STORE_URL = 'https://apps.apple.com/app/id6767921828'

export default function AppPage() {
  return (
    <main
      className="min-h-screen flex items-center justify-center px-6 py-16"
      style={{ background: 'linear-gradient(160deg, #013a63 0%, #01558f 55%, #0093d0 100%)' }}
    >
      <div className="w-full max-w-lg text-center">
        <Link href="/" className="inline-block text-2xl font-bold mb-10">
          <span className="text-white">TiWave</span>
          <span className="text-[#2ed6b0]">.</span>
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-4">
          La bonne plage,
          <br />
          <span
            style={{
              background: 'linear-gradient(90deg, #57c6f0 0%, #2ed6b0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            aujourd&apos;hui.
          </span>
        </h1>
        <p className="text-white/70 text-lg leading-relaxed mb-10">
          Sargasses, état de la mer et qualité de l&apos;eau sur 77 plages de Martinique.
          Ouvre cette page depuis ton téléphone, ou choisis ton store.
        </p>

        <div className="bg-white/[0.07] border border-white/15 rounded-3xl p-8 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">iPhone</p>
            <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/badge-app-store-fr.svg" alt="Télécharger dans l'App Store" className="h-14" />
            </a>
          </div>

          <div className="w-full h-px bg-white/15" />

          <div className="flex flex-col items-center gap-3">
            <p className="text-white/60 text-xs font-semibold uppercase tracking-wider">Android</p>
            <p className="text-white/80 text-sm max-w-xs">
              L&apos;app arrive sur Google Play. Deviens l&apos;un des premiers testeurs.
            </p>
            <Link
              href="/beta?appareil=android"
              className="bg-[#2ed6b0] text-[#013a63] font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Devenir testeur Android
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
