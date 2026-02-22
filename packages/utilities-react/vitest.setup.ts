import "@testing-library/jest-dom/vitest"
import { cleanup } from "@testing-library/react"
import { afterEach } from "vitest"

// Node 22+ ships a built-in localStorage that shadows jsdom's when
// --localstorage-file is present without a valid path.  The built-in
// version is incomplete (missing `clear()`) so we replace it with a
// simple in-memory Storage implementation that the tests can rely on.
if (
  typeof globalThis.localStorage === "undefined" ||
  typeof globalThis.localStorage.clear !== "function"
) {
  const store = new Map<string, string>()
  const storage: Storage = {
    get length() {
      return store.size
    },
    key(index: number) {
      return [...store.keys()][index] ?? null
    },
    getItem(key: string) {
      return store.get(key) ?? null
    },
    setItem(key: string, value: string) {
      store.set(key, String(value))
    },
    removeItem(key: string) {
      store.delete(key)
    },
    clear() {
      store.clear()
    },
  }
  Object.defineProperty(globalThis, "localStorage", { value: storage, writable: true })
}

afterEach(() => {
  cleanup()
})
