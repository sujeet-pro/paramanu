import { forwardRef, useState } from "react"
import { imgClasses } from "@paramanu/data-display-js"
import type { ImgProps } from "@paramanu/data-display-js"

export interface ReactImgProps
  extends ImgProps, Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  children?: React.ReactNode
}

export const Img = forwardRef<HTMLElement, ReactImgProps>(function Img(
  { fit, radius, fallback, loading, src, alt, caption, className, children, ...rest },
  ref,
) {
  const [hasError, setHasError] = useState(false)
  const showFallback = fallback && (hasError || !src)
  const classes = imgClasses({ fit, radius, fallback: showFallback, loading })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root

  return (
    <figure ref={ref} className={combinedClassName} {...rest}>
      {loading ? (
        <div className={classes.fallback} aria-busy="true" />
      ) : showFallback ? (
        <div className={classes.fallback}>{children}</div>
      ) : (
        <img className={classes.img} src={src} alt={alt || ""} onError={() => setHasError(true)} />
      )}
      {caption && <figcaption className={classes.caption}>{caption}</figcaption>}
    </figure>
  )
})
