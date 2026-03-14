'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input, Button, Switch, Textarea } from '@heroui/react'
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

export function PostEditor({ initialData }: Props) {
  const router = useRouter()
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
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(false)

  function update<K extends keyof Post>(key: K, value: Post[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value }
      if (key === 'title' && !initialData) {
        next.slug = toSlug(value as string)
      }
      return next
    })
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
    <div className="max-w-4xl">
      <div className="grid grid-cols-1 gap-4 mb-6">
        <Input
          label="Titre"
          value={form.title}
          onValueChange={(v) => update('title', v)}
          isRequired
        />
        <Input
          label="Slug (URL)"
          value={form.slug}
          onValueChange={(v) => update('slug', v)}
          isRequired
          description={`/blog/${form.slug}`}
        />
        <Input
          label="Résumé (extrait)"
          value={form.excerpt}
          onValueChange={(v) => update('excerpt', v)}
        />
        <Input
          label="URL image de couverture"
          value={form.cover_image_url}
          onValueChange={(v) => update('cover_image_url', v)}
        />
      </div>

      <div className="mb-4 flex gap-4 items-center">
        <button
          type="button"
          onClick={() => setPreview(false)}
          className={`text-sm px-4 py-2 rounded-lg transition-colors ${
            !preview ? 'bg-[#013a63] text-white' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          Éditer
        </button>
        <button
          type="button"
          onClick={() => setPreview(true)}
          className={`text-sm px-4 py-2 rounded-lg transition-colors ${
            preview ? 'bg-[#013a63] text-white' : 'text-gray-500 hover:bg-gray-100'
          }`}
        >
          Aperçu
        </button>
      </div>

      {preview ? (
        <div className="border border-gray-200 rounded-xl p-6 min-h-64 prose prose-slate max-w-none bg-white">
          {form.content ? (
            <div dangerouslySetInnerHTML={{ __html: form.content.replace(/\n/g, '<br/>') }} />
          ) : (
            <p className="text-gray-400">Aucun contenu…</p>
          )}
        </div>
      ) : (
        <Textarea
          label="Contenu (Markdown)"
          value={form.content}
          onValueChange={(v) => update('content', v)}
          minRows={16}
          classNames={{ input: 'font-mono text-sm' }}
          isRequired
        />
      )}

      <div className="flex items-center justify-between mt-6">
        <Switch
          isSelected={form.published}
          onValueChange={(v) => update('published', v)}
        >
          Publier
        </Switch>

        <div className="flex gap-3 items-center">
          {error && <p className="text-sm text-danger">{error}</p>}
          <Button
            variant="light"
            onPress={() => router.push('/admin/posts')}
          >
            Annuler
          </Button>
          <Button
            color="primary"
            isLoading={saving}
            onPress={handleSave}
          >
            {form.id ? 'Enregistrer' : 'Créer l\'article'}
          </Button>
        </div>
      </div>
    </div>
  )
}
