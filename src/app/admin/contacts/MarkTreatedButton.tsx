'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'

export function MarkTreatedButton({ id }: { id: string }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handle() {
    setLoading(true)
    await fetch(`/api/contact/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: 'traite' }),
    })
    router.refresh()
    setLoading(false)
  }

  return (
    <button
      onClick={handle}
      disabled={loading}
      className="text-xs text-[#0093d0] hover:underline disabled:opacity-50"
    >
      {loading ? '…' : 'Marquer traité'}
    </button>
  )
}
