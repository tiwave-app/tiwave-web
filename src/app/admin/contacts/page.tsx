import { createClient } from '@/lib/supabase-server'
import { MarkTreatedButton } from './MarkTreatedButton'

type ContactRow = {
  id: string
  created_at: string
  name: string
  email: string
  organisation: string
  type: string
  subject: string
  message: string
  status: string
}

export default async function ContactsPage() {
  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: contacts } = await (supabase as any)
    .from('contact_requests')
    .select('*')
    .order('created_at', { ascending: false }) as { data: ContactRow[] | null }

  const nouveaux = contacts?.filter((c) => c.status === 'nouveau').length ?? 0

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#013a63]">Demandes de contact</h1>
        <div className="flex items-center gap-2">
          {nouveaux > 0 && (
            <span className="bg-[#ff6d5a] text-white text-sm px-3 py-1 rounded-full">
              {nouveaux} nouveau{nouveaux > 1 ? 'x' : ''}
            </span>
          )}
          <span className="bg-[#013a63] text-white text-sm px-3 py-1 rounded-full">
            {contacts?.length ?? 0} total
          </span>
        </div>
      </div>

      {!contacts?.length && (
        <p className="text-gray-400">Aucune demande pour l&apos;instant.</p>
      )}

      <div className="space-y-3">
        {contacts?.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              {/* Left */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1 flex-wrap">
                  <span className="font-semibold text-[#013a63]">{c.name}</span>
                  <span className="text-sm text-gray-500">{c.organisation}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: c.type === 'collectivite' ? '#e0f2fe' : '#f0fdf4',
                      color: c.type === 'collectivite' ? '#0369a1' : '#166534',
                    }}
                  >
                    {c.type === 'collectivite' ? 'Collectivité' : 'Professionnel'}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-2">
                  {c.email} · <span className="font-medium text-gray-700">{c.subject}</span>
                </p>
                <p className="text-sm text-gray-600 whitespace-pre-wrap line-clamp-3">{c.message}</p>
              </div>

              {/* Right */}
              <div className="flex flex-col items-end gap-2 shrink-0">
                <time className="text-xs text-gray-400">
                  {new Date(c.created_at).toLocaleDateString('fr-FR', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </time>
                <span
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    background: c.status === 'nouveau' ? '#fff7ed' : '#f0fdf4',
                    color: c.status === 'nouveau' ? '#c2410c' : '#166534',
                  }}
                >
                  {c.status === 'nouveau' ? '● Nouveau' : '✓ Traité'}
                </span>
                {c.status === 'nouveau' && <MarkTreatedButton id={c.id} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
