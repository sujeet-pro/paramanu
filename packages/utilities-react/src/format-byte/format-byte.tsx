import { forwardRef } from "react"
import { formatByte } from "@paramanu/utilities-js"
import type { FormatByteOptions } from "@paramanu/utilities-js"

export interface ReactFormatByteProps extends FormatByteOptions, React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType
  value: number
}

export const FormatByte = forwardRef<HTMLElement, ReactFormatByteProps>(function FormatByte(
  { as: Component = "span", value, locale, decimals, unit, className, ...rest },
  ref,
) {
  const formatted = formatByte(value, { locale, decimals, unit })

  return (
    <Component ref={ref} className={className} {...rest}>
      {formatted}
    </Component>
  )
})
