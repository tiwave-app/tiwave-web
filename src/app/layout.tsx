import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import { Providers } from '@/components/Providers'
import './globals.css'


const geist = Geist({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Tiwave — L\'app qui lit la mer avant toi',
  description:
    'Tiwave agrège en temps réel les données de houle, de sargasses et de qualité de l\'eau pour toutes les plages de la Martinique.',
  metadataBase: new URL('https://tiwave.app'),
  openGraph: {
    title: 'Tiwave',
    description: 'L\'app qui lit la mer avant toi.',
    url: 'https://tiwave.app',
    siteName: 'Tiwave',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className={geist.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
