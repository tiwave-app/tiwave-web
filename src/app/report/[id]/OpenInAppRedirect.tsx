'use client'

import { useEffect } from 'react'

export function OpenInAppRedirect({ reportId }: { reportId: string }) {
  useEffect(() => {
    // Universal Links ouvrent déjà l'app directement sur iOS/Android quand
    // elle est installée — cet effet ne s'exécute donc que dans le cas où
    // on atterrit vraiment sur la page web (app non installée, ou lien tapé
    // depuis un contexte qui ne déclenche pas l'Universal Link).
    window.location.href = `tiwave://report/${reportId}`
  }, [reportId])

  return null
}
