'use client'

import { createBrowserClient } from '@supabase/ssr'

// Use cookie-based storage to avoid localStorage issues in SSR environments
// (Node.js 22 exposes a partial localStorage via --localstorage-file)
const ssrSafeStorage = {
  getItem: (key: string): string | null => {
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') return null
    try {
      return window.localStorage.getItem(key)
    } catch {
      return null
    }
  },
  setItem: (key: string, value: string): void => {
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') return
    try {
      window.localStorage.setItem(key, value)
    } catch {}
  },
  removeItem: (key: string): void => {
    if (typeof window === 'undefined' || typeof window.localStorage === 'undefined') return
    try {
      window.localStorage.removeItem(key)
    } catch {}
  },
}

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      auth: { storage: ssrSafeStorage },
    }
  )
}
