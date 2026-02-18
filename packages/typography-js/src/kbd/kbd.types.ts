/** Size presets for the keyboard key indicator */
export type KbdSize = "xs" | "sm" | "md" | "lg"

/** Visual variant for keyboard key appearance */
export type KbdVariant = "default" | "outline" | "subtle"

export interface KbdClassesOptions {
  /** Size of the keyboard key element. Defaults to "md". */
  size?: KbdSize
  /** Visual variant. "default" shows a raised key, "outline" shows only a border, "subtle" shows a minimal style. Defaults to "default". */
  variant?: KbdVariant
}
