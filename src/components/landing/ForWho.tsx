import { Card, CardBody, Button } from '@heroui/react'
import { House, Plane, Dumbbell, Building2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Audience = {
  icon: LucideIcon
  title: string
  description: string
  tag: string
}

const audiences: Audience[] = [
  {
    icon: House,
    title: 'Familles',
    tag: 'Résidents',
    description:
      "Évitez les plages polluées ou envahies de sargasses. Sachez avant de partir si l'eau est conforme pour vos enfants.",
  },
  {
    icon: Plane,
    title: 'Touristes & résidents',
    tag: 'Visiteurs',
    description:
      "Découvrez les plages adaptées à votre journée. TiWave vous dit où les conditions sont les meilleures — avant même de partir.",
  },
  {
    icon: Dumbbell,
    title: 'Surfeurs & kitesurfeurs',
    tag: 'Surf · Nage · Kite',
    description:
      "Trouvez les bonnes conditions au bon moment. Houle, vent, UV — tout ce dont vous avez besoin avant le départ.",
  },
  {
    icon: Building2,
    title: 'Pêcheurs & plongeurs',
    tag: 'Plongée · Pêche',
    description:
      "Accédez à des infos utiles et locales. Qualité de l'eau et conditions marines en un coup d'œil.",
  },
]

export function ForWho() {
  return (
    <section id="for-who" className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#0093d0] uppercase mb-4">
            Pour qui
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#013a63] tracking-tight mb-5">
            TiWave s&apos;adresse à ceux<br className="hidden md:block" /> qui vivent avec la mer.
          </h2>
          <p className="text-[#5a7a8e] text-lg max-w-xl mx-auto leading-relaxed">
            Pas seulement à ceux qui la regardent.
          </p>
        </div>

        {/* Audience cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-14">
          {audiences.map((a) => {
            const Icon = a.icon
            return (
              <Card
                key={a.title}
                classNames={{
                  base: 'bg-[#fdf9f3] rounded-2xl shadow-[0_2px_16px_rgba(1,58,99,0.07)] hover:shadow-[0_8px_30px_rgba(1,58,99,0.12)] transition-all duration-300 hover:-translate-y-1 group',
                }}
                shadow="none"
              >
                <CardBody className="p-7 flex flex-row gap-5 items-start">
                  <div className="w-11 h-11 rounded-xl bg-[#0093d0]/10 border border-[#0093d0]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#0093d0]/15 transition-colors duration-300">
                    <Icon size={20} className="text-[#0093d0]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-semibold text-[#013a63] text-base tracking-tight">
                        {a.title}
                      </h3>
                      <span className="text-[10px] text-[#013a63]/35 font-medium tracking-wide">
                        {a.tag}
                      </span>
                    </div>
                    <p className="text-[#5a7a8e] text-sm leading-relaxed">{a.description}</p>
                  </div>
                </CardBody>
              </Card>
            )
          })}
        </div>

        {/* Institutional CTA */}
        <div className="text-center">
          <Button
            as="a"
            href="mailto:contact@tiwave.app"
            variant="bordered"
            className="border-[#013a63]/20 text-[#013a63]/60 hover:border-[#0093d0]/40 hover:text-[#0093d0] rounded-full px-8 transition-all duration-300"
            size="lg"
          >
            Vous êtes un acteur institutionnel ? Parlons-en →
          </Button>
        </div>
      </div>
    </section>
  )
}
