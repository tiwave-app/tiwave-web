import { createClient } from '@/lib/supabase-server'
import type { Database } from '@/lib/database.types'
import Link from 'next/link'

export const revalidate = 60

type PostRow = Database['public']['Tables']['blog_posts']['Row']

export default async function BlogPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, excerpt, published_at, cover_image_url')
    .eq('published', true)
    .order('published_at', { ascending: false }) as { data: Pick<PostRow, 'id' | 'title' | 'slug' | 'excerpt' | 'published_at' | 'cover_image_url'>[] | null }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-24">
        <Link href="/" className="text-[#0093d0] text-sm hover:underline mb-8 inline-block">
          ← tiwave.app
        </Link>
        <h1 className="text-4xl font-bold text-[#013a63] mb-4">Blog</h1>
        <p className="text-gray-500 mb-12">
          Données marines, sargasses, qualité de l&apos;eau et coulisses du projet.
        </p>

        {posts?.length === 0 && (
          <p className="text-gray-400">Aucun article publié pour l&apos;instant.</p>
        )}

        <div className="space-y-8">
          {posts?.map((post) => (
            <article key={post.id} className="border-b border-gray-100 pb-8">
              {post.cover_image_url && (
                <img
                  src={post.cover_image_url}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-xl mb-4"
                />
              )}
              <time className="text-sm text-gray-400">
                {post.published_at
                  ? new Date(post.published_at).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'long',
                      year: 'numeric',
                    })
                  : ''}
              </time>
              <h2 className="text-2xl font-bold text-[#013a63] mt-1 mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-[#0093d0] transition-colors">
                  {post.title}
                </Link>
              </h2>
              {post.excerpt && <p className="text-gray-500">{post.excerpt}</p>}
              <Link
                href={`/blog/${post.slug}`}
                className="inline-block mt-4 text-[#0093d0] text-sm font-medium hover:underline"
              >
                Lire l&apos;article →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}
