const audiences = [
  {
    icon: '🏘️',
    title: 'Habitants',
    text: 'Tu vis en Martinique et tu veux savoir si ta plage du dimanche est en bonne santé. Tiwave est faite pour toi en premier.',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Familles',
    text: 'Partir avec les enfants sans mauvaise surprise. Eau conforme, pas de sargasses, conditions douces — tout en un coup d\'œil.',
  },
  {
    icon: '🏄',
    title: 'Sportifs, surfeurs, nageurs',
    text: 'Houle, vent, UV, température de l\'eau avant l\'entraînement. Les données dont tu as besoin, au bon moment.',
  },
  {
    icon: '🏛️',
    title: 'Acteurs locaux',
    text: 'Communes, offices du tourisme, associations littorales — Tiwave peut fournir les données de vos plages ou s\'intégrer à vos outils.',
  },
]

export function ForWho() {
  return (
    <section id="pour-qui" className="py-24 bg-[#013a63]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Pour qui ?
          </h2>
          <p className="text-lg text-white/60 max-w-xl mx-auto">
            Tiwave s&apos;adresse à ceux qui vivent avec la mer, pas seulement à ceux qui la regardent.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {audiences.map((a) => (
            <div
              key={a.title}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="text-3xl mb-4">{a.icon}</div>
              <h3 className="font-bold text-white text-base mb-2">{a.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{a.text}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="mailto:contact@tiwave.app"
            className="inline-flex items-center gap-2 bg-[#2ed6b0] text-[#013a63] font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Vous êtes un acteur local ? Parlons-en →
          </a>
        </div>
      </div>
    </section>
  )
}
