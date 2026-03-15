import { Card, CardBody } from '@heroui/react'
import { Compass, Waves, Globe } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type ValueProp = {
  icon: LucideIcon
  accentColor: string
  title: string
  description: string
}

const valueProps: ValueProp[] = [
  {
    icon: Compass,
    accentColor: '#2ed6b0',
    title: 'Choisir sa plage plus sereinement',
    description:
      "Fini les mauvaises surprises. Avant de partir, vous savez si l'eau est conforme, si les sargasses arrivent, si les conditions sont bonnes pour nager. L'information était là — TiWave la rend accessible.",
  },
  {
    icon: Waves,
    accentColor: '#0093d0',
    title: 'Mieux comprendre les conditions réelles',
    description:
      "Les données brutes existent déjà — dispersées, techniques, inaccessibles au grand public. TiWave les agrège, les interprète et les restitue dans un langage clair, pour tout le monde.",
  },
  {
    icon: Globe,
    accentColor: '#ff6d5a',
    title: 'Créer une culture citoyenne autour du littoral',
    description:
      "Quand les habitants observent, signalent et partagent, la plage devient un bien commun à surveiller ensemble. TiWave construit cette infrastructure de vigilance collective.",
  },
]

export function About() {
  return (
    <section id="why-tiwave" className="relative py-32 bg-[#020c1b] overflow-hidden">
      {/* Ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
        style={{
          background: 'radial-gradient(ellipse, rgba(0,147,208,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#2ed6b0]/60 uppercase mb-4">
            Pourquoi <span className="text-[#0093d0]">T</span>iWave
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
            Parce que nos plages méritent<br className="hidden md:block" /> mieux que l&apos;incertitude.
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto leading-relaxed">
            TiWave n&apos;est pas une app météo de plus. C&apos;est une infrastructure de transparence pour le littoral.
          </p>
        </div>

        {/* Value prop cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valueProps.map((vp) => {
            const Icon = vp.icon
            return (
              <Card
                key={vp.title}
                classNames={{
                  base: 'bg-white/[0.04] border border-white/[0.07] hover:border-white/[0.15] rounded-2xl shadow-none transition-all duration-300 hover:bg-white/[0.06]',
                }}
                shadow="none"
              >
                <CardBody className="p-8">
                  {/* Top accent bar */}
                  <div
                    className="w-8 h-0.5 rounded-full mb-6"
                    style={{ backgroundColor: vp.accentColor }}
                  />

                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                    style={{
                      backgroundColor: vp.accentColor + '15',
                      border: `1px solid ${vp.accentColor}25`,
                    }}
                  >
                    <Icon size={20} style={{ color: vp.accentColor }} />
                  </div>

                  <h3 className="font-semibold text-white text-lg mb-3 tracking-tight leading-snug">
                    {vp.title}
                  </h3>
                  <p className="text-white/45 text-sm leading-relaxed">{vp.description}</p>
                </CardBody>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
