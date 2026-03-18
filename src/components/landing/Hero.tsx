import { Button } from '@heroui/react'
import { CheckCircle, Lock } from 'lucide-react'

const stats = [
  { value: '30+', label: 'plages de Martinique' },
  { value: '3', label: 'sources institutionnelles' },
  { value: '100%', label: 'open data' },
]

const features = [
  'Conditions mises à jour en temps réel',
  'Score de baignade simple et clair',
  'Alertes sargasses & qualité de l\'eau',
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background photo */}
      <div
        aria-hidden
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/hero-beach.jpg)' }}
      />
      {/* Dark overlay — gradient for readability */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(1,20,40,0.55) 0%, rgba(1,20,40,0.72) 50%, rgba(1,10,25,0.88) 100%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Headline */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
          <span className="block text-white">Choisissez la bonne plage,</span>
          <span
            className="block"
            style={{
              background: 'linear-gradient(90deg, #2ed6b0 0%, #0093d0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            avant même de partir.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/60 mb-8 max-w-2xl mx-auto leading-relaxed">
          Qualité de l&apos;eau, sargasses, météo marine — toutes les conditions{' '}
          <span className="text-white/70">en temps réel, en un coup d&apos;œil.</span>
        </p>

        {/* Feature bullets */}
        <ul className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          {features.map((f) => (
            <li key={f} className="flex items-center gap-2 text-white/60 text-sm">
              <CheckCircle size={14} className="text-[#2ed6b0] shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            as="a"
            href="#newsletter"
            size="lg"
            className="text-[#020c1b] font-semibold px-8 rounded-full shadow-[0_0_40px_rgba(46,214,176,0.35)]"
            style={{
              background: 'linear-gradient(135deg, #2ed6b0 0%, #17c4a4 100%)',
            }}
          >
            Je veux accéder à TiWave en avant-première
          </Button>
          <Button
            as="a"
            href="#how-it-works"
            size="lg"
            variant="bordered"
            className="border-white/15 text-white/70 hover:border-white/30 hover:text-white rounded-full transition-all duration-300"
          >
            Découvrir le projet ↓
          </Button>
        </div>

        {/* Urgency / social proof */}
        <div className="flex items-center justify-center gap-2 mt-5 text-white/30 text-xs">
          <Lock size={11} />
          <span>Beta privée · Lancement Martinique dans quelques semaines · Places limitées</span>
        </div>
      </div>

      {/* Stats strip */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 mt-24 mb-12">
        <div className="grid grid-cols-3 divide-x divide-white/[0.06] border border-white/[0.06] rounded-2xl bg-white/[0.03] backdrop-blur-sm overflow-hidden">
          {stats.map((stat) => (
            <div key={stat.label} className="py-6 text-center px-4">
              <div className="text-4xl font-bold text-white tracking-tight">{stat.value}</div>
              <div className="text-xs text-white/35 mt-1.5 leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
