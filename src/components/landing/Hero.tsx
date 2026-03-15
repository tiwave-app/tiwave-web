import { Button } from '@heroui/react'

const stats = [
  { value: '70+', label: 'plages référencées' },
  { value: '3', label: 'sources institutionnelles' },
  { value: '100%', label: 'open data' },
]

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#020c1b] pt-16">
      {/* Atmospheric glow orbs */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[-10%] right-[-5%] w-[700px] h-[700px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(0,147,208,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[10%] left-[-5%] w-[500px] h-[500px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(46,214,176,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-6">
          <span className="block text-white">La plateforme référente</span>
          <span className="block text-white">pour la santé des plages</span>
          <span
            className="block"
            style={{
              background: 'linear-gradient(90deg, #2ed6b0 0%, #0093d0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            en temps réel.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-white/50 mb-10 max-w-2xl mx-auto leading-relaxed">
          TiWave agrège données institutionnelles, signaux satellite et ressentis terrain
          pour rendre les conditions de baignade lisibles{' '}
          <span className="text-white/70">en un coup d&apos;œil</span>.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button
            as="a"
            href="#newsletter"
            size="lg"
            className="bg-[#2ed6b0] text-[#020c1b] font-semibold px-8 rounded-full shadow-[0_0_40px_rgba(46,214,176,0.3)]"
          >
            Rejoindre la liste d&apos;attente
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
      </div>

      {/* Stats strip */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-6 mt-24 mb-12">
        <div className="grid grid-cols-3 divide-x divide-white/[0.06] border border-white/[0.06] rounded-2xl bg-white/[0.03] backdrop-blur-sm overflow-hidden">
          {stats.map((stat) => (
            <div key={stat.label} className="py-6 text-center px-4">
              <div className="text-3xl font-bold text-white tracking-tight">{stat.value}</div>
              <div className="text-xs text-white/35 mt-1.5 leading-snug">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
