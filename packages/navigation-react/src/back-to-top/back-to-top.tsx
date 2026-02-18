import { forwardRef } from "react"
import { backToTopClasses } from "@paramanu/navigation-js"
import type { BackToTopProps } from "@paramanu/navigation-js"

export interface ReactBackToTopProps
  extends BackToTopProps,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  children?: React.ReactNode
}

export const BackToTop = forwardRef<HTMLButtonElement, ReactBackToTopProps>(function BackToTop(
  { size, position, visible, className, children, ...rest },
  ref,
) {
  const classes = backToTopClasses({ size, position, visible })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <button
      ref={ref}
      type="button"
      className={combinedClassName}
      aria-label={rest["aria-label"] ?? "Back to top"}
      {...rest}
    >
      {children ?? "\u2191"}
    </button>
  )
})
