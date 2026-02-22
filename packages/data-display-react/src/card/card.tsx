import { forwardRef } from "react"
import { cardClasses, cardMediaClasses } from "@paramanu/data-display-js"
import type { CardProps, CardMediaClassesOptions } from "@paramanu/data-display-js"

/** Props for the Card root component. Renders as an `<article>` or `<div>`. */
export interface ReactCardProps extends CardProps, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Card = forwardRef<HTMLDivElement, ReactCardProps>(function Card(
  { variant, size, interactive, fullWidth, horizontal, className, children, ...rest },
  ref,
) {
  const classes = cardClasses({ variant, size, interactive, fullWidth, horizontal })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

/** Props for the CardHeader sub-component. */
export interface ReactCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CardHeader = forwardRef<HTMLDivElement, ReactCardHeaderProps>(function CardHeader(
  { className, children, ...rest },
  ref,
) {
  const classes = cardClasses()
  const combinedClassName = className ? `${classes.header} ${className}` : classes.header

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

/** Props for the CardBody sub-component. */
export interface ReactCardBodyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CardBody = forwardRef<HTMLDivElement, ReactCardBodyProps>(function CardBody(
  { className, children, ...rest },
  ref,
) {
  const classes = cardClasses()
  const combinedClassName = className ? `${classes.body} ${className}` : classes.body

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

/** Props for the CardFooter sub-component. */
export interface ReactCardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CardFooter = forwardRef<HTMLDivElement, ReactCardFooterProps>(function CardFooter(
  { className, children, ...rest },
  ref,
) {
  const classes = cardClasses()
  const combinedClassName = className ? `${classes.footer} ${className}` : classes.footer

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

/** Props for the CardMedia sub-component. */
export interface ReactCardMediaProps
  extends CardMediaClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CardMedia = forwardRef<HTMLDivElement, ReactCardMediaProps>(function CardMedia(
  { position, className, children, ...rest },
  ref,
) {
  const classes = cardMediaClasses({ position })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
