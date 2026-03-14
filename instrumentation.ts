// Next.js instrumentation — runs before the app starts on the server.
// Node.js 22 (used by Next.js 15) exposes a partial `localStorage` via
// --localstorage-file. When the path is invalid, methods like `getItem`
// are not real functions, which crashes @heroui/react / framer-motion during SSR.
// This polyfill ensures localStorage behaves safely on the server side.
export async function register() {
  if (
    typeof global !== 'undefined' &&
    typeof (global as Record<string, unknown>).localStorage !== 'undefined'
  ) {
    const ls = (global as Record<string, unknown>).localStorage as Record<string, unknown>
    if (typeof ls.getItem !== 'function') {
      const store: Record<string, string> = {}
      Object.assign(ls, {
        getItem: (key: string) => store[key] ?? null,
        setItem: (key: string, value: string) => { store[key] = value },
        removeItem: (key: string) => { delete store[key] },
        clear: () => { Object.keys(store).forEach(k => delete store[k]) },
      })
    }
  }
}
