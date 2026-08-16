import { NextResponse } from 'next/server'

// App Links Android. Fingerprint SHA-256 du certificat de signature.
const SHA256_CERT_FINGERPRINTS: string[] = [
  'D0:2A:1A:96:39:40:22:AE:E2:3D:F3:8B:3D:8F:66:FB:7D:EA:39:79:A2:86:67:2B:8B:55:38:EB:D0:13:F1:E8',
]

export async function GET() {
  return NextResponse.json(
    [
      {
        relation: ['delegate_permission/common.handle_all_urls'],
        target: {
          namespace: 'android_app',
          package_name: 'app.tiwave.mobile',
          sha256_cert_fingerprints: SHA256_CERT_FINGERPRINTS,
        },
      },
    ],
    { headers: { 'Content-Type': 'application/json' } },
  )
}
