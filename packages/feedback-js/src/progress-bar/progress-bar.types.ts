/** Height size of the progress bar track. */
export type ProgressBarSize = "xs" | "sm" | "md" | "lg"

/** Color variant of the progress bar fill. */
export type ProgressBarVariant = "primary" | "success" | "warning" | "danger"

/** Options for generating progress bar class names. */
export interface ProgressBarClassesOptions {
  /** Height size of the progress bar.
   * @default "md"
   */
  size?: ProgressBarSize

  /** Color variant of the filled portion.
   * @default "primary"
   */
  variant?: ProgressBarVariant

  /** Whether to render a striped pattern on the fill.
   * @default false
   */
  striped?: boolean

  /** Whether the striped pattern should animate (requires `striped` to be true).
   * @default false
   */
  animated?: boolean

  /** Whether the progress is indeterminate (unknown completion).
   * When true, `value` is ignored and a looping animation plays.
   * @default false
   */
  indeterminate?: boolean

  /** Whether to show a label displaying the percentage.
   * @default false
   */
  showLabel?: boolean

  /** Current progress value.
   * @default 0
   */
  value?: number

  /** Minimum progress value.
   * @default 0
   */
  min?: number

  /** Maximum progress value.
   * @default 100
   */
  max?: number
}
