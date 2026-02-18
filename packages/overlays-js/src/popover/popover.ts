import { computePosition } from "../_internal/position.js"
import type { Placement } from "../_internal/position.js"
import { createFocusTrap } from "@paramanu/utilities-js"
import type { FocusTrapInstance } from "@paramanu/utilities-js"
import { createPresence } from "@paramanu/utilities-js"
import type { PresenceInstance } from "@paramanu/utilities-js"
import type { CreatePopoverOptions, PopoverInstance } from "./popover.types.js"

export function createPopover(
  trigger: HTMLElement,
  floating: HTMLElement,
  options: CreatePopoverOptions = {},
): PopoverInstance {
  const {
    placement = "bottom",
    offset = 8,
    onClose,
    closeOnEscape = true,
    closeOnOutsideClick = true,
    trapFocus = false,
  } = options

  let focusTrap: FocusTrapInstance | null = null
  let presence: PresenceInstance | null = null
  let isOpen = false

  function updatePosition(): void {
    const result = computePosition(trigger, floating, {
      placement: placement as Placement,
      offset,
    })
    floating.style.left = `${result.x}px`
    floating.style.top = `${result.y}px`
  }

  function handleOutsideClick(event: MouseEvent): void {
    const target = event.target as Node
    if (!floating.contains(target) && !trigger.contains(target)) {
      close()
    }
  }

  function handleEscape(event: KeyboardEvent): void {
    if (event.key === "Escape") close()
  }

  function open(): void {
    if (isOpen) return
    isOpen = true
    floating.style.position = "absolute"
    floating.style.display = ""
    updatePosition()
    trigger.setAttribute("aria-expanded", "true")

    presence = createPresence(floating, {
      onExited() {
        floating.style.display = "none"
        focusTrap?.destroy()
        focusTrap = null
      },
    })
    presence.setPresent(true)

    if (trapFocus) {
      focusTrap = createFocusTrap(floating, {
        onEscapeKey: closeOnEscape ? () => close() : undefined,
      })
      focusTrap.activate()
    } else if (closeOnEscape) {
      document.addEventListener("keydown", handleEscape)
    }

    if (closeOnOutsideClick) {
      document.addEventListener("click", handleOutsideClick, true)
    }
  }

  function close(): void {
    if (!isOpen) return
    isOpen = false
    trigger.setAttribute("aria-expanded", "false")
    presence?.setPresent(false)
    document.removeEventListener("keydown", handleEscape)
    document.removeEventListener("click", handleOutsideClick, true)
    onClose?.()
  }

  function destroy(): void {
    close()
    presence?.destroy()
    focusTrap?.destroy()
  }

  // Initialize hidden
  floating.style.display = "none"

  return { open, close, updatePosition, destroy }
}
