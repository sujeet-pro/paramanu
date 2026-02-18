/** Predefined aspect ratio values. */
export type AspectRatioValue = "1/1" | "2/3" | "3/2" | "4/3" | "3/4" | "16/9" | "9/16" | "21/9"

export interface AspectRatioClassesOptions {
  /** Aspect ratio. Defaults to "16/9". */
  ratio?: AspectRatioValue
}

export interface AspectRatioProps extends AspectRatioClassesOptions {}
