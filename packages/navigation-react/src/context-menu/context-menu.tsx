import { forwardRef } from "react"
import { contextMenuClasses } from "@paramanu/navigation-js"
import type { ContextMenuClassesOptions } from "@paramanu/navigation-js"

export interface ReactContextMenuProps
  extends ContextMenuClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const ContextMenu = forwardRef<HTMLDivElement, ReactContextMenuProps>(function ContextMenu(
  { size, open, className, children, ...rest },
  ref,
) {
  const classes = contextMenuClasses({ size, open })
  const combinedClassName = className ? `${classes} ${className}` : classes
  return (
    <div ref={ref} role="menu" className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
