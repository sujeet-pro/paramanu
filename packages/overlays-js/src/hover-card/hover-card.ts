import { computePosition } from "../_internal/position.js"
import type { Placement } from "../_internal/position.js"
import { createPresence } from "@paramanu/utilities-js"
import type { PresenceInstance } from "@paramanu/utilities-js"
import type { CreateHoverCardOptions, HoverCardInstance } from "./hover-card.types.js"

export function createHoverCard(
  trigger: HTMLElement,
  card: HTMLElement,
  options: CreateHoverCardOptions = {},
): HoverCardInstance {
  const {
    placement = "bottom",
    offset = 8,
    openDelay = 200,
    closeDelay = 300,
  } = options

  let presence: PresenceInstance | null = null
  let openTimeout: ReturnType<typeof setTimeout> | null = null
  let closeTimeout: ReturnType<typeof setTimeout> | null = null
  let isOpen = false

  function updatePosition(): void {
    const result = computePosition(trigger, card, {
      placement: placement as Placement,
      offset,
    })
    card.style.left = `${result.x}px`
    card.style.top = `${result.y}px`
  }

  function clearTimeouts(): void {
    if (openTimeout !== null) {
      clearTimeout(openTimeout)
      openTimeout = null
    }
    if (closeTimeout !== null) {
      clearTimeout(closeTimeout)
      closeTimeout = null
    }
  }

  function open(): void {
    clearTimeouts()
    openTimeout = setTimeout(() => {
      if (isOpen) return
      isOpen = true
      card.style.position = "absolute"
      card.style.display = ""
      updatePosition()

      presence = createPresence(card, {
        onExited() {
          card.style.display = "none"
        },
      })
      presence.setPresent(true)
    }, openDelay)
  }

  function close(): void {
    clearTimeouts()
    closeTimeout = setTimeout(() => {
      if (!isOpen) return
      isOpen = false
      presence?.setPresent(false)
    }, closeDelay)
  }

  function handleTriggerMouseEnter(): void {
    open()
  }

  function handleTriggerMouseLeave(): void {
    close()
  }

  function handleCardMouseEnter(): void {
    clearTimeouts()
  }

  function handleCardMouseLeave(): void {
    close()
  }

  function destroy(): void {
    clearTimeouts()
    trigger.removeEventListener("mouseenter", handleTriggerMouseEnter)
    trigger.removeEventListener("mouseleave", handleTriggerMouseLeave)
    card.removeEventListener("mouseenter", handleCardMouseEnter)
    card.removeEventListener("mouseleave", handleCardMouseLeave)
    presence?.destroy()
    presence = null
  }

  // Initialize hidden
  card.style.display = "none"

  // Bind events
  trigger.addEventListener("mouseenter", handleTriggerMouseEnter)
  trigger.addEventListener("mouseleave", handleTriggerMouseLeave)
  card.addEventListener("mouseenter", handleCardMouseEnter)
  card.addEventListener("mouseleave", handleCardMouseLeave)

  return { open, close, destroy }
}
