/** Layout direction of the timeline. */
export type TimelineOrientation = "vertical" | "horizontal"

/**
 * Alignment of timeline content relative to the connector line.
 * - `"start"` - content on one side only.
 * - `"center"` - content and opposite content on both sides.
 * - `"alternate"` - content alternates sides on odd/even items.
 */
export type TimelineAlign = "start" | "center" | "alternate"

/** Options for generating timeline CSS class names. */
export interface TimelineClassesOptions {
  /** Layout direction. @default "vertical" */
  orientation?: TimelineOrientation
  /** Content alignment relative to the connector line. @default "start" */
  align?: TimelineAlign
}

/**
 * Object containing BEM class names for each timeline sub-element.
 * The timeline renders as an `<ol>` with `<li>` items.
 */
export interface TimelineClassesResult {
  /** Class for the `<ol>` root element. */
  root: string
  /** Class for each `<li>` timeline item. */
  item: string
  /** Class for the connector line between dots. */
  connector: string
  /** Class for the dot indicator at each item. */
  dot: string
  /** Class for the main content area. */
  content: string
  /** Class for the opposite content area (visible in center/alternate align). */
  opposite: string
}

/** CSS module result (same shape). */
export interface TimelineModuleClassesResult {
  root: string
  item: string
  connector: string
  dot: string
  content: string
  opposite: string
}

/** Visual style of the timeline dot. */
export type TimelineDotVariant = "filled" | "outline"

/** Color of the timeline dot. */
export type TimelineDotColor = "primary" | "neutral" | "danger" | "success"

/** Options for generating timeline dot class names. */
export interface TimelineDotClassesOptions {
  /** Visual fill style. @default "filled" */
  variant?: TimelineDotVariant
  /** Dot color from the design token palette. @default "primary" */
  color?: TimelineDotColor
}

/** Props for the Timeline component. */
export interface TimelineProps extends TimelineClassesOptions {}

/** Props for the TimelineDot sub-component. */
export interface TimelineDotProps extends TimelineDotClassesOptions {}
