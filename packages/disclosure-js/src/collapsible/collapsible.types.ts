/** Size preset for the collapsible component */
export type CollapsibleSize = "sm" | "md" | "lg"

/**
 * Options for generating collapsible root CSS class names.
 * Used by both BEM (`collapsibleClasses`) and CSS module (`collapsibleModuleClasses`) builders.
 */
export interface CollapsibleClassesOptions {
  /** Whether the content panel is currently expanded. @default false */
  open?: boolean
  /** Whether the collapsible is disabled and non-interactive. @default false */
  disabled?: boolean
  /** Size preset controlling padding and font-size. @default "md" */
  size?: CollapsibleSize
}

/**
 * Options for generating collapsible trigger CSS class names.
 */
export interface CollapsibleTriggerClassesOptions {
  /** Whether the associated content is currently expanded. @default false */
  open?: boolean
  /** Whether the trigger is disabled and non-interactive. @default false */
  disabled?: boolean
  /** Size preset controlling padding and font-size. @default "md" */
  size?: CollapsibleSize
}

/**
 * Options for generating collapsible content CSS class names.
 */
export interface CollapsibleContentClassesOptions {
  /** Whether the content panel is currently expanded. @default false */
  open?: boolean
  /** Size preset controlling padding. @default "md" */
  size?: CollapsibleSize
}

/**
 * Options for generating collapsible icon CSS class names.
 * The icon is the expand/collapse indicator (typically a chevron).
 */
export interface CollapsibleIconClassesOptions {
  /** Whether the associated content is currently expanded. @default false */
  open?: boolean
}

/**
 * Full props interface for the collapsible component.
 * Extends class options with behavioral and HTML-specific attributes.
 */
export interface CollapsibleProps extends CollapsibleClassesOptions {
  /** Controlled open state. */
  open?: boolean
  /** Initial open state for uncontrolled usage. @default false */
  defaultOpen?: boolean
  /** Callback fired when the open state changes. */
  onOpenChange?: (open: boolean) => void
}
