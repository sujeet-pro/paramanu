import { wait } from "./wait"

type conditionFunction = () => boolean
type waitForConditionOptions = {
  pollInterval?: number,
  timeout?: number
}

/**
 * This is an async function that allows developers to provide 
 * a condition function, polling interval (in milliseconds), and optional timeout (in milliseconds).
 * @param condition - checks if a condition is met or not
 * @param options - configure the behaviour of the polling
 * @param options.pollInterval - interval (time in ms) at which the condition is checked
 * @param options.timeout - time in ms after which function bails and rejects the promise
 * @returns a promise that resolves when the condition is met 
 * 
 * @example
 * await waitForPolledCondition(() => document.body.classList.has('loaded'));
 * 
 * @example
 * check id the body has "Loaded" class
 * every 100ms and timeout after 30 seconds
 * ```ts
 * await waitForPolledCondition(
 *    () => document.body.classList.has('loaded'),
 *    {pollInterval: 100, timeout: 30000}
 * );
 * ```
 */
export async function waitForPolledCondition(condition: conditionFunction, options: waitForConditionOptions = {}) {
  const {pollInterval = 50, timeout} = options
  const startTime = Date.now()

  while(true) {
    if(typeof timeout === 'number' && Date.now() > startTime + timeout) {
      throw new Error('Timeout')
    }
    const result = await condition()
    if(result) {
      return result
    }
    await wait(pollInterval)
  }
}