import { forwardRef } from "react"
import { avatarClasses } from "@paramanu/data-display-js"
import type { AvatarProps } from "@paramanu/data-display-js"

export interface ReactAvatarProps
  extends AvatarProps, Omit<React.HTMLAttributes<HTMLSpanElement>, "color"> {
  children?: React.ReactNode
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
}

export const Avatar = forwardRef<HTMLSpanElement, ReactAvatarProps>(function Avatar(
  { size, variant, color, src, alt, name, className, children, ...rest },
  ref,
) {
  const classes = avatarClasses({ size, variant, color })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root
  const label = name || alt

  return (
    <span
      ref={ref}
      className={combinedClassName}
      role="img"
      aria-label={label || undefined}
      {...rest}
    >
      {src ? (
        <img className={classes.image} src={src} alt={alt || ""} />
      ) : (
        <span className={classes.fallback}>{name ? getInitials(name) : children}</span>
      )}
    </span>
  )
})
