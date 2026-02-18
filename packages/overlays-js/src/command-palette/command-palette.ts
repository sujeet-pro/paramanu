import { createFocusTrap } from "@paramanu/utilities-js"
import type { FocusTrapInstance } from "@paramanu/utilities-js"
import { createPortal } from "@paramanu/utilities-js"
import type { PortalInstance } from "@paramanu/utilities-js"
import { createPresence } from "@paramanu/utilities-js"
import type { PresenceInstance } from "@paramanu/utilities-js"
import { lockScroll, unlockScroll } from "../_internal/scroll-lock.js"
import type { CreateCommandPaletteOptions, CommandPaletteInstance } from "./command-palette.types.js"

export function createCommandPalette(
  element: HTMLElement,
  options: CreateCommandPaletteOptions = {},
): CommandPaletteInstance {
  const { onClose, onSelect, hotkey = "k" } = options

  let portal: PortalInstance | null = null
  let focusTrap: FocusTrapInstance | null = null
  let presence: PresenceInstance | null = null
  let isOpen = false

  function handleHotkey(event: KeyboardEvent): void {
    if ((event.metaKey || event.ctrlKey) && event.key === hotkey) {
      event.preventDefault()
      if (isOpen) {
        close()
      } else {
        open()
      }
    }
  }

  function handleItemClick(event: Event): void {
    const target = event.target as HTMLElement
    const item = target.closest("[role='option']") as HTMLElement | null
    if (item) {
      const value = item.dataset.value ?? item.textContent ?? ""
      onSelect?.(value)
      close()
    }
  }

  document.addEventListener("keydown", handleHotkey)

  function open(): void {
    if (isOpen) return
    isOpen = true

    lockScroll()

    portal = createPortal()
    portal.mount(element)

    const input = element.querySelector("input, [role='combobox']") as HTMLElement | null

    presence = createPresence(element, {
      onExited() {
        focusTrap?.destroy()
        focusTrap = null
        portal?.destroy()
        portal = null
        unlockScroll()
        isOpen = false
      },
    })

    focusTrap = createFocusTrap(element, {
      initialFocus: input ?? undefined,
      returnFocusOnDeactivate: true,
      onEscapeKey: close,
    })

    element.addEventListener("click", handleItemClick)

    presence.setPresent(true)
    focusTrap.activate()
  }

  function close(): void {
    if (!isOpen) return

    element.removeEventListener("click", handleItemClick)

    presence?.setPresent(false)
    focusTrap?.deactivate()
    onClose?.()
  }

  function destroy(): void {
    document.removeEventListener("keydown", handleHotkey)

    if (isOpen) {
      element.removeEventListener("click", handleItemClick)
      focusTrap?.destroy()
      focusTrap = null
      presence?.destroy()
      presence = null
      portal?.destroy()
      portal = null
      unlockScroll()
      isOpen = false
    }
  }

  return { open, close, destroy }
}
