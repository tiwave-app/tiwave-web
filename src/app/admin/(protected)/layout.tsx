import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { LogoutButton } from '../LogoutButton'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {}
        },
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/admin/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!profile?.is_admin) redirect('/admin/login')
  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar */}
      <aside className="w-56 bg-[#013a63] text-white flex flex-col">
        <div className="px-6 py-5 border-b border-white/10">
          <div className="text-lg font-bold">
            <span className="text-[#0093d0]">T</span><span style={{ color: '#f4e9d8' }}>iWave</span>
          </div>
          <p className="text-xs text-white/50 mt-0.5">Admin</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <SidebarLink href="/admin/posts">Articles</SidebarLink>
          <SidebarLink href="/admin/subscribers">Abonnés</SidebarLink>
          <SidebarLink href="/admin/contacts">Contacts</SidebarLink>
          <SidebarLink href="/admin/newsletter">Newsletter</SidebarLink>
          <SidebarLink href="/admin/alerts">Alertes plage</SidebarLink>
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
