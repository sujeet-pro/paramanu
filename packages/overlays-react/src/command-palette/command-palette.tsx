import { forwardRef, useEffect } from "react"
import {
  cmdPaletteClasses,
  commandPaletteInputClasses,
  commandPaletteListClasses,
  cmdPaletteItemClasses,
  commandPaletteGroupClasses,
  commandPaletteEmptyClasses,
} from "@paramanu/overlays-js"
import type { CmdPaletteItemClassesOptions } from "@paramanu/overlays-js"

export interface ReactCmdPaletteProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onClose?: () => void
  children?: React.ReactNode
}

export const CmdPalette = forwardRef<HTMLDivElement, ReactCmdPaletteProps>(function CmdPalette(
  { open = false, onClose, className, children, ...rest },
  ref,
) {
  const classes = cmdPaletteClasses()
  const combinedClassName = className ? `${classes} ${className}` : classes

  useEffect(() => {
    if (!open) return
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose?.()
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [open, onClose])

  if (!open) return null

  return (
    <div ref={ref} className={combinedClassName} {...rest}>
      {children}
    </div>
  )
})

export interface ReactCmdPaletteInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const CmdPaletteInput = forwardRef<HTMLInputElement, ReactCmdPaletteInputProps>(
  function CmdPaletteInput({ className, ...rest }, ref) {
    const classes = commandPaletteInputClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <input
        ref={ref}
        role="combobox"
        aria-expanded="true"
        aria-autocomplete="list"
        className={combinedClassName}
        {...rest}
      />
    )
  },
)

export interface ReactCmdPaletteListProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CmdPaletteList = forwardRef<HTMLDivElement, ReactCmdPaletteListProps>(
  function CmdPaletteList({ className, children, ...rest }, ref) {
    const classes = commandPaletteListClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} role="listbox" className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactCmdPaletteItemProps
  extends CmdPaletteItemClassesOptions, React.HTMLAttributes<HTMLDivElement> {
  value?: string
  children?: React.ReactNode
}

export const CmdPaletteItem = forwardRef<HTMLDivElement, ReactCmdPaletteItemProps>(
  function CmdPaletteItem({ active, value, className, children, ...rest }, ref) {
    const classes = cmdPaletteItemClasses({ active })
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div
        ref={ref}
        role="option"
        aria-selected={active || undefined}
        className={combinedClassName}
        data-value={value}
        {...rest}
      >
        {children}
      </div>
    )
  },
)

export interface ReactCmdPaletteGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CmdPaletteGroup = forwardRef<HTMLDivElement, ReactCmdPaletteGroupProps>(
  function CmdPaletteGroup({ className, children, ...rest }, ref) {
    const classes = commandPaletteGroupClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} role="group" className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactCmdPaletteEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CmdPaletteEmpty = forwardRef<HTMLDivElement, ReactCmdPaletteEmptyProps>(
  function CmdPaletteEmpty({ className, children, ...rest }, ref) {
    const classes = commandPaletteEmptyClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
