import { forwardRef } from "react"
import { inlineDlgClasses, inlineDialogBodyClasses } from "@paramanu/overlays-js"
import type { InlineDlgClassesOptions } from "@paramanu/overlays-js"

export interface ReactInlineDlgProps
  extends InlineDlgClassesOptions, Omit<React.HTMLAttributes<HTMLDivElement>, "role"> {
  children?: React.ReactNode
}

export const InlineDlg = forwardRef<HTMLDivElement, ReactInlineDlgProps>(function InlineDlg(
  { visible, className, children, ...rest },
  ref,
) {
  const classes = inlineDlgClasses({ visible })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} role="dialog" className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactInlineDlgBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const InlineDlgBody = forwardRef<HTMLDivElement, ReactInlineDlgBodyProps>(
  function InlineDlgBody({ className, children, ...rest }, ref) {
    const classes = inlineDialogBodyClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes
    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
