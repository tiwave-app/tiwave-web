import { createClient } from '@/lib/supabase-server'
import { SendWelcomeButton } from './SendWelcomeButton'

const TEST_EMAILS = ['test@tiwave.app', 'test-debug@tiwave.app']

const STEP_LABELS: Record<number, { label: string; color: string }> = {
  0: { label: 'Pas encore reçu', color: 'bg-gray-100 text-gray-500' },
  1: { label: 'Email 1 ✓', color: 'bg-blue-50 text-blue-600' },
  2: { label: 'Email 2 ✓', color: 'bg-[#e8f8f4] text-[#1a9e7c]' },
  3: { label: 'Séquence complète ✓', color: 'bg-green-50 text-green-700' },
}

export default async function SubscribersPage() {
  const supabase = await createClient()
  const { data: subscribers } = await supabase
    .from('newsletter_subscribers')
    .select('id, email, created_at, onboarding_step')
    .order('created_at', { ascending: false })

  const realSubs = subscribers?.filter(s => !TEST_EMAILS.includes(s.email)) ?? []
  const testSubs = subscribers?.filter(s => TEST_EMAILS.includes(s.email)) ?? []
  const pendingCount = realSubs.filter(s => s.onboarding_step === 0).length

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#013a63]">Abonnés newsletter</h1>
          <p className="text-sm text-gray-400 mt-1">{realSubs.length} abonnés réels · {testSubs.length} emails de test</p>
        </div>
        <div className="flex items-center gap-3">
          <span className="bg-[#013a63] text-white text-sm px-3 py-1 rounded-full">
            {realSubs.length} inscrits
          </span>
          {pendingCount > 0 && (
            <SendWelcomeButton count={pendingCount} />
          )}
        </div>
      </div>

      {/* Abonnés réels */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-6">
        <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 grid grid-cols-3 text-xs font-semibold text-gray-400 uppercase tracking-wide">
          <span>Email</span>
          <span>Inscription</span>
          <span>Onboarding</span>
        </div>
        {realSubs.length === 0 && (
          <p className="text-gray-400 px-6 py-8 text-sm">Aucun abonné pour l'instant.</p>
        )}
        {realSubs.map((sub) => {
          const step = sub.onboarding_step ?? 0
          const badge = STEP_LABELS[step] ?? STEP_LABELS[0]
          return (
            <div key={sub.id} className="grid grid-cols-3 items-center px-6 py-4 border-b border-gray-50 last:border-0">
              <p className="font-medium text-[#013a63] text-sm truncate">{sub.email}</p>
              <time className="text-xs text-gray-400">
                {new Date(sub.created_at).toLocaleDateString('fr-FR', {
                  day: 'numeric', month: 'short', year: 'numeric',
                })}
              </time>
              <span className={`inline-flex w-fit text-xs font-medium px-2.5 py-1 rounded-full ${badge.color}`}>
                {badge.label}
              </span>
            </div>
          )
        })}
      </div>

      {/* Emails de test */}
      {testSubs.length > 0 && (
        <div className="bg-white rounded-xl border border-dashed border-gray-200 overflow-hidden opacity-50">
          <div className="px-6 py-3 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-400 uppercase tracking-wide">
            🧪 Emails de test (exclus des envois)
          </div>
          {testSubs.map((sub) => (
            <div key={sub.id} className="flex items-center justify-between px-6 py-3 border-b border-gray-50 last:border-0">
              <p className="text-sm text-gray-400 font-mono">{sub.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
