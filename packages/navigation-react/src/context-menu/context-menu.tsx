import { forwardRef } from "react"
import { ctxMenuClasses } from "@paramanu/navigation-js"
import type { CtxMenuClassesOptions } from "@paramanu/navigation-js"

export interface ReactCtxMenuProps
  extends CtxMenuClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CtxMenu = forwardRef<HTMLDivElement, ReactCtxMenuProps>(function CtxMenu(
  { size, open, className, children, ...rest },
  ref,
) {
  const classes = ctxMenuClasses({ size, open })
  const combinedClassName = className ? `${classes} ${className}` : classes
  return (
    <div ref={ref} role="menu" className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
