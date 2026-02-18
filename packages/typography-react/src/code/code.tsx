import { forwardRef } from "react"
import { codeClasses } from "@paramanu/typography-js"
import type { CodeClassesOptions } from "@paramanu/typography-js"

export interface ReactCodeProps
  extends Omit<CodeClassesOptions, "language">,
    Omit<React.HTMLAttributes<HTMLElement>, "color"> {
  /** Language hint for syntax highlighting. Applied as a CSS class (e.g., "language-js"). */
  language?: string
  children?: React.ReactNode
}

export const Code = forwardRef<HTMLElement, ReactCodeProps>(function Code(
  { block, size, variant, color, withLineNumbers, withCopyButton, language, className, children, ...rest },
  ref,
) {
  const classes = codeClasses({ block, size, variant, color, withLineNumbers, withCopyButton, language })
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
