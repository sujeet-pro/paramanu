import type { CreateSheetOptions, SheetInstance } from "./sheet.types.js"
import { createFocusTrap } from "@paramanu/utilities-js"
import { createPortal } from "@paramanu/utilities-js"
import { createPresence } from "@paramanu/utilities-js"
import { lockScroll, unlockScroll } from "../_internal/scroll-lock.js"

export function createSheet(
  element: HTMLElement,
  options: CreateSheetOptions = {},
): SheetInstance {
  const {
    onClose,
    initialFocus,
    closeOnBackdropClick = true,
    closeOnEscape = true,
  } = options

  let portal: ReturnType<typeof createPortal> | null = null
  let focusTrap: ReturnType<typeof createFocusTrap> | null = null
  let presence: ReturnType<typeof createPresence> | null = null
  let isOpen = false

  function handleBackdropClick(event: MouseEvent): void {
    if (closeOnBackdropClick && event.target === portal?.container) {
      close()
    }
  }

  function open(): void {
    if (isOpen) return
    isOpen = true

    lockScroll()

    portal = createPortal()
    portal.mount(element)

    focusTrap = createFocusTrap(element, {
      initialFocus,
      returnFocusOnDeactivate: true,
      onEscapeKey: closeOnEscape ? () => close() : undefined,
    })

    presence = createPresence(element, {
      onExited: () => {
        focusTrap?.destroy()
        focusTrap = null
        portal?.destroy()
        portal = null
        unlockScroll()
        isOpen = false
      },
    })

    presence.setPresent(true)
    focusTrap.activate()

    if (closeOnBackdropClick) {
      portal.container.addEventListener("click", handleBackdropClick)
    }
  }

  function close(): void {
    if (!isOpen) return

    if (closeOnBackdropClick && portal) {
      portal.container.removeEventListener("click", handleBackdropClick)
    }

    focusTrap?.deactivate()
    presence?.setPresent(false)
    onClose?.()
  }

  function destroy(): void {
    if (isOpen) {
      if (closeOnBackdropClick && portal) {
        portal.container.removeEventListener("click", handleBackdropClick)
      }
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
