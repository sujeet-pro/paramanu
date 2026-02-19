import { createFocusTrap } from "@paramanu/utilities-js"
import type { FocusTrapInstance } from "@paramanu/utilities-js"
import { createPortal } from "@paramanu/utilities-js"
import type { PortalInstance } from "@paramanu/utilities-js"
import { createPresence } from "@paramanu/utilities-js"
import type { PresenceInstance } from "@paramanu/utilities-js"
import { lockScroll, unlockScroll } from "../_internal/scroll-lock.js"
import type { CreateAlertdialogOptions, AlertdialogInstance } from "./alert-dialog.types.js"

export function createAlertdialog(
  element: HTMLElement,
  options: CreateAlertdialogOptions = {},
): AlertdialogInstance {
  const {
    onClose,
    initialFocus,
    closeOnEscape = false,
  } = options

  let portal: PortalInstance | null = null
  let focusTrap: FocusTrapInstance | null = null
  let presence: PresenceInstance | null = null
  let isOpen = false

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
  }

  function close(): void {
    if (!isOpen) return

    presence?.setPresent(false)
    focusTrap?.deactivate()
    onClose?.()
  }

  function destroy(): void {
    if (isOpen) {
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
