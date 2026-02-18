import { forwardRef } from "react"
import { boxClasses } from "@paramanu/primitives-js"
import type { BoxProps } from "@paramanu/primitives-js"

export type ReactBoxProps<C extends React.ElementType = "div"> = BoxProps & {
  as?: C
  children?: React.ReactNode
  className?: string
} & Omit<React.ComponentPropsWithoutRef<C>, "as" | "className" | "children">

export const Box = forwardRef<HTMLDivElement, ReactBoxProps>(function Box(
  { as, className, children, ...rest },
  ref,
) {
  const Component = as || "div"
  const classes = boxClasses()
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <Component ref={ref} className={combinedClassName} {...rest}>
      {children}
    </Component>
  )
}) as <C extends React.ElementType = "div">(
  props: ReactBoxProps<C> & { ref?: React.Ref<HTMLDivElement> },
) => React.ReactElement | null
