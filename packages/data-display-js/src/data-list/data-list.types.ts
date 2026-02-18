/** Layout direction for the data list items. */
export type DataListOrientation = "horizontal" | "vertical"

/** Controls font size and spacing of the data list. */
export type DataListSize = "sm" | "md" | "lg"

/** Options for generating data list CSS class names. */
export interface DataListClassesOptions {
  /**
   * Layout orientation.
   * - `"vertical"` - term above detail (stacked).
   * - `"horizontal"` - term and detail side-by-side.
   * @default "vertical"
   */
  orientation?: DataListOrientation
  /** Controls font size and spacing. @default "md" */
  size?: DataListSize
  /** Adds separator lines between items. @default false */
  dividers?: boolean
}

/**
 * Object containing BEM class names for each data list sub-element.
 * Uses semantic `<dl>`, `<dt>`, `<dd>` elements.
 */
export interface DataListClassesResult {
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
export interface DataListModuleClassesResult {
  root: string
  item: string
  term: string
  detail: string
}

/** Props for the DataList component. */
export interface DataListProps extends DataListClassesOptions {}
