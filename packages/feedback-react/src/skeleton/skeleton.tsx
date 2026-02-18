import { forwardRef } from "react"
import { skeletonClasses } from "@paramanu/feedback-js"
import type { SkeletonClassesOptions } from "@paramanu/feedback-js"

export interface ReactSkeletonProps
  extends SkeletonClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  width?: string | number
  height?: string | number
}

export const Skeleton = forwardRef<HTMLDivElement, ReactSkeletonProps>(function Skeleton(
  { variant, size, width, height, className, style, ...rest },
  ref,
) {
  const classes = skeletonClasses({ variant, size })
  const combinedClassName = className ? `${classes} ${className}` : classes
  const combinedStyle: React.CSSProperties = {
    ...style,
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
  }

  return (
    <div
      ref={ref}
      className={combinedClassName}
      aria-hidden="true"
      style={Object.keys(combinedStyle).length > 0 ? combinedStyle : undefined}
      {...rest}
    />
  )
})
