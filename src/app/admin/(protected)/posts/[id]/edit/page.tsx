import { createClient } from '@/lib/supabase-server'
import type { Database } from '@/lib/database.types'
import { notFound } from 'next/navigation'
import { PostEditor } from '@/components/admin/PostEditor'

type PostRow = Database['public']['Tables']['blog_posts']['Row']
type Props = { params: Promise<{ id: string }> }

export default async function EditPostPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single() as { data: PostRow | null; error: unknown }

  if (!post) notFound()

  return (
    <div>
      <h1 className="text-2xl font-bold text-[#013a63] mb-8">Éditer l&apos;article</h1>
      <PostEditor
        initialData={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt ?? '',
          content: post.content,
          published: post.published ?? false,
          cover_image_url: post.cover_image_url ?? '',
        }}
      />
    </div>
  )
}
