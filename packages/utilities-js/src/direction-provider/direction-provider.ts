import type { Direction } from "./direction-provider.types.js"

export function setDirection(dir: Direction, target?: HTMLElement): void {
  const el = target ?? document.documentElement
  el.setAttribute("dir", dir)
}

export function getDirection(target?: HTMLElement): Direction {
  const el = target ?? document.documentElement
  const dir = el.getAttribute("dir")
  return dir === "rtl" ? "rtl" : "ltr"
}
