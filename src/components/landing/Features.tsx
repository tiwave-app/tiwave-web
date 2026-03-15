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
    title: 'Données open data',
    description:
      "TiWave collecte automatiquement les données scientifiques et institutionnelles : imagerie satellite NOAA, météo marine Open-Meteo, analyses bactériologiques de l'ARS Martinique.",
    accentColor: '#0093d0',
  },
  {
    number: '02',
    icon: Users,
    title: 'Signalements & ressentis terrain',
    description:
      "Les usagers complètent la donnée satellite avec des photos, signalements d'algues, de méduses ou de pollution. La communauté voit ce que les capteurs ne voient pas.",
    accentColor: '#2ed6b0',
  },
  {
    number: '03',
    icon: Map,
    title: 'Analyse et carte des plages',
    description:
      "TiWave calcule un score de baignabilité pour chaque plage et l'affiche sur une carte claire. Un coup d'œil suffit pour choisir.",
    accentColor: '#ff6d5a',
  },
]

export function Features() {
  return (
    <section id="how-it-works" className="py-32 bg-[#050f1e]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="text-xs font-semibold tracking-[0.2em] text-[#2ed6b0]/70 uppercase mb-4">
            Fonctionnement
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5">
            Comment ça marche ?
          </h2>
          <p className="text-white/45 text-lg max-w-xl mx-auto leading-relaxed">
            Trois sources. Une synthèse claire. On fait le travail pour que vous n&apos;ayez pas à le faire.
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
                'linear-gradient(90deg, rgba(0,147,208,0.4) 0%, rgba(46,214,176,0.4) 50%, rgba(255,109,90,0.4) 100%)',
            }}
          />

          {steps.map((step) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="relative bg-white/[0.04] border border-white/[0.07] rounded-2xl p-8 hover:border-white/[0.15] hover:bg-white/[0.06] transition-all duration-300 group"
              >
                {/* Step number */}
                <div
                  className="text-7xl font-black leading-none mb-6 select-none opacity-[0.07] group-hover:opacity-[0.12] transition-opacity duration-300"
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

                <h3 className="font-semibold text-white text-lg mb-3 tracking-tight">
                  {step.title}
                </h3>
                <p className="text-white/45 text-sm leading-relaxed">{step.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
