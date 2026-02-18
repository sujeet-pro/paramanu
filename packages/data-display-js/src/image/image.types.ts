export type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down"

export type ImageRadius = "none" | "sm" | "md" | "lg" | "xl" | "full"

export interface ImageClassesOptions {
  fit?: ImageFit
  radius?: ImageRadius
  fallback?: boolean
  loading?: boolean
}

export interface ImageClassesResult {
  root: string
  img: string
  fallback: string
  caption: string
}

export interface ImageProps extends ImageClassesOptions {
  src?: string
  alt?: string
  caption?: string
}
