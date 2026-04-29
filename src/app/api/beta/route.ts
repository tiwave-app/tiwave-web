import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name } = body

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.replace(/\s/g, '')

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    const { error } = await supabase
      .from('beta_testers')
      .insert({
        email: email.toLowerCase().trim(),
        name: name?.trim() || null,
      })

    if (error) {
      if (error.code === '23505') {
        return NextResponse.json({ error: 'Cet email est déjà inscrit.' }, { status: 409 })
      }
      console.error('Beta insert error:', JSON.stringify(error))
      return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Beta route unexpected error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
