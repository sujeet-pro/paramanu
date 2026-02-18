import { forwardRef } from "react"
import { buttonGroupClasses } from "@paramanu/buttons-js"
import type { ButtonGroupClassesOptions } from "@paramanu/buttons-js"

export interface ReactButtonGroupProps
  extends ButtonGroupClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  /** Button elements to render inside the group. */
  children?: React.ReactNode
}

/**
 * Groups multiple buttons together with consistent spacing and optional
 * attached styling that merges border radii.
 *
 * @example
 * ```tsx
 * <ButtonGroup attached>
 *   <Button variant="secondary">Left</Button>
 *   <Button variant="secondary">Center</Button>
 *   <Button variant="secondary">Right</Button>
 * </ButtonGroup>
 * ```
 */
export const ButtonGroup = forwardRef<HTMLDivElement, ReactButtonGroupProps>(function ButtonGroup(
  { orientation, attached, fullWidth, className, children, role = "group", ...rest },
  ref,
) {
  const classes = buttonGroupClasses({ orientation, attached, fullWidth })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} role={role} {...rest}>
      {children}
    </div>
  )
})
