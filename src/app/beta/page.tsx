'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'

export default function BetaPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done' | 'error' | 'duplicate'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/beta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })
      const data = await res.json()
      if (res.status === 409) {
        setStatus('duplicate')
        return
      }
      if (!res.ok) throw new Error(data.error ?? 'Erreur inconnue')
      setStatus('done')
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : 'Erreur inconnue')
      setStatus('error')
    }
  }

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

        <div className="relative z-10 max-w-xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#2ed6b0]/10 border border-[#2ed6b0]/25 rounded-full px-4 py-1.5 text-xs text-[#2ed6b0] font-medium mb-6">
              Beta testeurs — places limitées
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5 leading-[1.1]">
              Teste TiWave
              <br />
              <span
                style={{
                  background: 'linear-gradient(90deg, #0093d0 0%, #2ed6b0 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                en avant-première
              </span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed">
              L&apos;app est presque prête. Rejoins les premiers testeurs et aide à
              façonner l&apos;expérience avant le lancement officiel.
            </p>
          </div>

          {/* What's expected */}
          <div className="grid grid-cols-3 gap-3 mb-12">
            {[
              { emoji: '🐛', label: 'Détecter les bugs' },
              { emoji: '💬', label: 'Partager ton ressenti' },
              { emoji: '🏖️', label: 'Améliorer l\'expérience' },
            ].map(({ emoji, label }) => (
              <div
                key={label}
                className="bg-white/[0.04] border border-white/8 rounded-2xl p-4 text-center"
              >
                <div className="text-2xl mb-2">{emoji}</div>
                <p className="text-white/60 text-xs leading-snug">{label}</p>
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-8">
            {status === 'done' ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-4">🎉</div>
                <h2 className="text-white font-bold text-xl mb-2">C&apos;est noté !</h2>
                <p className="text-white/50 text-sm leading-relaxed">
                  Tu es sur la liste. Je te contacte dès que les accès beta sont ouverts.
                </p>
                <p className="text-white/30 text-xs mt-4">— Maria, fondatrice de TiWave</p>
              </div>
            ) : status === 'duplicate' ? (
              <div className="text-center py-4">
                <div className="text-4xl mb-4">👋</div>
                <h2 className="text-white font-bold text-xl mb-2">Tu es déjà inscrit·e !</h2>
                <p className="text-white/50 text-sm leading-relaxed">
                  Cet email est déjà sur la liste beta. Je te contacte très bientôt.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-white font-bold text-xl mb-1">Rejoindre la beta</h2>
                <p className="text-white/40 text-sm mb-8">Gratuit · sans engagement · places limitées</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-white/60 text-xs font-medium mb-2">
                      Prénom <span className="text-white/25">(facultatif)</span>
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="Maria"
                      className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#0093d0]/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-white/60 text-xs font-medium mb-2">
                      Email <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="toi@exemple.com"
                      required
                      className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#0093d0]/50 transition-colors"
                    />
                  </div>

                  {status === 'error' && (
                    <p className="text-red-400 text-xs">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading' || !email}
                    className="mt-2 bg-[#0093d0] text-white font-semibold py-3 rounded-xl hover:bg-[#007ab5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    {status === 'loading' ? 'Inscription…' : 'Je veux tester l\'app →'}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Signature */}
          <div className="flex items-center gap-3 mt-10 px-2">
            <Image
              src="/logo-round-email.png"
              alt="Maria"
              width={36}
              height={36}
              className="rounded-full"
            />
            <div>
              <p className="text-white text-sm font-medium">Maria</p>
              <p className="text-white/40 text-xs">Fondatrice de TiWave · Martinique 🌊</p>
            </div>
          </div>
        </div>
      </main>
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
        <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
      </div>
      <Link
        href="/#newsletter"
        className="bg-[#0093d0] text-white text-sm font-medium px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
      >
        Newsletter →
      </Link>
    </nav>
  )
}
