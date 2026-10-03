'use client'

import { useState } from 'react'
import { Input, Button } from '@heroui/react'
import { Check } from 'lucide-react'

export function UnsubscribeForm({ token }: { token?: string }) {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')

    try {
      const res = await fetch('/api/unsubscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(token ? { token } : { email }),
      })

      if (res.ok) {
        setStatus('success')
        return
      }
      const data = await res.json().catch(() => ({}))
      setStatus('error')
      setMessage(data.error ?? 'Une erreur est survenue.')
    } catch {
      setStatus('error')
      setMessage('Une erreur est survenue. Réessayez dans un instant.')
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-[#2ed6b0]/10 border border-[#2ed6b0]/25 rounded-2xl p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-[#2ed6b0]/15 flex items-center justify-center mx-auto mb-4">
          <Check size={20} className="text-[#2ed6b0]" />
        </div>
        <p className="text-white font-semibold text-lg mb-2">C&apos;est fait.</p>
        <p className="text-white/50 text-sm leading-relaxed">
          {token
            ? 'Vous ne recevrez plus les nouvelles de TiWave par mail.'
            : 'Si cette adresse était inscrite, elle est supprimée de notre liste et ne recevra plus nos mails.'}
        </p>
      </div>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        {!token && <Input
          type="email"
          aria-label="Votre adresse email"
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
        />}
        <Button
          type="submit"
          isLoading={status === 'loading'}
          className="bg-white/10 text-white font-semibold px-7 rounded-xl h-12 shrink-0 border border-white/15"
        >
          {token ? 'Confirmer la désinscription' : 'Me désinscrire'}
        </Button>
      </form>

      {status === 'error' && <p className="text-red-400 mt-3 text-sm">{message}</p>}
    </>
  )
}
