/** Predefined aspect ratio values. */
export type AspectValue = "1/1" | "2/3" | "3/2" | "4/3" | "3/4" | "16/9" | "9/16" | "21/9"

export interface AspectClassesOptions {
  /** Aspect ratio. Defaults to "16/9". */
  ratio?: AspectValue
}

export interface AspectProps extends AspectClassesOptions {}
