import { forwardRef } from "react"
import { tileClasses } from "@paramanu/data-display-js"
import type { TileClassesOptions } from "@paramanu/data-display-js"

/** Props for the Tile component. Renders as a `<button>` element. */
export interface ReactTileProps
  extends TileClassesOptions, React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
}

export const Tile = forwardRef<HTMLButtonElement, ReactTileProps>(function Tile(
  { variant, size, selected, disabled, type = "button", className, children, ...rest },
  ref,
) {
  const classes = tileClasses({ variant, size, selected, disabled })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <button
      ref={ref}
      type={type}
      className={combinedClassName}
      disabled={disabled}
      aria-selected={selected || undefined}
      aria-disabled={disabled || undefined}
      {...rest}
    >
      {children}
    </button>
  )
})
