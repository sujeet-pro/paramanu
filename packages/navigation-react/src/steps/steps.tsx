import { forwardRef } from "react"
import {
  stepsClasses,
  stepClasses,
  stepIndicatorClasses,
  stepConnectorClasses,
  stepContentClasses,
} from "@paramanu/navigation-js"
import type {
  StepsClassesOptions,
  StepClassesOptions,
  StepIndicatorClassesOptions,
  StepConnectorClassesOptions,
} from "@paramanu/navigation-js"

export interface ReactStepsProps extends StepsClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Steps = forwardRef<HTMLDivElement, ReactStepsProps>(function Steps(
  { size, orientation, className, children, ...rest },
  ref,
) {
  const classes = stepsClasses({ size, orientation })
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} role="list" aria-label="Progress" className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactStepProps extends StepClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const Step = forwardRef<HTMLDivElement, ReactStepProps>(function Step(
  { status, className, children, ...rest },
  ref,
) {
  const classes = stepClasses({ status })
  const combinedClassName = className ? `${classes} ${className}` : classes
  const ariaCurrent = status === "active" ? "step" : undefined

  return (
    <div ref={ref} className={combinedClassName} aria-current={ariaCurrent || undefined} {...rest}>
      {children}
    </div>
  )
})

export interface ReactStepIndicatorProps
  extends StepIndicatorClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const StepIndicator = forwardRef<HTMLDivElement, ReactStepIndicatorProps>(
  function StepIndicator({ status, className, children, ...rest }, ref) {
    const classes = stepIndicatorClasses({ status })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} className={combinedClassName} aria-hidden="true" {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactStepConnectorProps
  extends StepConnectorClassesOptions, React.HTMLAttributes<HTMLDivElement> {}

export const StepConnector = forwardRef<HTMLDivElement, ReactStepConnectorProps>(
  function StepConnector({ status, className, ...rest }, ref) {
    const classes = stepConnectorClasses({ status })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return <div ref={ref} className={combinedClassName} role="presentation" {...rest} />
  },
)

export interface ReactStepContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const StepContent = forwardRef<HTMLDivElement, ReactStepContentProps>(function StepContent(
  { className, children, ...rest },
  ref,
) {
  const classes = stepContentClasses()
  const combinedClassName = className ? `${classes} ${className}` : classes

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})
