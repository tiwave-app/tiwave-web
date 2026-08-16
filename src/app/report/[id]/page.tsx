import type { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import { OpenInAppRedirect } from './OpenInAppRedirect'

export const revalidate = 0

type ReportPreview = {
  id: string
  comment: string | null
  created_at: string
  profiles: { username: string | null } | null
  report_photos: { photo_url: string }[]
  beaches: { name: string } | null
}

async function fetchReport(id: string): Promise<ReportPreview | null> {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  )
  const { data } = await supabase
    .from('user_reports')
    .select('id, comment, created_at, profiles(username), report_photos(photo_url), beaches(name)')
    .eq('id', id)
    .maybeSingle()
  return data as unknown as ReportPreview | null
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const report = await fetchReport(id)

  if (!report) {
    return { title: 'Observation — TiWave' }
  }

  const username = report.profiles?.username ?? 'un Tiwaver'
  const beachName = report.beaches?.name
  const title = beachName ? `Observation à ${beachName} — TiWave` : 'Observation — TiWave'
  const description = report.comment
    ? `${username} : ${report.comment}`
    : `Observation de ${username} sur TiWave`
  const image = report.report_photos?.[0]?.photo_url

  return {
    title,
    description,
    alternates: { canonical: `https://tiwave.app/report/${id}` },
    openGraph: {
      title,
      description,
      url: `https://tiwave.app/report/${id}`,
      siteName: 'TiWave',
      locale: 'fr_FR',
      type: 'article',
      images: image ? [{ url: image }] : undefined,
    },
    twitter: {
      card: image ? 'summary_large_image' : 'summary',
      title,
      description,
      images: image ? [image] : undefined,
    },
  }
}

export default async function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const report = await fetchReport(id)

  const username = report?.profiles?.username ?? 'un Tiwaver'
  const beachName = report?.beaches?.name

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-20 bg-[#f4e9d8]">
      <OpenInAppRedirect reportId={id} />
      <div className="max-w-md w-full text-center">
        {report?.report_photos?.[0]?.photo_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={report.report_photos[0].photo_url}
            alt=""
            className="w-full h-56 object-cover rounded-2xl mb-6 shadow-md"
          />
        ) : null}
        <h1 className="text-2xl font-bold text-[#013a63] mb-2">
          {beachName ? `Observation à ${beachName}` : 'Observation TiWave'}
        </h1>
        {report ? (
          <p className="text-gray-700 mb-8">
            {report.comment ? `${username} : « ${report.comment} »` : `Partagée par ${username}`}
          </p>
        ) : (
          <p className="text-gray-700 mb-8">Cette observation n&apos;existe plus.</p>
        )}
        <a
          href={`tiwave://report/${id}`}
          className="inline-block bg-[#0093d0] text-white font-semibold rounded-full px-8 py-3 mb-4"
        >
          Ouvrir dans TiWave
        </a>
        <p className="text-sm text-gray-500">
          L&apos;app pas encore installée ?{' '}
          <a href="https://tiwave.app" className="text-[#0093d0] underline">
            En savoir plus
          </a>
        </p>
      </div>
    </main>
  )
}
