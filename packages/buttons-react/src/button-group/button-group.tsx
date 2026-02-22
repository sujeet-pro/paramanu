import { forwardRef } from "react"
import { btnGroupClasses } from "@paramanu/buttons-js"
import type { BtnGroupClassesOptions } from "@paramanu/buttons-js"

export interface ReactBtnGroupProps
  extends BtnGroupClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  /** Btn elements to render inside the group. */
  children?: React.ReactNode
}

/**
 * Groups multiple buttons together with consistent spacing and optional
 * attached styling that merges border radii.
 *
 * @example
 * ```tsx
 * <BtnGroup attached>
 *   <Btn variant="secondary">Left</Btn>
 *   <Btn variant="secondary">Center</Btn>
 *   <Btn variant="secondary">Right</Btn>
 * </BtnGroup>
 * ```
 */
export const BtnGroup = forwardRef<HTMLDivElement, ReactBtnGroupProps>(function BtnGroup(
  { orientation, attached, fullWidth, className, children, role = "group", ...rest },
  ref,
) {
  const classes = btnGroupClasses({ orientation, attached, fullWidth })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} role={role} {...rest}>
      {children}
    </div>
  )
})
