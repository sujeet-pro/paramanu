let lockCount = 0
let originalOverflow = ""

export function lockScroll(): void {
  lockCount++
  if (lockCount === 1) {
    originalOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
  }
}

export function unlockScroll(): void {
  if (lockCount === 0) return
  lockCount--
  if (lockCount === 0) {
    document.body.style.overflow = originalOverflow
  }
}
