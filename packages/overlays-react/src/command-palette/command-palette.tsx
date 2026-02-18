import { forwardRef, useEffect } from "react"
import {
  commandPaletteClasses,
  commandPaletteInputClasses,
  commandPaletteListClasses,
  commandPaletteItemClasses,
  commandPaletteGroupClasses,
  commandPaletteEmptyClasses,
} from "@paramanu/overlays-js"
import type { CommandPaletteItemClassesOptions } from "@paramanu/overlays-js"

export interface ReactCommandPaletteProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onClose?: () => void
  children?: React.ReactNode
}

export const CommandPalette = forwardRef<HTMLDivElement, ReactCommandPaletteProps>(
  function CommandPalette({ open = false, onClose, className, children, ...rest }, ref) {
    const classes = commandPaletteClasses()
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
  },
)

export interface ReactCommandPaletteInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export const CommandPaletteInput = forwardRef<HTMLInputElement, ReactCommandPaletteInputProps>(
  function CommandPaletteInput({ className, ...rest }, ref) {
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

export interface ReactCommandPaletteListProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CommandPaletteList = forwardRef<HTMLDivElement, ReactCommandPaletteListProps>(
  function CommandPaletteList({ className, children, ...rest }, ref) {
    const classes = commandPaletteListClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} role="listbox" className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactCommandPaletteItemProps
  extends CommandPaletteItemClassesOptions,
    React.HTMLAttributes<HTMLDivElement> {
  value?: string
  children?: React.ReactNode
}

export const CommandPaletteItem = forwardRef<HTMLDivElement, ReactCommandPaletteItemProps>(
  function CommandPaletteItem({ active, value, className, children, ...rest }, ref) {
    const classes = commandPaletteItemClasses({ active })
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

export interface ReactCommandPaletteGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CommandPaletteGroup = forwardRef<HTMLDivElement, ReactCommandPaletteGroupProps>(
  function CommandPaletteGroup({ className, children, ...rest }, ref) {
    const classes = commandPaletteGroupClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} role="group" className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)

export interface ReactCommandPaletteEmptyProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode
}

export const CommandPaletteEmpty = forwardRef<HTMLDivElement, ReactCommandPaletteEmptyProps>(
  function CommandPaletteEmpty({ className, children, ...rest }, ref) {
    const classes = commandPaletteEmptyClasses()
    const combinedClassName = className ? `${classes} ${className}` : classes

    return (
      <div ref={ref} className={combinedClassName} {...rest}>
        {children}
      </div>
    )
  },
)
