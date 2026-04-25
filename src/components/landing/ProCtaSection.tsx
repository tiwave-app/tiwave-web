import Link from 'next/link'
import { ArrowRight, Building2 } from 'lucide-react'

export function ProCtaSection() {
  return (
    <section className="py-24" style={{ background: '#020c1b' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div
          className="relative overflow-hidden rounded-3xl border border-[#0093d0]/20 p-10 md:p-14 flex flex-col md:flex-row items-center gap-8"
          style={{ background: 'linear-gradient(135deg, #013a63 0%, #01263f 100%)' }}
        >
          {/* Glow */}
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,147,208,0.12) 0%, transparent 70%)' }}
          />

          <div className="flex-1 relative z-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#0093d0]/15 flex items-center justify-center">
                <Building2 size={16} className="text-[#0093d0]" />
              </div>
              <span className="text-[#0093d0] text-xs font-semibold uppercase tracking-wider">
                Professionnels & Collectivités
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-snug">
              Vous gérez un territoire ou des services touristiques ?
            </h2>
            <p className="text-white/55 leading-relaxed max-w-xl">
              Intégrez les données marines TiWave dans vos communications, affichages et applications.
              Partenariats institutionnels, accès API, affichage en mairie — parlons-en.
            </p>
          </div>

          <div className="relative z-10 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#0093d0] text-white font-semibold px-7 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(0,147,208,0.3)]"
            >
              Nous contacter
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
