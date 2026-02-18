import type { FocusTrapOptions, FocusTrapInstance } from "./focus-trap.types.js"

/**
 * CSS selector matching all natively focusable elements.
 * Used internally by `createFocusTrap` to find tab-navigable descendants.
 *
 * Includes: links with href, enabled buttons/inputs/selects/textareas,
 * and elements with a non-negative tabindex.
 */
export const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  '[tabindex]:not([tabindex="-1"])',
].join(", ")

/**
 * Creates an imperative focus trap that constrains keyboard focus within
 * the given container element.
 *
 * The trap intercepts Tab and Shift+Tab keypresses to cycle focus among
 * the container's focusable descendants. It also handles the Escape key
 * via the optional `onEscapeKey` callback.
 *
 * Used internally by Dialog, Drawer, and other overlay components.
 * For React usage, prefer the `useFocusTrap` hook or `<FocusTrap>` component
 * from `@paramanu/utilities-react`.
 *
 * @param element - The container element to trap focus within
 * @param options - Configuration options
 * @returns A `FocusTrapInstance` with `activate`, `deactivate`, and `destroy` methods
 *
 * @example
 * ```ts
 * const trap = createFocusTrap(dialogEl, {
 *   initialFocus: "#confirm-btn",
 *   onEscapeKey: () => closeDialog(),
 * })
 * trap.activate()
 * // ... when dialog closes:
 * trap.deactivate()
 * ```
 */
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
