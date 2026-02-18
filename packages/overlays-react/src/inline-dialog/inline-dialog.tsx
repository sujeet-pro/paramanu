import { forwardRef } from "react"
import { inlineDialogClasses, inlineDialogBodyClasses } from "@paramanu/overlays-js"
import type { InlineDialogClassesOptions } from "@paramanu/overlays-js"

export interface ReactInlineDialogProps
  extends InlineDialogClassesOptions,
    Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  children?: React.ReactNode
}

export const InlineDialog = forwardRef<HTMLDivElement, ReactInlineDialogProps>(
  function InlineDialog({ visible, className, children, ...rest }, ref) {
    const classes = inlineDialogClasses({ visible })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} role="dialog" className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactInlineDialogBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const InlineDialogBody = forwardRef<HTMLDivElement, ReactInlineDialogBodyProps>(
  function InlineDialogBody({ className, children, ...rest }, ref) {
    const classes = inlineDialogBodyClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
