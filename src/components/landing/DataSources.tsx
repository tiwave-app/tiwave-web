const sources = [
  {
    name: 'NOAA ERDDAP / AFAI',
    description:
      'Index d\'anomalie des algues flottantes, mis à jour quotidiennement via imagerie satellite',
    logo: '🛰️',
  },
  {
    name: 'Open-Meteo Marine API',
    description:
      'Houle, vent, UV, température de l\'eau et de l\'air — précision horaire',
    logo: '🌤️',
  },
  {
    name: 'ARS Martinique',
    description:
      'Résultats officiels de qualité des eaux de baignade (programme national Baignade)',
    logo: '🏛️',
  },
]

export function DataSources() {
  return (
    <section id="donnees" className="py-24 bg-[#f4e9d8]/40">
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

        <div className="bg-[#013a63] text-white rounded-2xl p-8 text-center">
          <p className="text-lg mb-2 font-medium">
            Vous êtes une collectivité, un office du tourisme ou un opérateur touristique ?
          </p>
          <p className="text-white/70 mb-6">
            Tiwave peut s&apos;intégrer à vos outils ou vous fournir les données de vos plages.
          </p>
          <a
            href="mailto:contact@tiwave.app"
            className="inline-flex items-center gap-2 bg-[#2ed6b0] text-[#013a63] font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Nous contacter →
          </a>
        </div>
      </div>
    </section>
  )
}
