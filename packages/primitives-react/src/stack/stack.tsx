import { forwardRef } from "react"
import { stackClasses } from "@paramanu/primitives-js"
import type { StackProps } from "@paramanu/primitives-js"

export interface ReactStackProps
  extends StackProps,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Stack = forwardRef<HTMLDivElement, ReactStackProps>(function Stack(
  { direction, gap, align, justify, className, children, ...rest },
  ref,
) {
  const classes = stackClasses({ direction, gap, align, justify })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export const HStack = forwardRef<HTMLDivElement, Omit<ReactStackProps, "direction">>(
  function HStack({ className, children, ...rest }, ref) {
    return (
      <Stack ref={ref} direction="horizontal" className={className} {...rest}>
        {children}
      </Stack>
    )
  },
)

export const VStack = forwardRef<HTMLDivElement, Omit<ReactStackProps, "direction">>(
  function VStack({ className, children, ...rest }, ref) {
    return (
      <Stack ref={ref} direction="vertical" className={className} {...rest}>
        {children}
      </Stack>
    )
  },
)
