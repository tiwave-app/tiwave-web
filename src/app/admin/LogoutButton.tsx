'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'

export function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  return (
    <button
      onClick={handleLogout}
      className="w-full text-left text-sm text-white/50 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10"
    >
      Se déconnecter
    </button>
  )
}
