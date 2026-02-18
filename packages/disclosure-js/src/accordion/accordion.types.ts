/** Visual style variant for the accordion */
export type AccordionVariant = "default" | "bordered" | "separated" | "filled"

/** Size preset for the accordion */
export type AccordionSize = "sm" | "md" | "lg"

/** Controls how many items can be open simultaneously */
export type AccordionType = "single" | "multiple"

/**
 * Options for generating accordion root CSS class names.
 * Used by both BEM (`accordionClasses`) and CSS module (`accordionModuleClasses`) builders.
 */
export interface AccordionClassesOptions {
  /** Visual style variant. @default "default" */
  variant?: AccordionVariant
  /** Size preset controlling padding and font-size. @default "md" */
  size?: AccordionSize
}

/**
 * Options for generating accordion item CSS class names.
 */
export interface AccordionItemClassesOptions {
  /** Whether the item is currently expanded. @default false */
  open?: boolean
  /** Whether the item is disabled and non-interactive. @default false */
  disabled?: boolean
  /** Visual style variant inherited from the accordion root. @default "default" */
  variant?: AccordionVariant
}

/**
 * Options for generating accordion trigger CSS class names.
 */
export interface AccordionTriggerClassesOptions {
  /** Whether the associated content is currently expanded. @default false */
  open?: boolean
  /** Whether the trigger is disabled and non-interactive. @default false */
  disabled?: boolean
  /** Size preset controlling padding and font-size. @default "md" */
  size?: AccordionSize
}

/**
 * Options for generating accordion content CSS class names.
 */
export interface AccordionContentClassesOptions {
  /** Whether the content panel is currently expanded. @default false */
  open?: boolean
  /** Size preset controlling padding. @default "md" */
  size?: AccordionSize
}

/**
 * Options for generating accordion icon CSS class names.
 * The icon is the expand/collapse indicator (typically a chevron).
 */
export interface AccordionIconClassesOptions {
  /** Whether the associated content is currently expanded. @default false */
  open?: boolean
}

/**
 * Full props interface for the accordion component.
 * Extends class options with behavioral and HTML-specific attributes.
 */
export interface AccordionProps extends AccordionClassesOptions {
  /** Controls whether one or many items can be open simultaneously. @default "single" */
  type?: AccordionType
  /** Array of currently open item values (controlled). */
  value?: string[]
  /** Array of initially open item values (uncontrolled). @default [] */
  defaultValue?: string[]
  /** Whether all panels can be collapsed when type is "single". @default false */
  collapsible?: boolean
  /** Callback fired when the set of open items changes. */
  onValueChange?: (value: string[]) => void
}

/**
 * Full props interface for an accordion item.
 */
export interface AccordionItemProps {
  /** Unique identifier for this item within the accordion. */
  value: string
  /** Whether this item is disabled and non-interactive. @default false */
  disabled?: boolean
}
