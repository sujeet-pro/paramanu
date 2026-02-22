import { forwardRef } from "react"
import { embedClasses } from "@paramanu/data-display-js"
import type { EmbedProps } from "@paramanu/data-display-js"

export interface ReactEmbedProps
  extends EmbedProps, Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  src: string
  title: string
  children?: React.ReactNode
}

export const Embed = forwardRef<HTMLDivElement, ReactEmbedProps>(function Embed(
  { ratio, fullWidth, src, title, className, children, ...rest },
  ref,
) {
  const classes = embedClasses({ ratio, fullWidth })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      <iframe className={classes.iframe} src={src} title={title} />
      {children}
    </div>
  )
})
