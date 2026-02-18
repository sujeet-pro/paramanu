import { forwardRef, Children } from "react"
import { avatarGroupClasses } from "@paramanu/data-display-js"
import type { AvatarGroupClassesOptions } from "@paramanu/data-display-js"

export interface ReactAvatarGroupProps
  extends AvatarGroupClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  max?: number
  children?: React.ReactNode
}

export const AvatarGroup = forwardRef<HTMLDivElement, ReactAvatarGroupProps>(
  function AvatarGroup({ size, spacing, max, className, children, ...rest }, ref) {
    const classes = avatarGroupClasses({ size, spacing })
    const combinedClassName = className ? `${classes.root} ${className}` : classes.root

    const childArray = Children.toArray(children)
    const visibleChildren = max && childArray.length > max ? childArray.slice(0, max) : childArray
    const overflowCount = max && childArray.length > max ? childArray.length - max : 0

    return (
      <div ref={ref} className={combinedClassName} role="group" aria-label="Avatars" {...rest}>
        {visibleChildren}
        {overflowCount > 0 && <span className={classes.overflow}>+{overflowCount}</span>}
      </div>
    )
  },
)
