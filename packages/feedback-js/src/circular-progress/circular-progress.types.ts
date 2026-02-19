/** Diameter size of the circular progress. */
export type RingProgressSize = "sm" | "md" | "lg" | "xl"

/** Color variant of the circular progress stroke. */
export type RingProgressVariant = "primary" | "success" | "warning" | "danger"

/** Options for generating circular progress class names. */
export interface RingProgressClassesOptions {
  /** Diameter size of the circular progress indicator.
   * @default "md"
   */
  size?: RingProgressSize

  /** Color variant of the progress stroke.
   * @default "primary"
   */
  variant?: RingProgressVariant

  /** Whether the progress is indeterminate (unknown completion).
   * When true, `value` is ignored and a spinning animation plays.
   * @default false
   */
  indeterminate?: boolean

  /** Whether to show a label displaying the percentage inside the circle.
   * @default false
   */
  showLabel?: boolean

  /** Current progress value (0 to max).
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
