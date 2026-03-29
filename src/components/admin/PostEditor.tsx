'use client'

import { useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import ReactMarkdown from 'react-markdown'
import { createClient } from '@/lib/supabase-client'

type Post = {
  id?: string
  title: string
  slug: string
  excerpt: string
  content: string
  published: boolean
  cover_image_url: string
}

type Props = { initialData?: Post }

function toSlug(title: string) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-[#0093d0] focus:ring-2 focus:ring-[#0093d0]/20 transition'

const labelClass = 'block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5'

export function PostEditor({ initialData }: Props) {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [form, setForm] = useState<Post>(
    initialData ?? {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      published: false,
      cover_image_url: '',
    }
  )
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  function update<K extends keyof Post>(key: K, value: Post[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'title' && !initialData) {
        next.slug = toSlug(value as string)
      }
      return next
    })
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createClient() as any
    const ext = file.name.split('.').pop()
    const path = `covers/${Date.now()}.${ext}`
    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(path, file, { upsert: true })
    if (uploadError) {
      setError(uploadError.message)
    } else {
      const { data } = supabase.storage.from('blog-images').getPublicUrl(path)
      update('cover_image_url', data.publicUrl)
    }
    setUploading(false)
  }

  async function handleSave() {
    setSaving(true)
    setError('')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const supabase = createClient() as any

    const payload = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt || null,
      content: form.content,
      published: form.published,
      cover_image_url: form.cover_image_url || null,
      published_at: form.published ? new Date().toISOString() : null,
      updated_at: new Date().toISOString(),
    }

    let err
    if (form.id) {
      const { error } = await supabase.from('blog_posts').update(payload).eq('id', form.id)
      err = error
    } else {
      const { error } = await supabase.from('blog_posts').insert(payload)
      err = error
    }

    setSaving(false)
    if (err) {
      setError(err.message)
    } else {
      router.push('/admin/posts')
      router.refresh()
    }
  }

  return (
    <div className="flex gap-6 h-[calc(100vh-10rem)]">

      {/* ── Colonne gauche : formulaire ── */}
      <div className="flex flex-col gap-4 w-1/2 overflow-y-auto pr-2">

        {/* Titre */}
        <div>
          <label className={labelClass}>Titre</label>
          <input
            className={inputClass}
            placeholder="Ex : Les plus belles plages de Martinique"
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
          />
        </div>

        {/* Slug */}
        <div>
          <label className={labelClass}>Slug (URL)</label>
          <input
            className={inputClass}
            placeholder="les-plus-belles-plages-de-martinique"
            value={form.slug}
            onChange={(e) => update('slug', e.target.value)}
          />
          {form.slug && (
            <p className="mt-1 text-xs text-gray-400">/blog/{form.slug}</p>
          )}
        </div>

        {/* Résumé */}
        <div>
          <label className={labelClass}>Résumé (extrait)</label>
          <input
            className={inputClass}
            placeholder="Courte description affichée sur la liste du blog…"
            value={form.excerpt}
            onChange={(e) => update('excerpt', e.target.value)}
          />
        </div>

        {/* Image de couverture */}
        <div>
          <label className={labelClass}>Image de couverture</label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
          <div className="flex items-center gap-3">
            {form.cover_image_url && (
              <div className="relative w-20 h-14 rounded-lg overflow-hidden border border-gray-200 shrink-0 bg-gray-100">
                <Image src={form.cover_image_url} alt="Couverture" fill className="object-cover" />
              </div>
            )}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-600 hover:border-[#0093d0] hover:text-[#0093d0] transition disabled:opacity-60"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
              </svg>
              {uploading ? 'Upload en cours…' : form.cover_image_url ? 'Changer l\'image' : 'Choisir une image'}
            </button>
          </div>
        </div>

        {/* Contenu */}
        <div className="flex-1 flex flex-col min-h-0">
          <label className={labelClass}>Contenu (Markdown)</label>
          <textarea
            className={`${inputClass} flex-1 font-mono resize-none min-h-48`}
            placeholder="Rédigez votre article en Markdown…"
            value={form.content}
            onChange={(e) => update('content', e.target.value)}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 pb-2">
          <label className="flex items-center gap-3 cursor-pointer select-none">
            <div
              onClick={() => update('published', !form.published)}
              className={`relative w-10 h-6 rounded-full transition-colors ${
                form.published ? 'bg-[#0093d0]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                  form.published ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </div>
            <span className="text-sm font-medium text-gray-700">Publier</span>
          </label>

          <div className="flex items-center gap-3">
            {error && <p className="text-xs text-red-500">{error}</p>}
            <button
              type="button"
              onClick={() => router.push('/admin/posts')}
              className="px-4 py-2 text-sm text-gray-500 hover:text-gray-700 transition"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="px-5 py-2.5 rounded-xl bg-[#0093d0] text-white text-sm font-semibold hover:bg-[#007ab8] active:scale-[0.98] transition disabled:opacity-60"
            >
              {saving ? 'Enregistrement…' : form.id ? 'Enregistrer' : "Créer l'article"}
            </button>
          </div>
        </div>
      </div>

      {/* ── Colonne droite : aperçu ── */}
      <div className="w-1/2 overflow-y-auto border border-gray-200 rounded-2xl bg-white">
        {/* Image de couverture aperçu */}
        {form.cover_image_url && (
          <div className="relative aspect-video w-full bg-gray-100 rounded-t-2xl overflow-hidden">
            <Image
              src={form.cover_image_url}
              alt="Couverture"
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="p-8">
          {form.title ? (
            <h1 className="text-2xl font-bold text-[#013a63] mb-3">{form.title}</h1>
          ) : (
            <p className="text-lg text-gray-300 mb-3 italic">Titre de l&apos;article…</p>
          )}

          {form.excerpt && (
            <p className="text-sm text-gray-500 mb-6 border-l-2 border-[#0093d0] pl-3">{form.excerpt}</p>
          )}

          {form.content ? (
            <div className="prose prose-slate prose-sm max-w-none">
              <ReactMarkdown>{form.content}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm text-gray-300 italic">Le contenu de l&apos;article apparaîtra ici…</p>
          )}
        </div>
      </div>

    </div>
  )
}
