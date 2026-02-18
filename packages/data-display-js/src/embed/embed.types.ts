export type EmbedRatio = "1/1" | "4/3" | "16/9" | "21/9"

export interface EmbedClassesOptions {
  ratio?: EmbedRatio
  fullWidth?: boolean
}

export interface EmbedClassesResult {
  root: string
  iframe: string
}

export interface EmbedModuleClassesResult {
  root: string
  iframe: string
}

export interface EmbedProps extends EmbedClassesOptions {}
