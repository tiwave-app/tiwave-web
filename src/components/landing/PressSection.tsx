import { ExternalLink, Trophy, Sprout } from 'lucide-react'

const pressArticles: {
  source: string
  title: string
  date: string
  url: string
}[] = [
  {
    source: 'RCI Martinique',
    title: 'Concours Fanm Dijital : cinq lauréates distinguées pour leur audace numérique',
    date: '28 fév. 2026',
    url: 'https://rci.fm/martinique/infos/Economie/Concours-Fanm-Dijital-Sabrina-Ajax-decroche-le-Grand-Prix-de-la-5eme-edition',
  },
  {
    source: 'Zay Actu',
    title: 'Fanm Dijital 2025 : cinq lauréates martiniquaises distinguées pour leur audace numérique',
    date: '28 fév. 2026',
    url: 'https://www.zayactu.org/martinique/fanm-dijital-2025-cinq-laureates-martiniquaises-distinguees-pour-leur-audace-numerique',
  },
  {
    source: 'France-Antilles',
    title: 'Ces femmes qui façonnent le numérique chez nous',
    date: 'fév. 2026',
    url: 'https://www.martinique.franceantilles.fr/regions/departement/ces-femmes-qui-faconnent-le-numerique-chez-nous-1071284.php',
  },
  {
    source: 'Richès Karayib',
    title: 'Fanm Dijital 2025 : retour sur la cérémonie de remise des prix',
    date: 'fév. 2026',
    url: 'https://richeskarayib.com/fr/fanm-dijital-2025-sabrina-ajax-grand-prix/',
  },
]

export function PressSection() {
  return (
    <section id="reconnaissance" className="py-24 bg-white border-y border-[#013a63]/[0.05]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Eyebrow */}
        <p className="text-center text-xs font-semibold tracking-[0.2em] text-[#0093d0] uppercase mb-4">
          Reconnaissance & presse
        </p>
        <h2 className="text-center text-3xl md:text-4xl font-bold text-[#013a63] tracking-tight mb-14">
          Ils parlent de nous.
        </h2>

        {/* Awards — equal treatment */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-14">
          {/* Prix Mitan Tjè */}
          <div
            className="relative overflow-hidden rounded-2xl border border-[#ff6d5a]/20 p-7"
            style={{ background: 'linear-gradient(135deg, rgba(255,109,90,0.08) 0%, rgba(255,109,90,0.03) 100%)' }}
          >
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#ff6d5a]/15 border border-[#ff6d5a]/25 flex items-center justify-center flex-shrink-0">
                <Trophy size={26} className="text-[#ff6d5a]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-semibold tracking-[0.2em] text-[#ff6d5a]/70 uppercase mb-1">
                  Lauréate — Fanm Dijital 2025
                </div>
                <h3 className="text-[#013a63] font-bold text-xl tracking-tight">Prix Mitan Tjè</h3>
                <p className="text-[#5a7a8e] text-sm mt-1">
                  Collectivité Territoriale de Martinique — 5ème édition
                </p>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1.5 bg-[#ff6d5a]/10 border border-[#ff6d5a]/20 rounded-full px-4 py-1.5 text-xs text-[#ff6d5a] font-medium">
                Fév. 2026
              </span>
            </div>
          </div>

          {/* Pré-pépinière Technopole CACEM */}
          <div
            className="relative overflow-hidden rounded-2xl border border-[#2ed6b0]/20 p-7"
            style={{ background: 'linear-gradient(135deg, rgba(46,214,176,0.08) 0%, rgba(46,214,176,0.03) 100%)' }}
          >
            <div aria-hidden className="pointer-events-none absolute -top-12 -right-12 w-48 h-48 rounded-full"
              style={{ background: 'radial-gradient(circle, rgba(46,214,176,0.10) 0%, transparent 70%)' }} />
            <div className="relative flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-14 h-14 rounded-2xl bg-[#2ed6b0]/15 border border-[#2ed6b0]/25 flex items-center justify-center flex-shrink-0">
                <Sprout size={26} className="text-[#2ed6b0]" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-semibold tracking-[0.2em] text-[#2ed6b0]/70 uppercase mb-1">
                  Accompagnement — 2026
                </div>
                <h3 className="text-[#013a63] font-bold text-xl tracking-tight">Pré-pépinière</h3>
                <p className="text-[#5a7a8e] text-sm mt-1">
                  Technopole CACEM · Martinique
                </p>
              </div>
              <span className="shrink-0 inline-flex items-center gap-1.5 bg-[#2ed6b0]/10 border border-[#2ed6b0]/20 rounded-full px-4 py-1.5 text-xs text-[#2ed6b0] font-medium">
                2026
              </span>
            </div>
          </div>
        </div>

        {/* Press articles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {pressArticles.map((article) => (
            <a
              key={article.url}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col justify-between bg-[#fdf9f3] border border-[#013a63]/[0.07] rounded-xl p-5 hover:border-[#0093d0]/25 hover:bg-white hover:-translate-y-1 transition-all duration-300"
            >
              <div>
                <p className="text-[#0093d0] text-[10px] font-semibold uppercase tracking-widest mb-2">
                  {article.source}
                </p>
                <p className="text-[#013a63]/70 text-sm font-medium leading-snug group-hover:text-[#013a63] transition-colors">
                  {article.title}
                </p>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-[#013a63]/30 text-xs">{article.date}</span>
                <ExternalLink
                  size={13}
                  className="text-[#013a63]/20 group-hover:text-[#0093d0] transition-colors"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
