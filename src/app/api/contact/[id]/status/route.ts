import { createClient } from '@/lib/supabase-server'
import { NextResponse } from 'next/server'

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const { status } = await request.json()

  if (!['nouveau', 'traite'].includes(status)) {
    return NextResponse.json({ error: 'Statut invalide.' }, { status: 400 })
  }

  const supabase = await createClient()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { error } = await (supabase as any)
    .from('contact_requests')
    .update({ status })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
