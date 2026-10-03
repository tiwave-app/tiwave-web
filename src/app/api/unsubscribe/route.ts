import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function POST(request: Request) {
  try {
    // Deux entrées :
    // - un jeton (?t=…), porté par les mails envoyés aux comptes de l'app. Les
    //   clients mail l'appellent directement pour la désinscription en un clic
    //   (RFC 8058), avec un corps de formulaire et non du JSON ;
    // - une adresse, saisie sur la page par un inscrit de la newsletter.
    const jetonUrl = new URL(request.url).searchParams.get('t')
    const body = jetonUrl ? {} : await request.json()
    const jeton = jetonUrl ?? body.token
    const { email } = body

    if (jeton !== undefined && jeton !== null) {
      if (typeof jeton !== 'string' || !UUID.test(jeton)) {
        return NextResponse.json({ error: 'Lien invalide.' }, { status: 400 })
      }
    } else if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Email invalide.' }, { status: 400 })
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.replace(/\s/g, '')

    if (!supabaseUrl || !supabaseKey) {
      console.error('Missing Supabase env vars', { supabaseUrl: !!supabaseUrl, supabaseKey: !!supabaseKey })
      return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
    }

    const supabase = createClient(supabaseUrl, supabaseKey)

    // Les fonctions SQL répondent pareil que l'adresse ou le jeton existe ou
    // non : on ne révèle pas qui est abonné.
    const { error } = jeton
      ? await supabase.rpc('unsubscribe_app_mails', { p_token: jeton })
      : await supabase.rpc('unsubscribe_newsletter', {
          p_email: email.toLowerCase().trim(),
        })

    if (error) {
      console.error('Newsletter unsubscribe error:', JSON.stringify(error))
      return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Unsubscribe route unexpected error:', err)
    return NextResponse.json({ error: 'Erreur serveur.' }, { status: 500 })
  }
}
