import { PostEditor } from '@/components/admin/PostEditor'

export default function NewPostPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-[#013a63] mb-8">Nouvel article</h1>
      <PostEditor />
    </div>
  )
}
