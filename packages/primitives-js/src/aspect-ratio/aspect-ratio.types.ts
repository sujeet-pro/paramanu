export type AspectRatioValue = "1/1" | "4/3" | "16/9" | "21/9" | "3/4" | "9/16"

export interface AspectRatioClassesOptions {
  ratio?: AspectRatioValue
}

export interface AspectRatioProps extends AspectRatioClassesOptions {}
