import { forwardRef } from "react"
import { bannerClasses } from "@paramanu/feedback-js"
import type { BannerClassesOptions } from "@paramanu/feedback-js"

export interface ReactBannerProps
  extends BannerClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
  onClose?: () => void
}

export const Banner = forwardRef<HTMLDivElement, ReactBannerProps>(function Banner(
  { variant, sticky, dismissible, onClose, className, children, ...rest },
  ref,
) {
  const classes = bannerClasses({ variant, sticky, dismissible })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root

  return (
    <div ref={ref} className={combinedClassName} role="status" {...rest}>
      <div className={classes.content}>{children}</div>
      {dismissible && onClose && (
        <button
          className={classes.close}
          onClick={onClose}
          aria-label="Close"
          type="button"
        >
          {"\u00d7"}
        </button>
      )}
    </div>
  )
})
