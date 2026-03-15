import { Card, CardBody, Button } from '@heroui/react'
import { House, Users, Dumbbell, Building2 } from 'lucide-react'
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
    title: 'Habitants',
    tag: 'Résidents',
    description:
      "Vous vivez en Martinique et voulez savoir si votre plage du dimanche est en bonne santé. TiWave est pensée pour vous en premier.",
  },
  {
    icon: Users,
    title: 'Familles',
    tag: 'Avec enfants',
    description:
      "Partir avec les enfants sans mauvaise surprise. Eau conforme, sargasses, conditions douces — tout en un coup d'œil avant de sortir.",
  },
  {
    icon: Dumbbell,
    title: 'Sportifs & nageurs',
    tag: 'Surf · Nage · Kite',
    description:
      "Houle, vent, UV, température de l'eau avant l'entraînement. Les données techniques dont vous avez besoin, au bon moment.",
  },
  {
    icon: Building2,
    title: 'Acteurs locaux',
    tag: 'Communes · Tourisme',
    description:
      "Communes, offices du tourisme, associations littorales — TiWave fournit les données de vos plages et peut s'intégrer à vos outils.",
  },
]

export function ForWho() {
  return (
    <section id="for-who" className="py-32 bg-[#050f1e]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#2ed6b0]/70 uppercase mb-4">
            Pour qui
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
            TiWave s&apos;adresse à ceux<br className="hidden md:block" /> qui vivent avec la mer.
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto leading-relaxed">
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
                  base: 'bg-white/[0.04] border border-white/[0.07] hover:border-[#2ed6b0]/20 rounded-2xl shadow-none transition-all duration-300 hover:bg-white/[0.06] group',
                }}
                shadow="none"
              >
                <CardBody className="p-7 flex flex-row gap-5 items-start">
                  <div className="w-11 h-11 rounded-xl bg-[#2ed6b0]/10 border border-[#2ed6b0]/15 flex items-center justify-center flex-shrink-0 group-hover:bg-[#2ed6b0]/15 transition-colors duration-300">
                    <Icon size={20} className="text-[#2ed6b0]" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-1.5">
                      <h3 className="font-semibold text-white text-base tracking-tight">
                        {a.title}
                      </h3>
                      <span className="text-[10px] text-white/30 font-medium tracking-wide">
                        {a.tag}
                      </span>
                    </div>
                    <p className="text-white/45 text-sm leading-relaxed">{a.description}</p>
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
            className="border-white/15 text-white/60 hover:border-[#2ed6b0]/40 hover:text-[#2ed6b0] rounded-full px-8 transition-all duration-300"
            size="lg"
          >
            Vous êtes un acteur institutionnel ? Parlons-en →
          </Button>
        </div>
      </div>
    </section>
  )
}
