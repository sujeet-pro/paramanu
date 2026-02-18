import type { CodeClassesOptions } from "./code.types.js"

const INLINE_BASE = "pm-code"
const BLOCK_BASE = "pm-code-block"

export function codeClasses(options: CodeClassesOptions = {}): string {
  const {
    block = false,
    size,
    variant = "default",
    color,
    withLineNumbers = false,
    withCopyButton = false,
    language,
  } = options
  const base = block ? BLOCK_BASE : INLINE_BASE
  const classes = [base]

  if (size) classes.push(`${base}--size-${size}`)
  if (variant !== "default") classes.push(`${base}--${variant}`)
  if (color) classes.push(`${base}--color-${color}`)
  if (block && withLineNumbers) classes.push(`${BLOCK_BASE}--line-numbers`)
  if (block && withCopyButton) classes.push(`${BLOCK_BASE}--copy`)
  if (language) classes.push(`${base}--lang-${language}`)

  return classes.join(" ")
}

export function codeModuleClasses(
  classMap: Record<string, string>,
  options: CodeClassesOptions = {},
): string {
  const {
    block = false,
    size,
    variant = "default",
    color,
    withLineNumbers = false,
    withCopyButton = false,
    language,
  } = options
  const base = block ? "pm-code-block" : "pm-code"
  const classes = [classMap[base]]

  if (size) classes.push(classMap[`${base}--size-${size}`])
  if (variant !== "default") classes.push(classMap[`${base}--${variant}`])
  if (color) classes.push(classMap[`${base}--color-${color}`])
  if (block && withLineNumbers) classes.push(classMap["pm-code-block--line-numbers"])
  if (block && withCopyButton) classes.push(classMap["pm-code-block--copy"])
  if (language) classes.push(classMap[`${base}--lang-${language}`])

  return classes.filter(Boolean).join(" ")
}
