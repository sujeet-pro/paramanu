export type Placement =
  | "top"
  | "top-start"
  | "top-end"
  | "bottom"
  | "bottom-start"
  | "bottom-end"
  | "left"
  | "left-start"
  | "left-end"
  | "right"
  | "right-start"
  | "right-end"

export interface PositionOptions {
  placement?: Placement
  offset?: number
}

export interface PositionResult {
  x: number
  y: number
  placement: Placement
}

function getOppositePlacement(placement: Placement): Placement {
  const map: Record<string, string> = {
    top: "bottom",
    bottom: "top",
    left: "right",
    right: "left",
  }
  const [side, align] = placement.split("-")
  const flipped = map[side] ?? side
  return (align ? `${flipped}-${align}` : flipped) as Placement
}

export function computePosition(
  trigger: HTMLElement,
  floating: HTMLElement,
  options: PositionOptions = {},
): PositionResult {
  const { placement = "bottom", offset = 8 } = options

  const triggerRect = trigger.getBoundingClientRect()
  const floatingRect = floating.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  function calculate(p: Placement): { x: number; y: number } {
    const [side, align] = p.split("-") as [string, string | undefined]

    let x = 0
    let y = 0

    switch (side) {
      case "top":
        x = triggerRect.left + triggerRect.width / 2 - floatingRect.width / 2
        y = triggerRect.top - floatingRect.height - offset
        break
      case "bottom":
        x = triggerRect.left + triggerRect.width / 2 - floatingRect.width / 2
        y = triggerRect.bottom + offset
        break
      case "left":
        x = triggerRect.left - floatingRect.width - offset
        y = triggerRect.top + triggerRect.height / 2 - floatingRect.height / 2
        break
      case "right":
        x = triggerRect.right + offset
        y = triggerRect.top + triggerRect.height / 2 - floatingRect.height / 2
        break
    }

    if (align === "start") {
      if (side === "top" || side === "bottom") {
        x = triggerRect.left
      } else {
        y = triggerRect.top
      }
    } else if (align === "end") {
      if (side === "top" || side === "bottom") {
        x = triggerRect.right - floatingRect.width
      } else {
        y = triggerRect.bottom - floatingRect.height
      }
    }

    return { x, y }
  }

  let result = calculate(placement)
  let finalPlacement = placement

  const wouldOverflow =
    result.x < 0 ||
    result.y < 0 ||
    result.x + floatingRect.width > viewportWidth ||
    result.y + floatingRect.height > viewportHeight

  if (wouldOverflow) {
    const flipped = getOppositePlacement(placement)
    const flippedResult = calculate(flipped)
    const flippedOverflow =
      flippedResult.x < 0 ||
      flippedResult.y < 0 ||
      flippedResult.x + floatingRect.width > viewportWidth ||
      flippedResult.y + floatingRect.height > viewportHeight

    if (!flippedOverflow) {
      result = flippedResult
      finalPlacement = flipped
    }
  }

  return { x: result.x, y: result.y, placement: finalPlacement }
}
