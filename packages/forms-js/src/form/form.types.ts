export type FormLayout = "vertical" | "horizontal" | "inline"

export type FormGap = "sm" | "md" | "lg"

export interface FormClassesOptions {
  layout?: FormLayout
  gap?: FormGap
}

export interface FormProps extends FormClassesOptions {}
