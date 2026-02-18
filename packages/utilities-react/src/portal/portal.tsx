import { useState, useEffect } from "react"
import { createPortal } from "react-dom"

export interface ReactPortalProps {
  target?: string | HTMLElement
  disabled?: boolean
  children: React.ReactNode
}

export function Portal({ target = "body", disabled, children }: ReactPortalProps) {
  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  useEffect(() => {
    if (disabled) return

    let targetElement: HTMLElement | null
    if (typeof target === "string") {
      targetElement = document.querySelector<HTMLElement>(target)
    } else {
      targetElement = target
    }

    if (!targetElement) return

    const div = document.createElement("div")
    div.setAttribute("data-pm-portal", "")
    targetElement.appendChild(div)
    setContainer(div)

    return () => {
      div.remove()
      setContainer(null)
    }
  }, [target, disabled])

  if (disabled) {
    return <>{children}</>
  }

  if (!container) return null

  return createPortal(children, container)
}
