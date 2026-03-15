import { Button } from '@heroui/react'

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#013a63] to-[#0093d0]">
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm mb-8">
          <span className="w-2 h-2 rounded-full bg-[#2ed6b0] animate-pulse" />
          Sélectionnée à la pré-pépinière Technopole CACEM · Martinique, 2026
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          La plateforme référente pour<br />
          <span className="text-[#2ed6b0]">la santé des plages</span> en temps réel
        </h1>

        <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
          Tiwave agrège des données open source, des signaux terrain et les ressentis
          des usagers pour rendre la qualité des plages de Martinique plus lisible.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            as="a"
            href="#newsletter"
            size="lg"
            className="bg-[#2ed6b0] text-[#013a63] font-semibold px-8"
          >
            Rejoindre la liste d&apos;attente →
          </Button>
          <Button
            as="a"
            href="#comment-ca-marche"
            size="lg"
            variant="bordered"
            className="border-white/40 text-white"
          >
            Découvrir le projet ↓
          </Button>
        </div>
      </div>

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
