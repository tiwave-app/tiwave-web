import { PostEditor } from '@/components/admin/PostEditor'

export default function NewPostPage() {
  return (
    <div className="flex flex-col h-full">
      <h1 className="text-2xl font-bold text-[#013a63] mb-6">Nouvel article</h1>
      <PostEditor />
    </div>
  )
}
