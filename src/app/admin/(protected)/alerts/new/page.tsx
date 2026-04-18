import { createClient } from '@/lib/supabase-server'
import { createBeachAlert } from '../actions'

const ALERT_TYPES = [
  { value: 'closure',   label: 'Fermeture' },
  { value: 'pollution', label: 'Pollution' },
  { value: 'wildlife',  label: 'Faune dangereuse' },
  { value: 'other',     label: 'Autre' },
]

export default async function NewAlertPage() {
  const supabase = await createClient()
  const { data: beaches } = await supabase
    .from('beaches')
    .select('id, name, commune')
    .order('name')

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold text-[#013a63] mb-8">Nouvelle alerte plage</h1>

      <form action={createBeachAlert} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Plage *</label>
          <select
            name="beach_id"
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0093d0]"
          >
            <option value="">Sélectionner une plage…</option>
            {beaches?.map((b: any) => (
              <option key={b.id} value={b.id}>
                {b.name}{b.commune ? ` (${b.commune})` : ''}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Type *</label>
          <select
            name="type"
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0093d0]"
          >
            {ALERT_TYPES.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Titre *</label>
          <input
            name="title"
            type="text"
            required
            placeholder="ex. Fermeture temporaire"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0093d0]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
          <textarea
            name="body"
            required
            rows={3}
            placeholder="ex. Présence de méduses signalée — baignade déconseillée"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0093d0]"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Expiration (optionnel)
          </label>
          <input
            name="expires_at"
            type="datetime-local"
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0093d0]"
          />
        </div>

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            className="bg-[#ff6d5a] text-white text-sm font-medium px-5 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Envoyer l&apos;alerte
          </button>
          <a
            href="/admin/alerts"
            className="text-sm text-gray-500 hover:text-gray-700 px-4 py-2"
          >
            Annuler
          </a>
        </div>
      </form>
    </div>
  )
}
