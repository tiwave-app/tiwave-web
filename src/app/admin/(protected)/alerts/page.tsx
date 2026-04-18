import { createClient } from '@/lib/supabase-server'
import Link from 'next/link'
import { deactivateAlert } from './actions'

export default async function AdminAlertsPage() {
  const supabase = await createClient()
  const { data: alerts } = await supabase
    .from('beach_alerts')
    .select('id, title, body, type, active, created_at, beaches(name)')
    .order('created_at', { ascending: false })

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#013a63]">Alertes plage</h1>
        <Link
          href="/admin/alerts/new"
          className="bg-[#ff6d5a] text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          + Nouvelle alerte
        </Link>
      </div>

      {(!alerts || alerts.length === 0) && (
        <p className="text-gray-400">Aucune alerte pour l&apos;instant.</p>
      )}

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
        {alerts?.map((alert: any) => (
          <div key={alert.id} className="flex items-center gap-4 px-6 py-4">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#013a63] truncate">
                {(alert.beaches as any)?.name} — {alert.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5 truncate">{alert.body}</p>
            </div>
            <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${
              alert.active ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-500'
            }`}>
              {alert.active ? 'Active' : 'Inactive'}
            </span>
            {alert.active && (
              <form action={deactivateAlert.bind(null, alert.id)}>
                <button
                  type="submit"
                  className="text-xs text-gray-400 hover:text-red-500 transition-colors"
                >
                  Désactiver
                </button>
              </form>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
