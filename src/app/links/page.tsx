import type { Metadata } from 'next'
import { Apple, Bell, Download, Instagram, Linkedin, Mail, Globe, Calendar } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'TiWave · Tous nos liens',
  description: 'L\'app arrive bientôt — soyez notifié du lancement',
}

const LINKS = {
  website: 'https://tiwave.app',
  instagram: 'https://instagram.com/tiwave',
  linkedin: 'https://www.linkedin.com/company/tiwave',
  email: 'mailto:maria@tiwave.app',
  notify: 'https://tiwave.app/#newsletter',
}

export default function Links() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#013a63] via-[#013a63] to-[#0093d0] flex flex-col items-center px-5 py-10">
      <div className="w-full max-w-md">
        <header className="flex flex-col items-center text-center mb-8">
          <div className="text-3xl font-bold text-white mb-2">
            Tiwave<span className="text-[#2ed6b0]">.</span>
          </div>
          <p className="text-white/70 text-xs uppercase tracking-wider">
            Santé des plages · Temps réel · Martinique
          </p>
        </header>

        <section className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-5 mb-6 text-center">
          <div className="text-[#2ed6b0] text-xs font-semibold uppercase tracking-wider mb-2">
            Soumission en cours
          </div>
          <h2 className="text-white text-base font-semibold mb-3 leading-tight">
            L'app arrive bientôt sur les stores
          </h2>
          <div className="flex gap-2 justify-center mb-4">
            <ComingSoonBadge icon={<Apple className="w-4 h-4" />} label="App Store" />
            <ComingSoonBadge icon={<Download className="w-4 h-4" />} label="Google Play" />
          </div>
          <a
            href={LINKS.notify}
            className="inline-flex items-center gap-2 bg-[#2ed6b0] text-[#013a63] px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Bell className="w-4 h-4" />
            Être notifié du lancement
          </a>
        </section>

        <section className="space-y-3 mb-6">
          <LinkButton
            href={LINKS.website}
            icon={<Globe className="w-5 h-5" />}
            label="tiwave.app"
            primary
          />
          <LinkButton
            href={LINKS.instagram}
            icon={<Instagram className="w-5 h-5" />}
            label="Instagram @tiwave"
          />
          <LinkButton
            href={LINKS.linkedin}
            icon={<Linkedin className="w-5 h-5" />}
            label="LinkedIn"
          />
          <LinkButton
            href={LINKS.email}
            icon={<Mail className="w-5 h-5" />}
            label="maria@tiwave.app"
          />
        </section>

        <section className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-5 text-center">
          <div className="text-[#ff6d5a] text-xs font-semibold uppercase tracking-wider mb-1">
            Pro du tourisme ?
          </div>
          <h2 className="text-white text-lg font-semibold mb-3 leading-tight">
            Rejoignez les 30 premiers partenaires
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-[#ff6d5a] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            <Calendar className="w-4 h-4" />
            Réserver 15 min avec Maria
          </Link>
        </section>

        <footer className="text-center mt-10 text-white/40 text-xs">
          Martinique · Antilles françaises
        </footer>
      </div>
    </main>
  )
}

function LinkButton({
  href,
  icon,
  label,
  primary = false,
}: {
  href: string
  icon: React.ReactNode
  label: string
  primary?: boolean
}) {
  const base =
    'flex items-center gap-3 w-full px-5 py-3.5 rounded-full font-medium transition-colors shadow-md'
  const styles = primary
    ? 'bg-white text-[#013a63] hover:bg-white/90'
    : 'bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/15'

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${styles}`}>
      <span className={primary ? 'text-[#0093d0]' : 'text-[#2ed6b0]'}>{icon}</span>
      <span className="flex-1 text-sm">{label}</span>
    </a>
  )
}

function ComingSoonBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-1.5 bg-black/30 border border-white/20 rounded-full px-3 py-1.5 text-white/80 text-xs font-medium">
      <span className="text-white/60">{icon}</span>
      <span>{label}</span>
    </div>
  )
}
