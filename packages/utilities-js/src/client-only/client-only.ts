/**
 * Checks whether the code is running in a browser (client) environment.
 *
 * Returns `true` when both `window` and `document` globals are defined,
 * which indicates a DOM environment. Returns `false` during server-side
 * rendering (Node.js, Deno, Bun without DOM shims).
 *
 * For React applications, prefer the `useIsClient()` hook from
 * `@paramanu/utilities-react` which properly handles hydration timing.
 *
 * @returns `true` if running in a browser environment, `false` otherwise
 *
 * @example
 * ```ts
 * import { isClient } from "@paramanu/utilities-js"
 *
 * if (isClient()) {
 *   localStorage.setItem("key", "value")
 * }
 * ```
 */
export function isClient(): boolean {
  return typeof window !== "undefined" && typeof document !== "undefined"
}
