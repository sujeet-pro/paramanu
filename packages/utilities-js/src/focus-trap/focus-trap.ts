import type { FocusTrapOptions, FocusTrapInstance } from "./focus-trap.types.js"

export const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ")

export function createFocusTrap(
  element: HTMLElement,
  options: FocusTrapOptions = {},
): FocusTrapInstance {
  const { initialFocus, returnFocusOnDeactivate = true, onEscapeKey } = options

  let previouslyFocused: Element | null = null
  let active = false

  function getFocusableElements(): HTMLElement[] {
    return Array.from(element.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR))
  }

  function handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "Escape" && onEscapeKey) {
      onEscapeKey()
      return
    }

    if (event.key !== "Tab") return

    const focusable = getFocusableElements()
    if (focusable.length === 0) {
      event.preventDefault()
      return
    }

    const first = focusable[0]
    const last = focusable[focusable.length - 1]

    if (event.shiftKey) {
      if (document.activeElement === first) {
        event.preventDefault()
        last.focus()
      }
    } else {
      if (document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
  }

  function activate(): void {
    if (active) return
    active = true
    previouslyFocused = document.activeElement

    let target: HTMLElement | null = null
    if (typeof initialFocus === "string") {
      target = element.querySelector<HTMLElement>(initialFocus)
    } else if (initialFocus instanceof HTMLElement) {
      target = initialFocus
    }

    if (!target) {
      const focusable = getFocusableElements()
      target = focusable[0] ?? null
    }

    target?.focus()
    element.addEventListener("keydown", handleKeyDown)
  }

  function deactivate(): void {
    if (!active) return
    active = false
    element.removeEventListener("keydown", handleKeyDown)

    if (returnFocusOnDeactivate && previouslyFocused instanceof HTMLElement) {
      previouslyFocused.focus()
    }
  }

  function destroy(): void {
    deactivate()
    previouslyFocused = null
  }

  return { activate, deactivate, destroy }
}
