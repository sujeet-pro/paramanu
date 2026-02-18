export type EmptyStateSize = "sm" | "md" | "lg"

export interface EmptyStateClassesOptions {
  size?: EmptyStateSize
  bordered?: boolean
}

export interface EmptyStateClassesResult {
  root: string
  icon: string
  heading: string
  description: string
  actions: string
}

export interface EmptyStateModuleClassesResult {
  root: string
  icon: string
  heading: string
  description: string
  actions: string
}

export interface EmptyStateProps extends EmptyStateClassesOptions {}
