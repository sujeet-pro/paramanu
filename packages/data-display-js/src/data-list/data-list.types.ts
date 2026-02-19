/** Layout direction for the data list items. */
export type DatalistOrientation = "horizontal" | "vertical"

/** Controls font size and spacing of the data list. */
export type DatalistSize = "sm" | "md" | "lg"

/** Options for generating data list CSS class names. */
export interface DatalistClassesOptions {
  /**
   * Layout orientation.
   * - `"vertical"` - term above detail (stacked).
   * - `"horizontal"` - term and detail side-by-side.
   * @default "vertical"
   */
  orientation?: DatalistOrientation
  /** Controls font size and spacing. @default "md" */
  size?: DatalistSize
  /** Adds separator lines between items. @default false */
  dividers?: boolean
}

/**
 * Object containing BEM class names for each data list sub-element.
 * Uses semantic `<dl>`, `<dt>`, `<dd>` elements.
 */
export interface DatalistClassesResult {
  /** Class for the `<dl>` root element. */
  root: string
  /** Class for each item wrapper `<div>` containing a `<dt>` + `<dd>` pair. */
  item: string
  /** Class for the `<dt>` term element. */
  term: string
  /** Class for the `<dd>` detail/description element. */
  detail: string
}

/** CSS module result (same shape). */
export interface DatalistModuleClassesResult {
  root: string
  item: string
  term: string
  detail: string
}

/** Props for the Datalist component. */
export interface DatalistProps extends DatalistClassesOptions {}
