import { forwardRef, useState } from "react"
import { imageClasses } from "@paramanu/data-display-js"
import type { ImageProps } from "@paramanu/data-display-js"

export interface ReactImageProps
  extends ImageProps,
    Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  children?: React.ReactNode
}

export const Image = forwardRef<HTMLElement, ReactImageProps>(function Image(
  { fit, radius, fallback, loading, src, alt, caption, className, children, ...rest },
  ref,
) {
  const [hasError, setHasError] = useState(false)
  const showFallback = fallback && (hasError || !src)
  const classes = imageClasses({ fit, radius, fallback: showFallback, loading })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root

  return (
    <figure ref={ref} className={combinedClassName} {...rest}>
      {loading ? (
        <div className={classes.fallback} aria-busy="true" />
      ) : showFallback ? (
        <div className={classes.fallback}>{children}</div>
      ) : (
        <img
          className={classes.img}
          src={src}
          alt={alt || ""}
          onError={() => setHasError(true)}
        />
      )}
      {caption && <figcaption className={classes.caption}>{caption}</figcaption>}
    </figure>
  )
})
