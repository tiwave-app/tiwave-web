const steps = [
  {
    number: '01',
    icon: '🛰️',
    title: 'Données open data',
    text: 'Tiwave collecte automatiquement les données scientifiques et institutionnelles : imagerie satellite NOAA, météo marine Open-Meteo, analyses bactériologiques de l\'ARS Martinique.',
    accent: '#0093d0',
  },
  {
    number: '02',
    icon: '📸',
    title: 'Signalements & ressentis terrain',
    text: 'Les usagers complètent la donnée satellite avec des photos, des signalements d\'algues, de méduses ou de pollution. La communauté voit ce que les capteurs ne voient pas.',
    accent: '#2ed6b0',
  },
  {
    number: '03',
    icon: '🗺️',
    title: 'Analyse et carte des plages',
    text: 'Tiwave calcule un score de baignabilité pour chaque plage et l\'affiche sur une carte. Un coup d\'œil suffit pour choisir où aller.',
    accent: '#ff6d5a',
  },
]

export function Features() {
  return (
    <section id="comment-ca-marche" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#013a63] mb-4">
            Comment ça marche ?
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Trois sources, une synthèse claire. On fait le travail pour que tu n&apos;aies pas à le faire.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((s) => (
            <div key={s.number} className="relative p-8 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow">
              <div
                className="text-5xl font-black mb-4 opacity-10 select-none"
                style={{ color: s.accent }}
              >
                {s.number}
              </div>
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                style={{ backgroundColor: s.accent + '20' }}
              >
                {s.icon}
              </div>
              <h3 className="font-bold text-[#013a63] text-lg mb-3">{s.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
