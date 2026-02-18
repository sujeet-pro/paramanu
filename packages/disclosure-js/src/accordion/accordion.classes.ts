import type {
  AccordionClassesOptions,
  AccordionItemClassesOptions,
  AccordionTriggerClassesOptions,
  AccordionContentClassesOptions,
} from "./accordion.types.js"

const BASE = "pm-accordion"

export function accordionClasses(options: AccordionClassesOptions = {}): string {
  const { variant = "default", size = "md" } = options
  const classes = [BASE, `${BASE}--${variant}`, `${BASE}--${size}`]

  return classes.join(" ")
}

export function accordionModuleClasses(
  classMap: Record<string, string>,
  options: AccordionClassesOptions = {},
): string {
  const { variant = "default", size = "md" } = options

  const classes = [classMap[BASE], classMap[`${BASE}--${variant}`], classMap[`${BASE}--${size}`]]

  return classes.filter(Boolean).join(" ")
}

export function accordionItemClasses(options: AccordionItemClassesOptions = {}): string {
  const { open = false, disabled = false, variant = "default" } = options
  const classes = [`${BASE}__item`, `${BASE}__item--${variant}`]

  if (open) classes.push(`${BASE}__item--open`)
  if (disabled) classes.push(`${BASE}__item--disabled`)

  return classes.join(" ")
}

export function accordionItemModuleClasses(
  classMap: Record<string, string>,
  options: AccordionItemClassesOptions = {},
): string {
  const { open = false, disabled = false, variant = "default" } = options

  const classes = [classMap[`${BASE}__item`], classMap[`${BASE}__item--${variant}`]]

  if (open) classes.push(classMap[`${BASE}__item--open`])
  if (disabled) classes.push(classMap[`${BASE}__item--disabled`])

  return classes.filter(Boolean).join(" ")
}

export function accordionTriggerClasses(options: AccordionTriggerClassesOptions = {}): string {
  const { open = false, disabled = false, size = "md" } = options
  const classes = [`${BASE}__trigger`, `${BASE}__trigger--${size}`]

  if (open) classes.push(`${BASE}__trigger--open`)
  if (disabled) classes.push(`${BASE}__trigger--disabled`)

  return classes.join(" ")
}

export function accordionTriggerModuleClasses(
  classMap: Record<string, string>,
  options: AccordionTriggerClassesOptions = {},
): string {
  const { open = false, disabled = false, size = "md" } = options

  const classes = [classMap[`${BASE}__trigger`], classMap[`${BASE}__trigger--${size}`]]

  if (open) classes.push(classMap[`${BASE}__trigger--open`])
  if (disabled) classes.push(classMap[`${BASE}__trigger--disabled`])

  return classes.filter(Boolean).join(" ")
}

export function accordionContentClasses(options: AccordionContentClassesOptions = {}): string {
  const { open = false, size = "md" } = options
  const classes = [`${BASE}__content`, `${BASE}__content--${size}`]

  if (open) classes.push(`${BASE}__content--open`)

  return classes.join(" ")
}

export function accordionContentModuleClasses(
  classMap: Record<string, string>,
  options: AccordionContentClassesOptions = {},
): string {
  const { open = false, size = "md" } = options

  const classes = [classMap[`${BASE}__content`], classMap[`${BASE}__content--${size}`]]

  if (open) classes.push(classMap[`${BASE}__content--open`])

  return classes.filter(Boolean).join(" ")
}
