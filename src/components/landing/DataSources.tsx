import { Chip, Divider } from '@heroui/react'
import { Satellite, Wind, FlaskConical, CheckCircle2 } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

type Source = {
  icon: LucideIcon
  name: string
  shortDescription: string
  detail: string
  accentColor: string
}

const sources: Source[] = [
  {
    icon: Satellite,
    name: 'NOAA ERDDAP / AFAI',
    shortDescription: 'Imagerie satellite',
    detail:
      "Index d'anomalie des algues flottantes mis à jour quotidiennement. Détection des masses de sargasses à 7 jours.",
    accentColor: '#0093d0',
  },
  {
    icon: Wind,
    name: 'Open-Meteo Marine API',
    shortDescription: 'Météo marine',
    detail:
      "Houle, vent, UV, température de l'eau et de l'air. Précision horaire, modèle ECMWF.",
    accentColor: '#2ed6b0',
  },
  {
    icon: FlaskConical,
    name: 'ARS Martinique',
    shortDescription: 'Qualité eau officielle',
    detail:
      "Résultats officiels de qualité des eaux de baignade. Programme national Baignade, classifié selon la Directive Européenne.",
    accentColor: '#ff6d5a',
  },
]

const trustSignals = [
  'Projet martiniquais',
  'Démarche data + terrain + IA',
  'Pré-pépinière Technopole CACEM',
  'Open data uniquement',
  'Aucune donnée vendue',
  'RGPD conforme',
]

export function DataSources() {
  return (
    <section id="sources" className="py-32 bg-[#020c1b]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#2ed6b0]/60 uppercase mb-4">
            Sources & crédibilité
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
            Des données de référence,<br className="hidden md:block" /> pas des estimations.
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto leading-relaxed">
            TiWave ne produit pas d&apos;opinions — elle structure des sources scientifiques
            et institutionnelles reconnues.
          </p>
        </div>

        {/* Source cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-12">
          {sources.map((s) => {
            const Icon = s.icon
            return (
              <div
                key={s.name}
                className="bg-white/[0.04] border border-white/[0.07] rounded-2xl p-7 hover:border-white/[0.12] hover:bg-white/[0.06] hover:-translate-y-1 transition-all duration-300"
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-5"
                  style={{
                    backgroundColor: s.accentColor + '15',
                    border: `1px solid ${s.accentColor}25`,
                  }}
                >
                  <Icon size={18} style={{ color: s.accentColor }} />
                </div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-semibold text-white text-base tracking-tight leading-snug">
                    {s.name}
                  </h3>
                  <span
                    className="text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 mt-0.5"
                    style={{
                      color: s.accentColor,
                      backgroundColor: s.accentColor + '15',
                    }}
                  >
                    {s.shortDescription}
                  </span>
                </div>
                <p className="text-white/40 text-sm leading-relaxed">{s.detail}</p>
              </div>
            )
          })}
        </div>

        <Divider className="bg-white/[0.06] mb-10" />

        {/* Trust chips */}
        <div className="flex flex-wrap gap-3 justify-center">
          {trustSignals.map((signal) => (
            <Chip
              key={signal}
              startContent={<CheckCircle2 size={13} className="text-[#2ed6b0] ml-1" />}
              classNames={{
                base: 'bg-white/[0.04] border border-white/[0.08] text-white/50 h-8',
                content: 'text-xs font-medium px-1',
              }}
              variant="bordered"
            >
              {signal}
            </Chip>
          ))}
        </div>
      </div>
    </section>
  )
}
