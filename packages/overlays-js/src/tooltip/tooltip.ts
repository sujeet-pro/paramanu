import { computePosition } from "../_internal/position.js"
import type { Placement } from "../_internal/position.js"
import { createPresence } from "@paramanu/utilities-js"
import type { PresenceInstance } from "@paramanu/utilities-js"
import type { CreateTooltipOptions, TooltipInstance } from "./tooltip.types.js"

export function createTooltip(
  trigger: HTMLElement,
  tooltip: HTMLElement,
  options: CreateTooltipOptions = {},
): TooltipInstance {
  const {
    placement = "top",
    offset = 8,
    showDelay = 500,
    hideDelay = 0,
  } = options

  let presence: PresenceInstance | null = null
  let showTimeout: ReturnType<typeof setTimeout> | null = null
  let hideTimeout: ReturnType<typeof setTimeout> | null = null
  let isVisible = false

  function updatePosition(): void {
    const result = computePosition(trigger, tooltip, {
      placement: placement as Placement,
      offset,
    })
    tooltip.style.left = `${result.x}px`
    tooltip.style.top = `${result.y}px`
  }

  function clearTimeouts(): void {
    if (showTimeout !== null) {
      clearTimeout(showTimeout)
      showTimeout = null
    }
    if (hideTimeout !== null) {
      clearTimeout(hideTimeout)
      hideTimeout = null
    }
  }

  function show(): void {
    clearTimeouts()
    showTimeout = setTimeout(() => {
      if (isVisible) return
      isVisible = true
      tooltip.style.position = "absolute"
      tooltip.style.display = ""
      updatePosition()

      presence = createPresence(tooltip, {
        onExited() {
          tooltip.style.display = "none"
        },
      })
      presence.setPresent(true)
    }, showDelay)
  }

  function hide(): void {
    clearTimeouts()
    hideTimeout = setTimeout(() => {
      if (!isVisible) return
      isVisible = false
      presence?.setPresent(false)
    }, hideDelay)
  }

  function handleMouseEnter(): void {
    show()
  }

  function handleMouseLeave(): void {
    hide()
  }

  function handleFocus(): void {
    show()
  }

  function handleBlur(): void {
    hide()
  }

  function destroy(): void {
    clearTimeouts()
    trigger.removeEventListener("mouseenter", handleMouseEnter)
    trigger.removeEventListener("mouseleave", handleMouseLeave)
    trigger.removeEventListener("focus", handleFocus)
    trigger.removeEventListener("blur", handleBlur)
    presence?.destroy()
    presence = null

    if (tooltip.id) {
      trigger.removeAttribute("aria-describedby")
    }
  }

  // Set up aria relationship
  if (tooltip.id) {
    trigger.setAttribute("aria-describedby", tooltip.id)
  }

  // Set tooltip role
  tooltip.setAttribute("role", "tooltip")

  // Initialize hidden
  tooltip.style.display = "none"

  // Bind events
  trigger.addEventListener("mouseenter", handleMouseEnter)
  trigger.addEventListener("mouseleave", handleMouseLeave)
  trigger.addEventListener("focus", handleFocus)
  trigger.addEventListener("blur", handleBlur)

  return { show, hide, destroy }
}
