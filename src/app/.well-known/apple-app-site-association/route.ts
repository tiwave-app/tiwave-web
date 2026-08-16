import { NextResponse } from 'next/server'

// Universal Links iOS. Doit être servi en HTTPS, sans redirection, avec
// Content-Type application/json, sans extension de fichier dans l'URL.
// Format : https://developer.apple.com/documentation/xcode/supporting-associated-domains
export async function GET() {
  return NextResponse.json(
    {
      applinks: {
        apps: [],
        details: [
          {
            appID: 'CDFHU44M3S.app.tiwave.mobile',
            paths: ['/report/*'],
          },
        ],
      },
    },
    { headers: { 'Content-Type': 'application/json' } },
  )
}
