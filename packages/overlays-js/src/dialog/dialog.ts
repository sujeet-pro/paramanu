import { createFocusTrap } from "@paramanu/utilities-js"
import type { FocusTrapInstance } from "@paramanu/utilities-js"
import { createPortal } from "@paramanu/utilities-js"
import type { PortalInstance } from "@paramanu/utilities-js"
import { createPresence } from "@paramanu/utilities-js"
import type { PresenceInstance } from "@paramanu/utilities-js"
import { lockScroll, unlockScroll } from "../_internal/scroll-lock.js"
import type { CreateDialogOptions, DialogInstance } from "./dialog.types.js"

export function createDialog(
  element: HTMLElement,
  options: CreateDialogOptions = {},
): DialogInstance {
  const {
    onClose,
    initialFocus,
    closeOnBackdropClick = true,
    closeOnEscape = true,
  } = options

  let portal: PortalInstance | null = null
  let focusTrap: FocusTrapInstance | null = null
  let presence: PresenceInstance | null = null
  let isOpen = false

  function handleBackdropClick(event: MouseEvent): void {
    if (closeOnBackdropClick && event.target === element) {
      close()
    }
  }

  function open(): void {
    if (isOpen) return
    isOpen = true

    lockScroll()

    portal = createPortal()
    portal.mount(element)

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
      initialFocus,
      returnFocusOnDeactivate: true,
      onEscapeKey: closeOnEscape ? close : undefined,
    })

    presence.setPresent(true)
    focusTrap.activate()

    if (closeOnBackdropClick) {
      element.addEventListener("click", handleBackdropClick)
    }
  }

  function close(): void {
    if (!isOpen) return

    if (closeOnBackdropClick) {
      element.removeEventListener("click", handleBackdropClick)
    }

    presence?.setPresent(false)
    focusTrap?.deactivate()
    onClose?.()
  }

  function destroy(): void {
    if (isOpen) {
      element.removeEventListener("click", handleBackdropClick)
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
