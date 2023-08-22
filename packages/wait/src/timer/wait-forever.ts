/**
 * blocks execution of the next line without blocking the thread.
 * @returns a promise that never resolves
 *
 * @example
 * await waitForever()
 */
export function waitForever() {
  return new Promise(() => {})
}
