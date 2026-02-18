import type { CreateSplitterOptions, SplitterInstance } from "./splitter.types.js"

export function createSplitter(
  container: HTMLElement,
  options: CreateSplitterOptions = {},
): SplitterInstance {
  const { orientation = "horizontal", onResize } = options
  const handles = container.querySelectorAll<HTMLElement>(
    ".pm-splitter__handle, [data-splitter-handle]",
  )
  const panels = container.querySelectorAll<HTMLElement>(
    ".pm-splitter__panel, [data-splitter-panel]",
  )

  const isHorizontal = orientation === "horizontal"

  function getContainerSize(): number {
    return isHorizontal ? container.offsetWidth : container.offsetHeight
  }

  function handlePointerDown(e: PointerEvent, handleIndex: number) {
    e.preventDefault()
    const startPos = isHorizontal ? e.clientX : e.clientY
    const containerSize = getContainerSize()
    const panelBefore = panels[handleIndex]
    const panelAfter = panels[handleIndex + 1]
    if (!panelBefore || !panelAfter) return

    const startSizeBefore = isHorizontal ? panelBefore.offsetWidth : panelBefore.offsetHeight
    const startSizeAfter = isHorizontal ? panelAfter.offsetWidth : panelAfter.offsetHeight

    const handle = handles[handleIndex]
    handle?.classList.add("pm-splitter__handle--active")

    function onPointerMove(e: PointerEvent) {
      const currentPos = isHorizontal ? e.clientX : e.clientY
      const delta = currentPos - startPos
      const newSizeBefore = ((startSizeBefore + delta) / containerSize) * 100
      const newSizeAfter = ((startSizeAfter - delta) / containerSize) * 100

      if (newSizeBefore > 0 && newSizeAfter > 0) {
        panelBefore.style[isHorizontal ? "width" : "height"] = `${newSizeBefore}%`
        panelAfter.style[isHorizontal ? "width" : "height"] = `${newSizeAfter}%`

        const sizes: number[] = []
        panels.forEach((p) => {
          const size = isHorizontal ? p.offsetWidth : p.offsetHeight
          sizes.push((size / containerSize) * 100)
        })
        onResize?.(sizes)
      }
    }

    function onPointerUp() {
      handle?.classList.remove("pm-splitter__handle--active")
      document.removeEventListener("pointermove", onPointerMove)
      document.removeEventListener("pointerup", onPointerUp)
    }

    document.addEventListener("pointermove", onPointerMove)
    document.addEventListener("pointerup", onPointerUp)
  }

  function handleKeyDown(e: KeyboardEvent, handleIndex: number) {
    const step = 5 // 5% per keypress
    const panelBefore = panels[handleIndex]
    const panelAfter = panels[handleIndex + 1]
    if (!panelBefore || !panelAfter) return

    const containerSize = getContainerSize()
    const sizeBefore =
      ((isHorizontal ? panelBefore.offsetWidth : panelBefore.offsetHeight) / containerSize) * 100
    const sizeAfter =
      ((isHorizontal ? panelAfter.offsetWidth : panelAfter.offsetHeight) / containerSize) * 100

    let delta = 0
    if (isHorizontal) {
      if (e.key === "ArrowLeft") delta = -step
      if (e.key === "ArrowRight") delta = step
    } else {
      if (e.key === "ArrowUp") delta = -step
      if (e.key === "ArrowDown") delta = step
    }

    if (delta === 0) return
    e.preventDefault()

    const newBefore = sizeBefore + delta
    const newAfter = sizeAfter - delta
    if (newBefore > 0 && newAfter > 0) {
      panelBefore.style[isHorizontal ? "width" : "height"] = `${newBefore}%`
      panelAfter.style[isHorizontal ? "width" : "height"] = `${newAfter}%`

      const sizes: number[] = []
      panels.forEach((p) => {
        const size = isHorizontal ? p.offsetWidth : p.offsetHeight
        sizes.push((size / containerSize) * 100)
      })
      onResize?.(sizes)
    }
  }

  // Attach event listeners
  const cleanups: (() => void)[] = []
  handles.forEach((handle, i) => {
    const onDown = (e: PointerEvent) => handlePointerDown(e, i)
    const onKey = (e: KeyboardEvent) => handleKeyDown(e, i)
    handle.addEventListener("pointerdown", onDown)
    handle.addEventListener("keydown", onKey)
    cleanups.push(() => {
      handle.removeEventListener("pointerdown", onDown)
      handle.removeEventListener("keydown", onKey)
    })
  })

  return {
    destroy() {
      cleanups.forEach((fn) => fn())
    },
  }
}
