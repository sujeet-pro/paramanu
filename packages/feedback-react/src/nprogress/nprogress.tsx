import { forwardRef, useEffect, useRef, useState } from "react"
import { nprogressClasses, createNProgress } from "@paramanu/feedback-js"

export interface ReactNProgressProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  active?: boolean
  value?: number
}

export const NProgress = forwardRef<HTMLDivElement, ReactNProgressProps>(function NProgress(
  { active, value, className, ...rest },
  ref,
) {
  const classes = nprogressClasses({ active })
  const combinedClassName = className ? `${classes.root} ${className}` : classes.root
  const barWidth = `${(value ?? 0) * 100}%`

  return (
    <div
      ref={ref}
      className={combinedClassName}
      role="progressbar"
      aria-valuenow={Math.round((value ?? 0) * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      {...rest}
    >
      <div className={classes.bar} style={{ width: barWidth }}>
        <div className={classes.peg} />
      </div>
    </div>
  )
})

export interface UseNProgressReturn {
  start: () => void
  done: () => void
  value: number
  active: boolean
  nprogressProps: { active: boolean; value: number }
}

export function useNProgress(): UseNProgressReturn {
  const instanceRef = useRef(createNProgress())
  const [value, setValue] = useState(0)
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (!active) return

    const id = setInterval(() => {
      setValue(instanceRef.current.getValue())
      if (!instanceRef.current.isActive()) {
        setActive(false)
      }
    }, 100)

    return () => clearInterval(id)
  }, [active])

  return {
    start: () => {
      instanceRef.current.start()
      setActive(true)
    },
    done: () => {
      instanceRef.current.done()
      setValue(1)
      setActive(false)
    },
    value,
    active,
    nprogressProps: { active, value },
  }
}
