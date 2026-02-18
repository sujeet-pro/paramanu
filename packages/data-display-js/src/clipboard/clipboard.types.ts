export type ClipboardSize = "sm" | "md" | "lg"

export interface ClipboardClassesOptions {
  size?: ClipboardSize
  copied?: boolean
}

export interface ClipboardProps extends ClipboardClassesOptions {}
