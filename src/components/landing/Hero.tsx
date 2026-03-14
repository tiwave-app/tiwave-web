import { Button } from '@heroui/react'
import Link from 'next/link'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#013a63] to-[#0093d0]">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-[#2ed6b0] animate-pulse" />
          Sélectionnée à la pré-pépinière Technopole CACEM · Martinique, 2026
        </div>

        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          L&apos;app qui lit la mer<br />
          <span className="text-[#2ed6b0]">avant toi</span>.
        </h1>

        <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto">
          Tiwave agrège en temps réel les données de houle, de sargasses et de qualité de l&apos;eau
          pour toutes les plages de la Martinique. Pour que ton choix de plage soit toujours le bon.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            as="a"
            href="#newsletter"
            size="lg"
            className="bg-[#2ed6b0] text-[#013a63] font-semibold px-8"
          >
            Être notifié à la sortie →
          </Button>
          <Button
            as="a"
            href="#features"
            size="lg"
            variant="bordered"
            className="border-white/40 text-white"
          >
            En savoir plus sur les données ↓
          </Button>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </section>
  )
}
