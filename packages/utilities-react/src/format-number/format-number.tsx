import { forwardRef } from "react"
import { formatNumber } from "@paramanu/utilities-js"
import type { FormatNumberOptions } from "@paramanu/utilities-js"

export interface ReactFormatNumberProps
  extends FormatNumberOptions, Omit<React.HTMLAttributes<HTMLElement>, "style"> {
  as?: React.ElementType
  value: number
  style?: FormatNumberOptions["style"]
}

export const FormatNumber = forwardRef<HTMLElement, ReactFormatNumberProps>(function FormatNumber(
  {
    as: Component = "span",
    value,
    locale,
    style,
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
    notation,
    className,
    ...rest
  },
  ref,
) {
  const formatted = formatNumber(value, {
    locale,
    style,
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
    notation,
  })

  return (
    <Component ref={ref} className={className} {...rest}>
      {formatted}
    </Component>
  )
})
