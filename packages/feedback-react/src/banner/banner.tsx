import { forwardRef } from "react"
import { bannerClasses } from "@paramanu/feedback-js"
import type { BannerClassesOptions } from "@paramanu/feedback-js"

export interface ReactBannerProps
  extends BannerClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  /** Icon rendered before the content. */
  icon?: React.ReactNode
  /** Action buttons or links rendered after the content. */
  actions?: React.ReactNode
  /** Callback invoked when the close button is clicked. */
  onClose?: () => void
  children?: React.ReactNode
}

/**
 * Banner displays a full-width message at the top or bottom of the page.
 */
export const Banner = forwardRef<HTMLDivElement, ReactBannerProps>(function Banner(
  { variant, sticky, dismissible, position, icon, actions, onClose, className, children, ...rest },
  ref,
) {
  const classes = bannerClasses({ variant, sticky, dismissible, position })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root

  return (
    <div ref={ref} className={combinedClassName} role="status" {...rest}>
      {icon && <div className={classes.icon}>{icon}</div>}
      <div className={classes.content}>{children}</div>
      {actions && <div className={classes.actions}>{actions}</div>}
      {dismissible && onClose && (
        <button className={classes.close} onClick={onClose} aria-label="Close" type="button">
          {"\u00d7"}
        </button>
      )}
    </div>
  )
})
