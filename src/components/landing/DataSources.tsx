const sources = [
  {
    name: 'NOAA ERDDAP / AFAI',
    description: 'Index d\'anomalie des algues flottantes, mis à jour quotidiennement via imagerie satellite',
    logo: '🛰️',
  },
  {
    name: 'Open-Meteo Marine API',
    description: 'Houle, vent, UV, température de l\'eau et de l\'air — précision horaire',
    logo: '🌤️',
  },
  {
    name: 'ARS Martinique',
    description: 'Résultats officiels de qualité des eaux de baignade (programme national Baignade)',
    logo: '🏛️',
  },
]

const credibility = [
  { label: 'Projet martiniquais', detail: 'Conçu depuis la Martinique, pour les Martiniquais' },
  { label: 'Démarche data + terrain + IA', detail: 'Sources scientifiques, signaux communautaires, analyse automatisée' },
  { label: 'Pré-pépinière Technopole CACEM', detail: 'Accompagnée dans le cadre du programme 2026' },
]

export function DataSources() {
  return (
    <section id="sources" className="py-24 bg-[#f4e9d8]/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#013a63] mb-4">
            Des données de référence, pas des estimations.
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Tiwave ne produit pas d&apos;opinions — elle agrège et structure des sources scientifiques
            et institutionnelles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {sources.map((s) => (
            <div key={s.name} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="text-4xl mb-4">{s.logo}</div>
              <h3 className="font-bold text-[#013a63] mb-2">{s.name}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {credibility.map((c) => (
            <div key={c.label} className="bg-white rounded-xl p-5 border border-gray-100 flex gap-4 items-start">
              <span className="text-[#2ed6b0] text-xl mt-0.5">✓</span>
              <div>
                <p className="font-semibold text-[#013a63] text-sm">{c.label}</p>
                <p className="text-gray-500 text-xs mt-1">{c.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
