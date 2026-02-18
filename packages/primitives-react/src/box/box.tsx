import { forwardRef } from "react"
import { boxClasses } from "@paramanu/primitives-js"
import type { BoxProps } from "@paramanu/primitives-js"

export type ReactBoxProps<C extends React.ElementType = "div"> = BoxProps & {
  /** The HTML element or React component to render. Defaults to "div". */
  as?: C
  /** Child elements. */
  children?: React.ReactNode
  /** Additional CSS class names. */
  className?: string
} & Omit<React.ComponentPropsWithoutRef<C>, "as" | "className" | "children">

export const Box = forwardRef<HTMLDivElement, ReactBoxProps>(function Box(
  { as, display, p, px, py, m, mx, my, overflow, position, className, children, ...rest },
  ref,
) {
  const Component = as || "div"
  const classes = boxClasses({ display, p, px, py, m, mx, my, overflow, position })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <Component ref={ref} className={combinedClassName} {...rest}>
      {children}
    </Component>
  )
}) as <C extends React.ElementType = "div">(
  props: ReactBoxProps<C> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement | null
