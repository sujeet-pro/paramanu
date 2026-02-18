import type { NProgressClassesOptions, NProgressInstance } from "./nprogress.types.js"

const BASE = "pm-nprogress"

/**
 * Returns BEM class names for the nprogress component (human-readable).
 * Returns an object with classes for root, bar, and peg sub-elements.
 * Used by CDN and template consumers.
 */
export function nprogressClasses(options: NProgressClassesOptions = {}): {
  root: string
  bar: string
  peg: string
} {
  const { active = false } = options

  const rootClasses = [BASE]

  if (active) rootClasses.push(`${BASE}--active`)

  return {
    root: rootClasses.join(" "),
    bar: `${BASE}__bar`,
    peg: `${BASE}__peg`,
  }
}

/**
 * Returns CSS module class names for the nprogress component (hashed).
 * Returns an object with classes for root, bar, and peg sub-elements.
 * Used by bundled/template consumers who import CSS modules.
 */
export function nprogressModuleClasses(
  classMap: Record<string, string>,
  options: NProgressClassesOptions = {},
): {
  root: string
  bar: string
  peg: string
} {
  const { active = false } = options

  const rootClasses = [classMap["pm-nprogress"]]

  if (active) rootClasses.push(classMap["pm-nprogress--active"])

  return {
    root: rootClasses.filter(Boolean).join(" "),
    bar: classMap["pm-nprogress__bar"] || "",
    peg: classMap["pm-nprogress__peg"] || "",
  }
}

/**
 * Clamps a value between 0 and 1.
 */
function clamp(value: number): number {
  return Math.min(1, Math.max(0, value))
}

/**
 * Creates a pure JS NProgress controller for managing progress state.
 * No DOM interaction -- this is purely state management.
 */
export function createNProgress(): NProgressInstance {
  let value = 0
  let active = false
  let timerHandle: ReturnType<typeof setInterval> | null = null

  function clearTimer(): void {
    if (timerHandle !== null) {
      clearInterval(timerHandle)
      timerHandle = null
    }
  }

  function trickle(): void {
    clearTimer()
    timerHandle = setInterval(() => {
      if (!active) {
        clearTimer()
        return
      }
      inc()
    }, 200)
  }

  function start(): void {
    active = true
    value = 0.08
    trickle()
  }

  function done(): void {
    value = 1
    active = false
    clearTimer()
  }

  function set(n: number): void {
    value = clamp(n)
    if (value >= 1) {
      active = false
      clearTimer()
    }
  }

  function inc(): void {
    if (!active) return

    let amount: number
    if (value < 0.2) {
      amount = 0.1
    } else if (value < 0.5) {
      amount = 0.04
    } else if (value < 0.8) {
      amount = 0.02
    } else if (value < 0.99) {
      amount = 0.005
    } else {
      amount = 0
    }

    value = clamp(value + amount)
  }

  function getValue(): number {
    return value
  }

  function isActive(): boolean {
    return active
  }

  return { start, done, set, inc, getValue, isActive }
}
