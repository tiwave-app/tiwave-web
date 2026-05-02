'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Bug, MessageCircle, Sparkles } from 'lucide-react'

export default function BetaPage() {
  const [firstName, setFirstName] = useState('')
  const [os, setOs] = useState<'ios' | 'android' | ''>('')
  const [email, setEmail] = useState('')
  const [acceptsConditions, setAcceptsConditions] = useState(false)
  const [acceptsCitation, setAcceptsCitation] = useState(false)
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
        body: JSON.stringify({
          first_name: firstName,
          os_type: os,
          email,
          accepts_citation: acceptsCitation,
        }),
      })
      const data = await res.json()
      if (res.status === 409) { setStatus('duplicate'); return }
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
        <div
          aria-hidden
          className="pointer-events-none fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
          style={{ background: 'radial-gradient(ellipse, rgba(0,147,208,0.08) 0%, transparent 70%)' }}
        />

        <div className="relative z-10 max-w-xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#2ed6b0]/10 border border-[#2ed6b0]/25 rounded-full px-4 py-1.5 text-xs text-[#2ed6b0] font-medium mb-6 tracking-wide">
              Programme beta — places limitées
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
              { Icon: Bug, label: 'Détecter les bugs' },
              { Icon: MessageCircle, label: 'Partager ton ressenti' },
              { Icon: Sparkles, label: "Améliorer l'expérience" },
            ].map(({ Icon, label }) => (
              <div
                key={label}
                className="bg-white/[0.04] border border-white/8 rounded-2xl p-4 text-center"
              >
                <div className="flex justify-center mb-2">
                  <div className="w-10 h-10 rounded-full bg-[#0093d0]/15 border border-[#0093d0]/25 flex items-center justify-center">
                    <Icon size={18} className="text-[#0093d0]" strokeWidth={2} />
                  </div>
                </div>
                <p className="text-white/60 text-xs leading-snug">{label}</p>
              </div>
            ))}
          </div>

          {/* Form card */}
          <div className="bg-white/[0.04] border border-white/8 rounded-2xl p-8">
            {status === 'done' ? (
              <div className="text-center py-6">
                <h2 className="text-white font-bold text-xl mb-3">Inscription confirmée</h2>
                <p className="text-white/50 text-sm leading-relaxed">
                  Tu es sur la liste. Je te contacte dès que les accès beta sont ouverts.
                </p>
                <p className="text-white/30 text-xs mt-6">— Maria, fondatrice de TiWave</p>
              </div>
            ) : status === 'duplicate' ? (
              <div className="text-center py-6">
                <h2 className="text-white font-bold text-xl mb-3">Déjà inscrit</h2>
                <p className="text-white/50 text-sm leading-relaxed">
                  Cet email est déjà sur la liste beta. Je te contacte très bientôt.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-white font-bold text-xl mb-1">Rejoindre la beta</h2>
                <p className="text-white/40 text-sm mb-8">Gratuit · sans engagement · places limitées</p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                  {/* Prénom */}
                  <div>
                    <label className="block text-white/60 text-xs font-medium mb-2">
                      Prénom <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={e => setFirstName(e.target.value)}
                      placeholder="Maria"
                      required
                      className="w-full bg-white/[0.06] border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 focus:outline-none focus:border-[#0093d0]/50 transition-colors"
                    />
                  </div>

                  {/* iOS / Android */}
                  <div>
                    <label className="block text-white/60 text-xs font-medium mb-3">
                      Ton appareil <span className="text-red-400">*</span>
                    </label>
                    <div className="grid grid-cols-2 gap-3">
                      {(['ios', 'android'] as const).map(option => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => setOs(option)}
                          className={`py-3 rounded-xl border text-sm font-medium transition-all ${
                            os === option
                              ? 'border-[#0093d0] bg-[#0093d0]/15 text-white'
                              : 'border-white/10 bg-white/[0.04] text-white/50 hover:border-white/20'
                          }`}
                        >
                          {option === 'ios' ? 'iPhone (iOS)' : 'Android'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Email */}
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
                    {os === 'android' && (
                      <p className="text-white/35 text-xs mt-2 leading-relaxed">
                        Pour les utilisateurs Android : renseigne l&apos;adresse email
                        associée à ton compte Google Play Store. C&apos;est celle qui sera
                        utilisée pour t&apos;inviter à tester l&apos;app.
                      </p>
                    )}
                  </div>

                  {/* Checkboxes */}
                  <div className="flex flex-col gap-4 pt-1">
                    {/* Conditions — obligatoire */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative mt-0.5 flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={acceptsConditions}
                          onChange={e => setAcceptsConditions(e.target.checked)}
                          required
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded border transition-all ${
                          acceptsConditions
                            ? 'bg-[#0093d0] border-[#0093d0]'
                            : 'bg-white/5 border-white/20 group-hover:border-white/40'
                        } flex items-center justify-center`}>
                          {acceptsConditions && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8">
                              <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-white/50 text-xs leading-relaxed">
                        J&apos;ai lu et j&apos;accepte les{' '}
                        <Link
                          href="/beta/conditions"
                          target="_blank"
                          className="text-[#0093d0] hover:underline"
                        >
                          conditions de participation
                        </Link>{' '}
                        au programme beta TiWave.{' '}
                        <span className="text-red-400">*</span>
                      </span>
                    </label>

                    {/* Citation — optionnelle */}
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <div className="relative mt-0.5 flex-shrink-0">
                        <input
                          type="checkbox"
                          checked={acceptsCitation}
                          onChange={e => setAcceptsCitation(e.target.checked)}
                          className="sr-only"
                        />
                        <div className={`w-4 h-4 rounded border transition-all ${
                          acceptsCitation
                            ? 'bg-[#0093d0] border-[#0093d0]'
                            : 'bg-white/5 border-white/20 group-hover:border-white/40'
                        } flex items-center justify-center`}>
                          {acceptsCitation && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 10 8">
                              <path d="M1 4l3 3 5-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="text-white/50 text-xs leading-relaxed">
                        J&apos;accepte que des extraits de mes retours soient utilisés
                        dans les communications de TiWave (site, réseaux sociaux, presse),
                        avec mon prénom uniquement.
                      </span>
                    </label>
                  </div>

                  {/* Age */}
                  <p className="text-white/25 text-xs">
                    En soumettant ce formulaire, je certifie avoir 16 ans ou plus.
                  </p>

                  {status === 'error' && (
                    <p className="text-red-400 text-xs">{errorMsg}</p>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'loading' || !email || !firstName || !os || !acceptsConditions}
                    className="mt-1 bg-[#0093d0] text-white font-semibold py-3 rounded-xl hover:bg-[#007ab5] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    {status === 'loading' ? 'Inscription en cours…' : 'Rejoindre le programme beta'}
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Message bas de page */}
          <p className="text-center text-white/30 text-sm leading-relaxed mt-10 px-4">
            Les beta testeurs TiWave font partie des premiers contributeurs de la plateforme.
            Leur rôle est essentiel dans la construction d&apos;une information fiable sur
            les plages en Martinique.
          </p>
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
        <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
        <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
      </div>
      <Link
        href="/#newsletter"
        className="bg-[#0093d0] text-white text-sm font-medium px-4 py-2 rounded-full hover:opacity-90 transition-opacity"
      >
        Newsletter
      </Link>
    </nav>
  )
}
