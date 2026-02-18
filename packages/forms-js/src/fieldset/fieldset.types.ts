export type FieldsetVariant = "default" | "card"

export interface FieldsetClassesOptions {
  variant?: FieldsetVariant
  disabled?: boolean
}

export interface FieldsetProps extends FieldsetClassesOptions {
  legend?: string
}
