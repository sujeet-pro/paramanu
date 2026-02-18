/** Size controlling font sizes and spacing of the stat. */
export type StatSize = "sm" | "md" | "lg"

/** Text alignment of the stat content. */
export type StatAlign = "start" | "center" | "end"

/** Trend direction indicator. */
export type StatTrend = "up" | "down"

/** Options for generating stat CSS class names. */
export interface StatClassesOptions {
  /** Controls font sizes and spacing. @default "md" */
  size?: StatSize
  /** Text alignment of the stat content. @default "start" */
  align?: StatAlign
}

/** Options for generating stat help text class names. */
export interface StatHelpTextClassesOptions {
  /** Trend direction that colors the help text green (up) or red (down). */
  trend?: StatTrend
}

/**
 * Object containing BEM class names for each stat sub-element.
 */
export interface StatClassesResult {
  /** Class for the outermost `<div>` wrapper. */
  root: string
  /** Class for the label text (e.g. "Total Revenue"). */
  label: string
  /** Class for the primary value display (e.g. "$45,231"). */
  value: string
  /** Class for the help/trend text below the value. */
  helpText: string
  /** Class for the trend arrow indicator. */
  arrow: string
}

/** Props for the Stat component. */
export interface StatProps extends StatClassesOptions {}
