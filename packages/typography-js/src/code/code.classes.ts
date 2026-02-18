import type { CodeClassesOptions } from "./code.types.js"

const INLINE_BASE = "pm-code"
const BLOCK_BASE = "pm-code-block"

export function codeClasses(options: CodeClassesOptions = {}): string {
  const { block = false, size } = options
  const base = block ? BLOCK_BASE : INLINE_BASE
  const classes = [base]

  if (size) classes.push(`${base}--size-${size}`)

  return classes.join(" ")
}

export function codeModuleClasses(
  classMap: Record<string, string>,
  options: CodeClassesOptions = {},
): string {
  const { block = false, size } = options
  const base = block ? "pm-code-block" : "pm-code"
  const classes = [classMap[base]]

  if (size) classes.push(classMap[`${base}--size-${size}`])

  return classes.filter(Boolean).join(" ")
}
