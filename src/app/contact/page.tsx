import Link from 'next/link'
import { ContactForm } from '@/components/landing/ContactForm'
import { Building2, Users, BarChart3 } from 'lucide-react'

export const metadata = {
  title: 'Contact professionnels — TiWave',
  description:
    'Vous êtes une collectivité, une mairie ou un professionnel du tourisme ? Contactez-nous pour explorer un partenariat ou intégrer les données TiWave.',
}

const USECASES = [
  {
    icon: Building2,
    title: 'Collectivités',
    description: "Affichez les conditions de baignade en temps réel dans vos mairies, offices de tourisme et points d'accueil.",
  },
  {
    icon: Users,
    title: 'Professionnels du tourisme',
    description: 'Intégrez les alertes plages TiWave dans vos applications, sites et communications clients.',
  },
  {
    icon: BarChart3,
    title: 'Chercheurs & institutions',
    description: 'Accédez aux données marines et environnementales collectées en Martinique via notre API.',
  },
]

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main
        className="min-h-screen pt-24 pb-32"
        style={{ background: 'linear-gradient(160deg, #013a63 0%, #020c1b 50%, #071e38 100%)' }}
      >
        {/* Glow */}
        <div
          aria-hidden
          className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse, rgba(0,147,208,0.08) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-[#0093d0]/10 border border-[#0093d0]/20 rounded-full px-4 py-1.5 text-xs text-[#0093d0] font-medium mb-6">
              Professionnels & Collectivités
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5 leading-[1.1]">
              Travaillons ensemble
              <br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #0093d0 0%, #2ed6b0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                pour la Martinique
              </span>
            </h1>
            <p className="text-white/50 text-lg max-w-2xl mx-auto leading-relaxed">
              TiWave collecte et diffuse les données environnementales marines en temps réel.
              Partageons ces informations avec les acteurs du territoire.
            </p>
          </div>

          {/* Use cases */}
          <div className="grid md:grid-cols-3 gap-4 mb-16">
            {USECASES.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="bg-white/[0.04] border border-white/8 rounded-2xl p-6"
              >
                <div className="w-10 h-10 rounded-xl bg-[#0093d0]/15 flex items-center justify-center mb-4">
                  <Icon size={18} className="text-[#0093d0]" />
                </div>
                <h3 className="text-white font-semibold mb-2">{title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="max-w-2xl mx-auto">
            <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-8 md:p-10">
              <h2 className="text-white font-bold text-xl mb-1">Envoyez-nous un message</h2>
              <p className="text-white/40 text-sm mb-8">Réponse sous 48h ouvrées.</p>
              <ContactForm />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-[#013a63]/90 backdrop-blur-sm">
      <Link href="/" className="text-xl font-bold">
        <span className="text-white">Tiwave</span>
        <span className="text-[#0093d0]">.</span>
      </Link>
      <div className="hidden md:flex items-center gap-6 text-sm text-white/80">
        <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
        <Link href="/#donnees" className="hover:text-white transition-colors">Données</Link>
        <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        <Link href="/contact" className="text-white transition-colors">Nous contacter</Link>
      </div>
      <Link
        href="/#newsletter"
        className="bg-[#0093d0] text-white text-sm font-medium px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
      >
        Être notifié →
      </Link>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-[#013a63] text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <div className="text-xl font-bold mb-1">
              Tiwave<span className="text-[#0093d0]">.</span>
            </div>
            <p className="text-white/60 text-sm">Martinique, Antilles françaises</p>
            <p className="text-white/60 text-sm mt-1">contact@tiwave.app</p>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-white/70">
            <Link href="/#newsletter" className="hover:text-white transition-colors">Newsletter</Link>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-white/40 text-sm">
          © 2026 Tiwave — Tous droits réservés
        </div>
      </div>
    </footer>
  )
}
