import { NextResponse, type NextRequest } from 'next/server'

// Lien unique de téléchargement, utilisé dans les mails et les réseaux :
// redirige vers le store de l'appareil. Tant que l'app Android n'est pas
// publique sur le Play Store, Android part vers l'inscription des testeurs.
// Depuis un ordinateur, on ne peut pas deviner le store voulu : page /app.
const APP_STORE_URL = 'https://apps.apple.com/app/id6767921828'
const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=app.tiwave.mobile'
const ANDROID_PUBLIC = false

export function GET(request: NextRequest) {
  const ua = request.headers.get('user-agent') ?? ''

  if (/android/i.test(ua)) {
    return NextResponse.redirect(
      ANDROID_PUBLIC ? PLAY_STORE_URL : new URL('/beta?appareil=android', request.url),
    )
  }
  if (/iphone|ipad|ipod/i.test(ua)) return NextResponse.redirect(APP_STORE_URL)

  return NextResponse.redirect(new URL('/app', request.url))
}
