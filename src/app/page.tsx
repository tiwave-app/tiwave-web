import Link from 'next/link'
import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { DataSources } from '@/components/landing/DataSources'
import { About } from '@/components/landing/About'
import { NewsletterForm } from '@/components/landing/NewsletterForm'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <DataSources />
        <About />
        <NewsletterForm />
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
        <a href="#features" className="hover:text-white transition-colors">Features</a>
        <a href="#donnees" className="hover:text-white transition-colors">Données</a>
        <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        <a href="mailto:contact@tiwave.app" className="hover:text-white transition-colors">
          Nous contacter
        </a>
      </div>
      <a
        href="#newsletter"
        className="bg-[#0093d0] text-white text-sm font-medium px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
      >
        Être notifié →
      </a>
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
            <a href="#newsletter" className="hover:text-white transition-colors">Newsletter</a>
            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            <a href="mailto:contact@tiwave.app" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        <div className="border-t border-white/10 mt-8 pt-6 text-center text-white/40 text-sm">
          © 2026 Tiwave — Tous droits réservés
        </div>
      </div>
    </footer>
  )
}
