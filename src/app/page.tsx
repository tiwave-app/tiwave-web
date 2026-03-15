import Link from 'next/link'
import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { About } from '@/components/landing/About'
import { ForWho } from '@/components/landing/ForWho'
import { DataSources } from '@/components/landing/DataSources'
import { NewsletterForm } from '@/components/landing/NewsletterForm'

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Features />
        <About />
        <ForWho />
        <DataSources />
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
        <a href="#comment-ca-marche" className="hover:text-white transition-colors">Comment ça marche</a>
        <a href="#pourquoi" className="hover:text-white transition-colors">Pourquoi Tiwave</a>
        <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        <a href="mailto:contact@tiwave.app" className="hover:text-white transition-colors">Contact</a>
      </div>
      <a
        href="#newsletter"
        className="bg-[#2ed6b0] text-[#013a63] text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
      >
        Rejoindre la liste →
      </a>
    </nav>
  )
}

function Footer() {
  return (
    <footer className="bg-[#013a63] text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="text-xl font-bold mb-2">
              Tiwave<span className="text-[#0093d0]">.</span>
            </div>
            <p className="text-white/60 text-sm">Martinique, Antilles françaises</p>
            <p className="text-white/60 text-sm mt-1">contact@tiwave.app</p>
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Projet</p>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              <a href="#comment-ca-marche" className="hover:text-white transition-colors">Comment ça marche</a>
              <a href="#pourquoi" className="hover:text-white transition-colors">Pourquoi Tiwave</a>
              <a href="#sources" className="hover:text-white transition-colors">Sources de données</a>
              <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
            </div>
          </div>
          <div>
            <p className="text-white/40 text-xs uppercase tracking-widest mb-3">Légal</p>
            <div className="flex flex-col gap-2 text-sm text-white/70">
              <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
              <Link href="/confidentialite" className="hover:text-white transition-colors">Politique de confidentialité</Link>
              <a href="#newsletter" className="hover:text-white transition-colors">Newsletter</a>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-white/40 text-sm">
          © 2026 Tiwave — Tous droits réservés
        </div>
      </div>
    </footer>
  )
}
