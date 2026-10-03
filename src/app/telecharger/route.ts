import { NextResponse, type NextRequest } from 'next/server'

// Lien unique de téléchargement, utilisé dans les mails et les réseaux :
// redirige vers le store de l'appareil. Depuis un ordinateur, on ne peut pas
// deviner le store voulu, donc retour à l'accueil.
const APP_STORE_URL = 'https://apps.apple.com/app/id6767921828'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=app.tiwave.mobile'

export function GET(request: NextRequest) {
  const ua = request.headers.get('user-agent') ?? ''

  if (/android/i.test(ua)) return NextResponse.redirect(PLAY_STORE_URL)
  if (/iphone|ipad|ipod/i.test(ua)) return NextResponse.redirect(APP_STORE_URL)

  return NextResponse.redirect(new URL('/', request.url))
}
