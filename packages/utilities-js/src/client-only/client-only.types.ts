/**
 * Client-only detection utility.
 *
 * The `isClient()` function determines whether code is executing in a
 * browser environment (client-side) versus a server environment (SSR/SSG).
 *
 * This is useful for:
 * - Guarding browser-only APIs (window, document, localStorage)
 * - Preventing hydration mismatches in SSR frameworks
 * - Conditionally importing browser-only modules
 *
 * For React usage, prefer the `useIsClient()` hook or `<ClientOnly>` component
 * from `@paramanu/utilities-react`, which properly handle React hydration.
 *
 * @example
 * ```ts
 * import { isClient } from "@paramanu/utilities-js"
 *
 * if (isClient()) {
 *   // Safe to use browser APIs
 *   document.title = "Updated"
 * }
 * ```
 */
// This file exists for consistency with the file naming convention.
// The isClient function has no configurable options.
