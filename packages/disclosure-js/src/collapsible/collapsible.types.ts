export type CollapsibleSize = "sm" | "md" | "lg"

export interface CollapsibleClassesOptions {
  open?: boolean
  disabled?: boolean
  size?: CollapsibleSize
}

export interface CollapsibleTriggerClassesOptions {
  open?: boolean
  disabled?: boolean
  size?: CollapsibleSize
}

export interface CollapsibleContentClassesOptions {
  open?: boolean
  size?: CollapsibleSize
}
