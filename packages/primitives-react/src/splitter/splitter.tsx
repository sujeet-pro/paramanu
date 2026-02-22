import { forwardRef, createContext, useContext, useRef, useEffect } from "react"
import {
  splitterClasses,
  splitterPanelClasses,
  splitterHandleClasses,
  createSplitter,
} from "@paramanu/primitives-js"
import type {
  SplitterProps,
  SplitterPanelProps,
  SplitterHandleProps,
  SplitterOrientation,
} from "@paramanu/primitives-js"

interface SplitterContextValue {
  orientation: SplitterOrientation
}

const SplitterContext = createContext<SplitterContextValue>({
  orientation: "horizontal",
})

function useSplitterContext() {
  return useContext(SplitterContext)
}

// --- Splitter (container) ---

export interface ReactSplitterProps
  extends SplitterProps, Omit<React.HTMLAttributes<HTMLDivElement>, "children"> {
  className?: string
  children?: React.ReactNode
  onResize?: (sizes: number[]) => void
}

export const Splitter = forwardRef<HTMLDivElement, ReactSplitterProps>(function Splitter(
  { orientation = "horizontal", disabled, className, children, onResize, ...rest },
  ref,
) {
  const classes = splitterClasses({ orientation, disabled })
  const combinedClassName = className ? `${classes} ${className}` : classes
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el || disabled) return

    const instance = createSplitter(el, { orientation, onResize })
    return () => {
      instance.destroy()
    }
  }, [orientation, disabled, onResize])

  return (
    <SplitterContext.Provider value={{ orientation }}>
      <div
        ref={(node) => {
          containerRef.current = node
          if (typeof ref === "function") ref(node)
          else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node
        }}
        className={combinedClassName}
        {...rest}
      >
        {children}
      </div>
    </SplitterContext.Provider>
  )
})

// --- SplitterPanel ---

export interface ReactSplitterPanelProps
  extends SplitterPanelProps, React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
}

export const SplitterPanel = forwardRef<HTMLDivElement, ReactSplitterPanelProps>(
  function SplitterPanel(
    { collapsed, collapsible, defaultSize, className, style, children, ...rest },
    ref,
  ) {
    const { orientation } = useSplitterContext()
    const classes = splitterPanelClasses({ collapsed, collapsible })
    const combinedClassName = className ? `${classes} ${className}` : classes

    const sizeStyle =
      defaultSize !== undefined
        ? {
            ...style,
            [orientation === "horizontal" ? "width" : "height"]: `${defaultSize}%`,
          }
        : style

    return (
      <div ref={ref} className={combinedClassName} style={sizeStyle} {...rest}>
        {children}
      </div>
    )
  },
)

// --- SplitterHandle ---

export interface ReactSplitterHandleProps
  extends SplitterHandleProps, React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children?: React.ReactNode
}

export const SplitterHandle = forwardRef<HTMLDivElement, ReactSplitterHandleProps>(
  function SplitterHandle({ active, className, children, ...rest }, ref) {
    const { orientation } = useSplitterContext()
    const classes = splitterHandleClasses({ active, orientation })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div
        ref={ref}
        role="separator"
        tabIndex={0}
        aria-valuenow={50}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-orientation={orientation}
        className={combinedClassName}
        {...rest}
      >
        {children}
      </div>
    )
  },
)
