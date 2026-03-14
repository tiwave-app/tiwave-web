const features = [
  {
    icon: '🌊',
    title: 'Houle, vent, UV, température',
    text: 'Données Open-Meteo actualisées toutes les heures. Score de baignabilité calculé automatiquement pour chaque plage.',
    accent: '#0093d0',
  },
  {
    icon: '🟤',
    title: 'Risque sargasses en temps réel',
    text: 'Tiwave analyse les images satellite NOAA (AFAI) sur 7 jours pour évaluer le risque d\'échouage : faible, modéré, élevé, critique.',
    accent: '#ff6d5a',
  },
  {
    icon: '💧',
    title: 'Eau conforme ou non ?',
    text: 'Résultats des analyses bactériologiques de l\'ARS Martinique, classifiés selon la Directive Européenne Eaux de Baignade.',
    accent: '#2ed6b0',
  },
  {
    icon: '📸',
    title: 'Ce que disent les autres baigneurs',
    text: 'Photos, signalements d\'algues, méduses ou pollution. La communauté complète les données satellitaires.',
    accent: '#013a63',
  },
]

export function Features() {
  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#013a63] mb-4">
            Ce que Tiwave te dit avant d&apos;y aller.
          </h2>
          <p className="text-lg text-gray-500">
            On n&apos;avait pas les bons outils pour lire nos plages. Maintenant si.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((f) => (
            <div
              key={f.title}
              className="flex gap-5 p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                style={{ backgroundColor: f.accent + '20' }}
              >
                {f.icon}
              </div>
              <div>
                <h3 className="font-semibold text-[#013a63] mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
