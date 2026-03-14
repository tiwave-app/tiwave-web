import { createClient } from '@/lib/supabase-server'
import type { Database } from '@/lib/database.types'

type SubRow = Database['public']['Tables']['newsletter_subscribers']['Row']

export default async function SubscribersPage() {
  const supabase = await createClient()
  const { data: subscribers } = await supabase
    .from('newsletter_subscribers')
    .select('id, email, created_at')
    .order('created_at', { ascending: false }) as { data: SubRow[] | null }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#013a63]">Abonnés newsletter</h1>
        <span className="bg-[#013a63] text-white text-sm px-3 py-1 rounded-full">
          {subscribers?.length ?? 0} inscrits
        </span>
      </div>

      {subscribers?.length === 0 && (
        <p className="text-gray-400">Aucun abonné pour l&apos;instant.</p>
      )}

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
        {subscribers?.map((sub) => (
          <div key={sub.id} className="flex items-center justify-between px-6 py-4">
            <p className="font-medium text-[#013a63]">{sub.email}</p>
            <time className="text-xs text-gray-400">
              {new Date(sub.created_at).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              })}
            </time>
          </div>
        ))}
      </div>
    </div>
  )
}
