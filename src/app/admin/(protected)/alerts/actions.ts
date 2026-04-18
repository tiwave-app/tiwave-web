'use server'
import { createClient } from '@supabase/supabase-js'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

function getServiceClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )
}

async function getCurrentUserId(): Promise<string> {
  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet: { name: string; value: string; options?: CookieOptions }[]) => {
          try { cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options)) } catch {}
        },
      },
    }
  )
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Non autorisé')
  return user.id
}

export async function createBeachAlert(formData: FormData) {
  const beach_id  = formData.get('beach_id') as string
  const type      = formData.get('type') as string
  const title     = formData.get('title') as string
  const body      = formData.get('body') as string
  const expiresAt = formData.get('expires_at') as string | null

  if (!beach_id || !type || !title || !body) {
    throw new Error('Tous les champs obligatoires doivent être remplis')
  }

  const created_by = await getCurrentUserId()
  const supabase = getServiceClient()
  const { error } = await supabase.from('beach_alerts').insert({
    beach_id,
    type,
    title,
    body,
    expires_at: expiresAt || null,
    created_by,
  })

  if (error) throw new Error(error.message)

  revalidatePath('/admin/alerts')
  redirect('/admin/alerts')
}

export async function deactivateAlert(id: string) {
  const supabase = getServiceClient()
  await supabase.from('beach_alerts').update({ active: false }).eq('id', id)
  revalidatePath('/admin/alerts')
}
