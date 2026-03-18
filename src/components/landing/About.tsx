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
    title: 'Choisir sa plage sereinement',
    description:
      "Plus de doute avant de partir. Sachez si l'eau est conforme, si les sargasses arrivent, si les conditions sont bonnes.",
  },
  {
    icon: Waves,
    accentColor: '#0093d0',
    title: 'Des conditions fiables, pour tous',
    description:
      "Des données complexes rendues simples. Tout le monde mérite une information claire avant de partir.",
  },
  {
    icon: Globe,
    accentColor: '#ff6d5a',
    title: 'Une culture citoyenne du littoral',
    description:
      "Une communauté qui observe et partage. La plage devient un bien commun à surveiller ensemble.",
  },
]

export function About() {
  return (
    <section id="why-tiwave" className="relative py-32 bg-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#0093d0] uppercase mb-4">
            Pourquoi TiWave
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#013a63] tracking-tight">
            Parce qu&apos;aller à la plage<br className="hidden md:block" /> ne devrait jamais être un pari.
          </h2>
        </div>

        {/* Punchline card */}
        <div className="mb-10">
          <div
            className="relative overflow-hidden rounded-2xl shadow-[0_2px_16px_rgba(1,58,99,0.07)] px-8 py-7 text-center"
            style={{
              background: 'linear-gradient(135deg, rgba(244,233,216,0.6) 0%, rgba(244,233,216,0.3) 100%)',
            }}
          >
            <p className="text-[#013a63] text-xl md:text-2xl font-semibold leading-snug tracking-tight">
              Aujourd&apos;hui, vous partez sans savoir.
            </p>
            <p className="text-[#0093d0] text-xl md:text-2xl font-semibold leading-snug tracking-tight mt-1">
              Demain, vous décidez.
            </p>
          </div>
        </div>

        {/* Value prop cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {valueProps.map((vp) => {
            const Icon = vp.icon
            return (
              <Card
                key={vp.title}
                classNames={{
                  base: 'bg-[#fdf9f3] rounded-2xl shadow-[0_2px_16px_rgba(1,58,99,0.07)] hover:shadow-[0_8px_30px_rgba(1,58,99,0.12)] transition-all duration-300 hover:-translate-y-1',
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

                  <h3 className="font-semibold text-[#013a63] text-lg mb-3 tracking-tight leading-snug">
                    {vp.title}
                  </h3>
                  <p className="text-[#5a7a8e] text-sm leading-relaxed">{vp.description}</p>
                </CardBody>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
