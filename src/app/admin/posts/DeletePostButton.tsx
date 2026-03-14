'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-client'

export function DeletePostButton({ postId }: { postId: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm('Supprimer cet article ?')) return
    const supabase = createClient()
    await supabase.from('blog_posts').delete().eq('id', postId)
    router.refresh()
  }

  return (
    <button
      onClick={handleDelete}
      className="text-sm text-red-400 hover:text-red-600 transition-colors"
    >
      Supprimer
    </button>
  )
}
