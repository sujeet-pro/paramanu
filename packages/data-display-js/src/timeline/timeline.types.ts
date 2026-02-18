export type TimelineOrientation = "vertical" | "horizontal"

export type TimelineAlign = "start" | "center" | "alternate"

export interface TimelineClassesOptions {
  orientation?: TimelineOrientation
  align?: TimelineAlign
}

export interface TimelineClassesResult {
  root: string
  item: string
  connector: string
  dot: string
  content: string
  opposite: string
}

export interface TimelineModuleClassesResult {
  root: string
  item: string
  connector: string
  dot: string
  content: string
  opposite: string
}

export type TimelineDotVariant = "filled" | "outline"

export type TimelineDotColor = "primary" | "neutral" | "danger" | "success"

export interface TimelineDotClassesOptions {
  variant?: TimelineDotVariant
  color?: TimelineDotColor
}

export interface TimelineProps extends TimelineClassesOptions {}

export interface TimelineDotProps extends TimelineDotClassesOptions {}
