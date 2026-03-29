import { createClient } from '@/lib/supabase-server'
import type { Database } from '@/lib/database.types'
import Link from 'next/link'
import { DeletePostButton } from './DeletePostButton'

type PostRow = Database['public']['Tables']['blog_posts']['Row']

export default async function AdminPostsPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, published, published_at, created_at')
    .order('created_at', { ascending: false }) as { data: Pick<PostRow, 'id' | 'title' | 'slug' | 'published' | 'published_at' | 'created_at'>[] | null }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-[#013a63]">Articles</h1>
        <Link
          href="/admin/posts/new"
          className="bg-[#0093d0] text-white text-sm font-medium px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          + Nouvel article
        </Link>
      </div>

      {posts?.length === 0 && (
        <p className="text-gray-400">Aucun article pour l&apos;instant.</p>
      )}

      <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 overflow-hidden">
        {posts?.map((post) => (
          <div key={post.id} className="flex items-center gap-4 px-6 py-4">
            <div className="flex-1 min-w-0">
              <p className="font-medium text-[#013a63] truncate">{post.title}</p>
              <p className="text-xs text-gray-400 mt-0.5">/blog/{post.slug}</p>
            </div>
            <span
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                post.published
                  ? 'bg-green-100 text-green-700'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {post.published ? 'Publié' : 'Brouillon'}
            </span>
            <div className="flex gap-2 items-center">
              <Link
                href={`/admin/posts/${post.id}/edit`}
                className="text-sm text-[#0093d0] hover:underline"
              >
                Éditer
              </Link>
              <DeletePostButton postId={post.id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
