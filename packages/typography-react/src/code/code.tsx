import { forwardRef } from "react"
import { codeClasses } from "@paramanu/typography-js"
import type { CodeClassesOptions } from "@paramanu/typography-js"

export interface ReactCodeProps
  extends CodeClassesOptions,
    React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode
}

export const Code = forwardRef<HTMLElement, ReactCodeProps>(function Code(
  { block, size, className, children, ...rest },
  ref,
) {
  const classes = codeClasses({ block, size })
  const combinedClassName = className ? `${classes} ${className}` : classes

  if (block) {
    return (
      <pre ref={ref as React.Ref<HTMLPreElement>} className={combinedClassName} {...rest}>
        <code>{children}</code>
      </pre>
    )
  }

  return (
    <code ref={ref as React.Ref<HTMLElement>} className={combinedClassName} {...rest}>
      {children}
    </code>
  )
})
