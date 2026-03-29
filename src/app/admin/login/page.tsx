'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { createClient } from '@/lib/supabase-client'

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    setLoading(false)

    if (error) {
      setError(error.message)
    } else {
      router.push('/admin/posts')
      router.refresh()
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-md px-8 py-10">
        <div className="flex flex-col items-center mb-8">
          <Image src="/logo-name.svg" alt="TiWave" width={130} height={38} className="mb-3" />
          <p className="text-sm text-gray-400 font-medium">Administration</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="votre@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="email"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#0093d0] focus:ring-2 focus:ring-[#0093d0]/20 transition"
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#0093d0] focus:ring-2 focus:ring-[#0093d0]/20 transition"
          />
          {error && (
            <p className="text-xs text-red-500 text-center">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-[#0093d0] text-white text-sm font-semibold hover:bg-[#007ab8] active:scale-[0.98] transition disabled:opacity-60"
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>
      </div>
    </div>
  )
}
