import Link from 'next/link'
import { Divider } from '@heroui/react'
import { Linkedin, Instagram, MessageCircle } from 'lucide-react'

const projectLinks = [
  { href: '#how-it-works', label: 'Comment ça marche' },
  { href: '#why-tiwave', label: 'Pourquoi TiWave' },
  { href: '#sources', label: 'Sources de données' },
  { href: '/blog', label: 'Blog', isRoute: true },
]

const legalLinks = [
  { href: '/mentions-legales', label: 'Mentions légales' },
  { href: '/confidentialite', label: 'Politique de confidentialité' },
  { href: '#newsletter', label: 'Newsletter' },
]

const socialLinks = [
  {
    href: 'https://www.linkedin.com/company/tiwave',
    label: 'LinkedIn',
    icon: Linkedin,
  },
  {
    href: 'https://www.instagram.com/tiwave.app',
    label: 'Instagram',
    icon: Instagram,
  },
  {
    href: 'https://chat.whatsapp.com/H2YiHQOO1dqFtSpCGdpiV7',
    label: 'WhatsApp',
    icon: MessageCircle,
  },
]

export default function Footer() {
  return (
    <footer className="bg-[#020c1b] border-t border-white/[0.06]">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="text-2xl font-bold tracking-tight mb-3">
              <span className="text-[#0093d0]">T</span><span style={{ color: '#f4e9d8' }}>iWave</span>
            </div>
            <p className="text-white/35 text-sm leading-relaxed mb-4">
              La plateforme référente pour la santé des plages en Martinique.
            </p>
            <p className="text-white/25 text-xs">Martinique, Antilles françaises</p>
            <a
              href="mailto:contact@tiwave.app"
              className="text-white/25 text-xs hover:text-white/50 transition-colors duration-200 mt-1 block mb-5"
            >
              contact@tiwave.app
            </a>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => {
                const Icon = s.icon
                return (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-8 h-8 rounded-lg bg-white/[0.05] border border-white/[0.08] flex items-center justify-center text-white/40 hover:text-white hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200"
                  >
                    <Icon size={15} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Project links */}
          <div>
            <p className="text-white/25 text-xs font-semibold tracking-[0.15em] uppercase mb-5">
              Projet
            </p>
            <div className="flex flex-col gap-3">
              {projectLinks.map((link) =>
                link.isRoute ? (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/45 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    key={link.href}
                    href={link.href}
                    className="text-sm text-white/45 hover:text-white transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          </div>

          {/* Legal links */}
          <div>
            <p className="text-white/25 text-xs font-semibold tracking-[0.15em] uppercase mb-5">
              Légal
            </p>
            <div className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-white/45 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <Divider className="bg-white/[0.06] mb-6" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-white/20 text-xs">© 2026 TiWave — Tous droits réservés</p>
          <p className="text-white/20 text-xs">
            Accompagnée par la{' '}
            <span className="text-white/35">Technopole CACEM</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
