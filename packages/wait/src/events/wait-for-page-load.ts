import { wait } from "../timer/wait"

function pageLoaded(): Promise<null> {
  return new Promise(resolve => {
    if (document.readyState === "complete") {
      resolve(null)
      return null
    }

    const listener = () => {
      if (document.readyState === "complete") {
        document.removeEventListener("readystatechange", listener)
        resolve(null)
      }
    }
    document.addEventListener("readystatechange", listener)
  })
}

/**
 * Resolves when the page is loaded within a given timeout (whichever is earlier)
 * @param timeout - resolves within a given timeout.
 * @returns a promise that resolves when the page is loaded
 * 
 * @example
 * resolves when the page is loaded or timeout (whichever is earlier)
 * ```ts
 * await  waitForPageLoad(100)
 * ```
 */
export function waitForPageLoad(timeout?: number | null): Promise<null> {
  if (typeof timeout === "number" && timeout > 0) {
    return Promise.race([pageLoaded(), wait(timeout)])
  }
  return pageLoaded()
}
