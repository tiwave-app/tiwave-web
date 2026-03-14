'use client'

import { useState } from 'react'
import { Input, Button } from '@heroui/react'

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
      setMessage('Tu es inscrit(e) ! On te préviendra à la sortie de l\'app.')
      setEmail('')
    } else {
      setStatus('error')
      setMessage(data.error ?? 'Une erreur est survenue.')
    }
  }

  return (
    <section id="newsletter" className="py-24 bg-gradient-to-br from-[#013a63] to-[#0093d0]">
      <div className="max-w-2xl mx-auto px-6 text-center text-white">
        <h2 className="text-4xl font-bold mb-4">La mer te prévient. Abonne-toi.</h2>
        <p className="text-lg text-white/80 mb-10">
          Reçois les actus Tiwave, les articles sur la santé des plages martiniquaises, et en
          avant-première la date de sortie de l&apos;app.
        </p>

        {status === 'success' ? (
          <div className="bg-[#2ed6b0]/20 border border-[#2ed6b0]/40 rounded-2xl p-6">
            <p className="text-[#2ed6b0] font-semibold text-lg">{message}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <Input
              type="email"
              placeholder="Votre email"
              value={email}
              onValueChange={setEmail}
              isRequired
              classNames={{
                base: 'flex-1',
                input: 'text-[#013a63]',
                inputWrapper: 'bg-white',
              }}
            />
            <Button
              type="submit"
              isLoading={status === 'loading'}
              className="bg-[#2ed6b0] text-[#013a63] font-semibold px-8 shrink-0"
              size="lg"
            >
              Je m&apos;abonne
            </Button>
          </form>
        )}

        {status === 'error' && (
          <p className="text-red-300 mt-3 text-sm">{message}</p>
        )}

        <p className="text-white/50 text-sm mt-4">
          Pas de spam. Une newsletter, pas plus. Résiliable en un clic.
        </p>
      </div>
    </section>
  )
}
