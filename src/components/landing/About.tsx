const reasons = [
  {
    icon: '🏖️',
    title: 'Choisir sa plage plus sereinement',
    text: 'Fini les mauvaises surprises. Avant de partir, tu sais si l\'eau est conforme, si les sargasses arrivent, si les conditions sont bonnes pour nager.',
  },
  {
    icon: '🔍',
    title: 'Mieux comprendre les conditions réelles',
    text: 'Les données brutes existent déjà — dispersées, techniques, inaccessibles. Tiwave les rend lisibles pour tout le monde, pas seulement pour les experts.',
  },
  {
    icon: '🤝',
    title: 'Créer une culture citoyenne autour du littoral',
    text: 'Quand les habitants signalent, comparent et partagent, la plage devient un bien commun à surveiller ensemble. Tiwave construit cette infrastructure.',
  },
]

export function About() {
  return (
    <section id="pourquoi" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#013a63] mb-4">
            Pourquoi Tiwave ?
          </h2>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Parce que nos plages méritent des outils à la hauteur de leur richesse.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((r) => (
            <div key={r.title} className="text-center p-8 rounded-2xl bg-[#f4e9d8]/30">
              <div className="text-4xl mb-4">{r.icon}</div>
              <h3 className="font-bold text-[#013a63] text-lg mb-3">{r.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
