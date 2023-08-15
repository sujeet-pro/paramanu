/**
 * 
 * @param delayInMs - time in millisecond
 * @returns resolved promise with null value after the `delay`
 * 
 * 
 * @example
 * // Wait for 1sec
 * ```ts
 * async function yourFunction() {
 *    await wait(1000)
 *    // do something after 1000ms delay
 * }
 * ```
 */
export function wait(delayInMs: number): Promise<null> {
  return new Promise<null>(resolve => {
    setTimeout(() => resolve(null), delayInMs)
  })
}