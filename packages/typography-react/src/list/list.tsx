import { forwardRef } from "react"
import { listClasses } from "@paramanu/typography-js"
import type { ListClassesOptions } from "@paramanu/typography-js"

export interface ReactListProps
  extends ListClassesOptions,
    React.HTMLAttributes<HTMLUListElement | HTMLOListElement> {
  children?: React.ReactNode
}

export const List = forwardRef<HTMLUListElement | HTMLOListElement, ReactListProps>(function List(
  { type = "unordered", styleType, spacing, unstyled, className, children, ...rest },
  ref,
) {
  const classes = listClasses({ type, styleType, spacing, unstyled })
  const combinedClassName = className ? `${classes} ${className}` : classes
  const Tag = type === "ordered" ? "ol" : "ul"

  return (
    <Tag ref={ref as React.Ref<never>} className={combinedClassName} {...rest}>
      {children}
    </Tag>
  )
})
