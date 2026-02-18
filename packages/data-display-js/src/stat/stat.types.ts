export type StatSize = "sm" | "md" | "lg"

export type StatAlign = "start" | "center" | "end"

export type StatTrend = "up" | "down"

export interface StatClassesOptions {
  size?: StatSize
  align?: StatAlign
}

export interface StatHelpTextClassesOptions {
  trend?: StatTrend
}

export interface StatClassesResult {
  root: string
  label: string
  value: string
  helpText: string
  arrow: string
}
