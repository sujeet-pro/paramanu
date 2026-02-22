import { forwardRef } from "react"
import {
  carouselClasses,
  carouselSlideClasses,
  carouselControlClasses,
  carouselIndicatorClasses,
} from "@paramanu/disclosure-js"
import type {
  CarouselClassesOptions,
  CarouselSlideClassesOptions,
  CarouselControlClassesOptions,
  CarouselIndicatorClassesOptions,
} from "@paramanu/disclosure-js"

export interface ReactCarouselProps
  extends CarouselClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Carousel = forwardRef<HTMLDivElement, ReactCarouselProps>(function Carousel(
  { orientation, size, className, children, ...rest },
  ref,
) {
  const classes = carouselClasses({ orientation, size })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div
      ref={ref}
      role="region"
      aria-roledescription="carousel"
      className={combinedClassName}
      {...rest}
    >
      {children}
    </div>
  )
})

export interface ReactCarouselSlideProps
  extends CarouselSlideClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  index?: number
  total?: number
  children?: React.ReactNode
}

export const CarouselSlide = forwardRef<HTMLDivElement, ReactCarouselSlideProps>(
  function CarouselSlide({ active, index, total, className, children, ...rest }, ref) {
    const classes = carouselSlideClasses({ active })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div
        ref={ref}
        role="group"
        aria-roledescription="slide"
        aria-label={
          index !== undefined && total !== undefined ? `Slide ${index + 1} of ${total}` : undefined
        }
        className={combinedClassName}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

export interface ReactCarouselControlProps
  extends
    CarouselControlClassesOptions,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  children?: React.ReactNode
}

export const CarouselControl = forwardRef<HTMLButtonElement, ReactCarouselControlProps>(
  function CarouselControl({ direction, disabled, className, children, ...rest }, ref) {
    const classes = carouselControlClasses({ direction, disabled })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <button
        ref={ref}
        type="button"
        className={combinedClassName}
        disabled={disabled}
        aria-disabled={disabled || undefined}
        aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
        {...rest}
      >
        {children ?? (direction === "prev" ? "\u2039" : "\u203a")}
      </button>
    )
  },
)

export interface ReactCarouselIndicatorProps
  extends
    CarouselIndicatorClassesOptions,
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  index?: number
  children?: React.ReactNode
}

export const CarouselIndicator = forwardRef<HTMLButtonElement, ReactCarouselIndicatorProps>(
  function CarouselIndicator({ active, index, className, children, ...rest }, ref) {
    const classes = carouselIndicatorClasses({ active })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <button
        ref={ref}
        type="button"
        role="tab"
        aria-selected={active ?? false}
        aria-label={index !== undefined ? `Go to slide ${index + 1}` : undefined}
        className={combinedClassName}
        {...rest}
      >
        {children}
      </button>
    )
  },
)
