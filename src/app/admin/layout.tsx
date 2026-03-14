import Link from 'next/link'
import { LogoutButton } from './LogoutButton'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-[#013a63] text-white flex flex-col">
        <div className="px-6 py-5 border-b border-white/10">
          <div className="text-lg font-bold">
            Tiwave<span className="text-[#0093d0]">.</span>
          </div>
          <p className="text-xs text-white/50 mt-0.5">Admin</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <SidebarLink href="/admin/posts">Articles</SidebarLink>
          <SidebarLink href="/admin/subscribers">Abonnés</SidebarLink>
        </nav>

        <div className="px-4 py-4 border-t border-white/10">
          <LogoutButton />
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto p-8">{children}</main>
    </div>
  )
}

function SidebarLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-white/70 hover:text-white hover:bg-white/10 transition-colors"
    >
      {children}
    </Link>
  )
}
