import { createClient } from '@/lib/supabase-server'
import type { Database } from '@/lib/database.types'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

export const revalidate = 60

type PostRow = Database['public']['Tables']['blog_posts']['Row']
type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('blog_posts')
    .select('title, excerpt')
    .eq('slug', slug)
    .eq('published', true)
    .single() as { data: Pick<PostRow, 'title' | 'excerpt'> | null; error: unknown }

  if (!data) return {}
  return { title: `${data.title} — Tiwave`, description: data.excerpt ?? undefined }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single() as { data: PostRow | null; error: unknown }

  if (!post) notFound()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-6 py-24">
        <Link href="/blog" className="text-[#0093d0] text-sm hover:underline mb-8 inline-block">
          ← Blog
        </Link>

        {post.cover_image_url && (
          <img
            src={post.cover_image_url}
            alt={post.title}
            className="w-full h-64 object-cover rounded-2xl mb-8"
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

        <h1 className="text-4xl font-bold text-[#013a63] mt-2 mb-8">{post.title}</h1>

        <article className="prose prose-slate max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>

        <div className="mt-16 pt-8 border-t border-gray-100">
          <div className="bg-gradient-to-br from-[#013a63] to-[#0093d0] rounded-2xl p-8 text-white text-center">
            <p className="font-semibold text-lg mb-2">Tu veux savoir quand l&apos;app sort ?</p>
            <Link
              href="/#newsletter"
              className="inline-block mt-2 bg-[#2ed6b0] text-[#013a63] font-semibold px-6 py-3 rounded-full hover:opacity-90 transition-opacity"
            >
              Rejoindre la newsletter →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
