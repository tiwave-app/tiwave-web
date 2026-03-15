'use client'

import { useState } from 'react'
import { Input, Button } from '@heroui/react'
import { ArrowRight, Lock, Zap } from 'lucide-react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    })

    const data = await res.json()

    if (res.ok) {
      setStatus('success')
      setMessage("Bienvenue. Vous serez parmi les premiers informés du lancement.")
      setEmail('')
    } else {
      setStatus('error')
      setMessage(data.error ?? 'Une erreur est survenue.')
    }
  }

  return (
    <section
      id="newsletter"
      className="relative py-32 overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #013a63 0%, #020c1b 50%, #071e38 100%)' }}
    >
      {/* Glow decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px]"
        style={{
          background: 'radial-gradient(ellipse, rgba(46,214,176,0.1) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto px-6 text-center">
        {/* Eyebrow */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center gap-2 bg-[#2ed6b0]/10 border border-[#2ed6b0]/20 rounded-full px-4 py-1.5 text-xs text-[#2ed6b0] font-medium">
            <Zap size={11} />
            Lancement en Martinique — 2026
          </div>
        </div>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-5 leading-[1.1]">
          Rejoignez les premiers<br />
          <span
            style={{
              background: 'linear-gradient(90deg, #2ed6b0 0%, #0093d0 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            à découvrir <span className="text-[#0093d0]">T</span>iWave.
          </span>
        </h2>

        <p className="text-white/50 text-lg mb-10 leading-relaxed">
          Recevez les actus du projet, les articles sur la santé des plages martiniquaises,
          et en avant-première la date de lancement de l&apos;app.
        </p>

        {/* Form / Success state */}
        {status === 'success' ? (
          <div className="bg-[#2ed6b0]/10 border border-[#2ed6b0]/25 rounded-2xl p-8">
            <div className="w-12 h-12 rounded-full bg-[#2ed6b0]/15 flex items-center justify-center mx-auto mb-4">
              <ArrowRight size={20} className="text-[#2ed6b0]" />
            </div>
            <p className="text-white font-semibold text-lg">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="votre@email.com"
              value={email}
              onValueChange={setEmail}
              isRequired
              variant="bordered"
              classNames={{
                base: 'flex-1',
                inputWrapper:
                  'bg-white/[0.06] border-white/15 hover:border-white/25 focus-within:border-[#2ed6b0]/50 rounded-xl h-12',
                input: 'text-white placeholder:text-white/25',
              }}
            />
            <Button
              type="submit"
              isLoading={status === 'loading'}
              endContent={status !== 'loading' ? <ArrowRight size={16} /> : undefined}
              className="bg-[#2ed6b0] text-[#020c1b] font-semibold px-7 rounded-xl h-12 shrink-0 shadow-[0_0_30px_rgba(46,214,176,0.25)]"
            >
              Je veux être notifié
            </Button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-red-400 mt-3 text-sm">{message}</p>
        )}

        {/* Micro trust copy */}
        <div className="flex items-center justify-center gap-5 mt-6">
          <div className="flex items-center gap-1.5 text-white/25 text-xs">
            <Lock size={11} />
            Aucun spam
          </div>
          <div className="w-px h-3 bg-white/10" />
          <span className="text-white/25 text-xs">Résiliable en un clic</span>
          <div className="w-px h-3 bg-white/10" />
          <span className="text-white/25 text-xs">Martinique, 2026</span>
        </div>
      </div>
    </section>
  )
}
