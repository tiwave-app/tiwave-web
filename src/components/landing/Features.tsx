import { Satellite, Users, Map } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Step = {
  number: string
  icon: LucideIcon
  title: string
  description: string
  accentColor: string
}

const steps: Step[] = [
  {
    number: '01',
    icon: Satellite,
    title: 'Choisis ta plage',
    description:
      "Visualise les conditions autour de toi — sargasses, météo marine, qualité de l'eau en un coup d'œil.",
    accentColor: '#0093d0',
  },
  {
    number: '02',
    icon: Users,
    title: 'TiWave analyse en temps réel',
    description:
      "Données croisées satellite + signalements terrain + météo marine — tout agrégé automatiquement.",
    accentColor: '#2ed6b0',
  },
  {
    number: '03',
    icon: Map,
    title: 'Tu pars sereinement',
    description:
      "Plus de mauvaises surprises. Un score, une couleur, une décision.",
    accentColor: '#ff6d5a',
  },
]

export function Features() {
  return (
    <section id="how-it-works" className="py-32 bg-[#fdf9f3]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#0093d0] uppercase mb-4">
            Fonctionnement
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#013a63] tracking-tight mb-5">
            En 10 secondes, vous savez où aller.
          </h2>
          <p className="text-[#5a7a8e] text-lg max-w-xl mx-auto leading-relaxed">
            TiWave analyse les données pour vous. Vous n&apos;avez plus qu&apos;à choisir.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {/* Connector line (desktop) */}
          <div
            aria-hidden
            className="hidden md:block absolute top-[52px] left-[calc(16.67%+24px)] right-[calc(16.67%+24px)] h-px"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,147,208,0.35) 0%, rgba(46,214,176,0.35) 50%, rgba(255,109,90,0.35) 100%)',
            }}
          />

          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="relative bg-white rounded-2xl p-8 shadow-[0_2px_16px_rgba(1,58,99,0.07)] hover:shadow-[0_8px_30px_rgba(1,58,99,0.12)] hover:-translate-y-1 transition-all duration-300 group"
              >
                {/* Step number */}
                <div
                  className="text-7xl font-black leading-none mb-6 select-none opacity-[0.12] group-hover:opacity-[0.22] transition-opacity duration-300"
                  style={{ color: step.accentColor }}
                >
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: step.accentColor + '18', border: `1px solid ${step.accentColor}30` }}
                >
                  <Icon size={20} style={{ color: step.accentColor }} />
                </div>

                <h3 className="font-semibold text-[#013a63] text-lg mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[#5a7a8e] text-sm leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
