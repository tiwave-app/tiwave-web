import Nav from '@/components/landing/Nav'
import { Hero } from '@/components/landing/Hero'
import { Features } from '@/components/landing/Features'
import { About } from '@/components/landing/About'
import { ForWho } from '@/components/landing/ForWho'
import { DataSources } from '@/components/landing/DataSources'
import { PressSection } from '@/components/landing/PressSection'
import { NewsletterForm } from '@/components/landing/NewsletterForm'
import Footer from '@/components/landing/Footer'

export default function Home() {
  return (
    <div className="bg-[#020c1b]">
      <Nav />
      <main>
        <Hero />
        <Features />
        <About />
        <ForWho />
        <DataSources />
        <PressSection />
        <NewsletterForm />
      </main>
      <Footer />
    </div>
  )
}
