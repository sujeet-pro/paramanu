import { writeFileSync, mkdirSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcDir = resolve(__dirname, "src")

function writeComponent(name, files) {
  const dir = resolve(srcDir, name)
  mkdirSync(dir, { recursive: true })
  for (const [filename, content] of Object.entries(files)) {
    writeFileSync(resolve(dir, filename), content)
    console.log(`  -> src/${name}/${filename}`)
  }
}

// ============================================================
// COMPONENT 3: Number Input
// ============================================================
writeComponent("number-input", {
  "number-input.types.ts": `import type { FormSize, InputVariant } from "../shared.types.js"

/** Options for generating number input class names */
export interface NumInputClassesOptions {
  /** Visual variant of the input */
  variant?: InputVariant
  /** Size of the input */
  size?: FormSize
  /** Whether the input is in an invalid state */
  invalid?: boolean
  /** Whether the input is disabled */
  disabled?: boolean
  /** Whether the input takes full width */
  fullWidth?: boolean
}

/** Props for the number input component */
export interface NumInputProps extends NumInputClassesOptions {
  /** Minimum allowed value */
  min?: number
  /** Maximum allowed value */
  max?: number
  /** Step increment */
  step?: number
  /** Controlled value */
  value?: number
  /** Default value for uncontrolled usage */
  defaultValue?: number
  /** Decimal precision */
  precision?: number
  /** Whether to allow mouse wheel to change value */
  allowMouseWheel?: boolean
  /** Whether to clamp value on blur */
  clampValueOnBlur?: boolean
  /** Format function for display */
  format?: (value: number) => string
  /** Parse function from display to number */
  parse?: (value: string) => number
  /** Name attribute for form submission */
  name?: string
  /** Callback fired when value changes */
  onChange?: (value: number) => void
}
`,

  "number-input.classes.ts": `import type { NumInputClassesOptions } from "./number-input.types.js"

const BASE = "pm-num-input"

/**
 * Returns BEM class names for the number input wrapper (human-readable).
 */
export function numInputClasses(options: NumInputClassesOptions = {}): string {
  const { variant = "outline", size = "md", invalid = false, disabled = false, fullWidth = false } =
    options
  const classes = [BASE, \`\${BASE}--\${variant}\`, \`\${BASE}--\${size}\`]

  if (invalid) classes.push(\`\${BASE}--invalid\`)
  if (disabled) classes.push(\`\${BASE}--disabled\`)
  if (fullWidth) classes.push(\`\${BASE}--full-width\`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the number input wrapper (hashed).
 */
export function numInputModuleClasses(
  classMap: Record<string, string>,
  options: NumInputClassesOptions = {},
): string {
  const { variant = "outline", size = "md", invalid = false, disabled = false, fullWidth = false } =
    options

  const classes = [
    classMap["pm-num-input"],
    classMap[\`pm-num-input--\${variant}\`],
    classMap[\`pm-num-input--\${size}\`],
  ]

  if (invalid) classes.push(classMap["pm-num-input--invalid"])
  if (disabled) classes.push(classMap["pm-num-input--disabled"])
  if (fullWidth) classes.push(classMap["pm-num-input--full-width"])

  return classes.filter(Boolean).join(" ")
}
`,

  "number-input.css": `@layer pm.components {
  .pm-num-input {
    --_pm-num-input-radius: var(--pm-radius-md);

    position: relative;
    display: inline-flex;
    align-items: center;
    width: auto;

    & .pm-input {
      width: 100%;
      -moz-appearance: textfield;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    &.pm-num-input--full-width {
      width: 100%;
    }

    &.pm-num-input--disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  .pm-num-input__stepper {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    border-left: 1px solid light-dark(var(--pm-color-neutral-200), var(--pm-color-neutral-700));
  }

  .pm-num-input__increment,
  .pm-num-input__decrement {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 0 var(--pm-spacing-2);
    background: none;
    border: none;
    cursor: pointer;
    color: light-dark(var(--pm-color-neutral-600), var(--pm-color-neutral-400));
    font-size: var(--pm-font-size-xs);

    &:hover {
      background-color: light-dark(var(--pm-color-neutral-100), var(--pm-color-neutral-800));
    }

    &:focus-visible {
      outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
      outline-offset: -1px;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .pm-num-input__increment {
    border-bottom: 1px solid light-dark(var(--pm-color-neutral-200), var(--pm-color-neutral-700));
    border-radius: 0 var(--_pm-num-input-radius) 0 0;
  }

  .pm-num-input__decrement {
    border-radius: 0 0 var(--_pm-num-input-radius) 0;
  }

  /* ---- Theme overrides ---- */
  :where([data-theme="antd"]) .pm-num-input {
    --_pm-num-input-radius: 4px;
  }

  :where([data-theme="material"]) .pm-num-input {
    --_pm-num-input-radius: 12px;
  }

  :where([data-theme="bootstrap"]) .pm-num-input {
    --_pm-num-input-radius: 6px;
  }
}
`,

  "number-input.module.css": `@layer pm.components {
  .pm-num-input {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: auto;
  }

  .pm-num-input--full-width {
    width: 100%;
  }

  .pm-num-input--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .pm-num-input__stepper {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    flex-direction: column;
    border-left: 1px solid light-dark(var(--pm-color-neutral-200), var(--pm-color-neutral-700));
  }

  .pm-num-input__increment,
  .pm-num-input__decrement {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 0 var(--pm-spacing-2);
    background: none;
    border: none;
    cursor: pointer;
    color: light-dark(var(--pm-color-neutral-600), var(--pm-color-neutral-400));
    font-size: var(--pm-font-size-xs);
  }

  .pm-num-input__increment:hover,
  .pm-num-input__decrement:hover {
    background-color: light-dark(var(--pm-color-neutral-100), var(--pm-color-neutral-800));
  }

  .pm-num-input__increment:focus-visible,
  .pm-num-input__decrement:focus-visible {
    outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
    outline-offset: -1px;
  }

  .pm-num-input__increment {
    border-bottom: 1px solid light-dark(var(--pm-color-neutral-200), var(--pm-color-neutral-700));
    border-radius: 0 var(--pm-radius-md) 0 0;
  }

  .pm-num-input__decrement {
    border-radius: 0 0 var(--pm-radius-md) 0;
  }
}
`,
})

// ============================================================
// COMPONENT 4: Pin Input
// ============================================================
writeComponent("pin-input", {
  "pin-input.types.ts": `import type { FormSize } from "../shared.types.js"

/** Pin input type variant */
export type PinInputType = "alphanumeric" | "number"

/** Options for generating pin input class names */
export interface PinInputClassesOptions {
  /** Size of each pin field */
  size?: FormSize
  /** Whether the pin input is disabled */
  disabled?: boolean
  /** Whether the pin input is in an invalid state */
  invalid?: boolean
}

/** Props for the pin input component */
export interface PinInputProps extends PinInputClassesOptions {
  /** Number of input fields */
  length?: number
  /** Input type restriction */
  type?: PinInputType
  /** Whether to use one-time-code autocomplete */
  otp?: boolean
  /** Whether to mask input characters */
  mask?: boolean
  /** Placeholder for each field */
  placeholder?: string
  /** Whether to auto-focus the first field */
  autoFocus?: boolean
  /** Whether to manage focus automatically between fields */
  manageFocus?: boolean
  /** Controlled value */
  value?: string
  /** Default value for uncontrolled usage */
  defaultValue?: string
  /** Name attribute for form submission */
  name?: string
  /** Callback fired when value changes */
  onChange?: (value: string) => void
  /** Callback fired when all fields are filled */
  onComplete?: (value: string) => void
}
`,

  "pin-input.classes.ts": `import type { PinInputClassesOptions } from "./pin-input.types.js"

const BASE = "pm-pin-input"

/**
 * Returns BEM class names for the pin input component (human-readable).
 */
export function pinInputClasses(options: PinInputClassesOptions = {}): string {
  const { size = "md", disabled = false, invalid = false } = options
  const classes = [BASE, \`\${BASE}--\${size}\`]

  if (disabled) classes.push(\`\${BASE}--disabled\`)
  if (invalid) classes.push(\`\${BASE}--invalid\`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the pin input component (hashed).
 */
export function pinInputModuleClasses(
  classMap: Record<string, string>,
  options: PinInputClassesOptions = {},
): string {
  const { size = "md", disabled = false, invalid = false } = options

  const classes = [classMap["pm-pin-input"], classMap[\`pm-pin-input--\${size}\`]]

  if (disabled) classes.push(classMap["pm-pin-input--disabled"])
  if (invalid) classes.push(classMap["pm-pin-input--invalid"])

  return classes.filter(Boolean).join(" ")
}
`,

  "pin-input.css": `@layer pm.components {
  .pm-pin-input {
    --_pm-pin-radius: var(--pm-radius-md);
    --_pm-pin-focus-color: var(--pm-color-primary-500);

    display: inline-flex;
    align-items: center;
    gap: var(--pm-spacing-2);

    &.pm-pin-input--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  .pm-pin-input__field {
    text-align: center;
    font-family: var(--pm-font-family-sans);
    border: 1px solid light-dark(var(--pm-color-neutral-300), var(--pm-color-neutral-600));
    border-radius: var(--_pm-pin-radius);
    background-color: transparent;
    color: light-dark(var(--pm-color-neutral-900), var(--pm-color-neutral-100));
    transition-property: border-color, box-shadow;
    transition-duration: var(--pm-transition-fast);

    &:focus-visible {
      outline: var(--pm-focus-ring-width) solid var(--_pm-pin-focus-color);
      outline-offset: var(--pm-focus-ring-offset);
    }
  }

  .pm-pin-input--xs .pm-pin-input__field {
    width: 24px;
    height: 24px;
    font-size: var(--pm-font-size-xs);
  }

  .pm-pin-input--sm .pm-pin-input__field {
    width: 32px;
    height: 32px;
    font-size: var(--pm-font-size-sm);
  }

  .pm-pin-input--md .pm-pin-input__field {
    width: 40px;
    height: 40px;
    font-size: var(--pm-font-size-md);
  }

  .pm-pin-input--lg .pm-pin-input__field {
    width: 48px;
    height: 48px;
    font-size: var(--pm-font-size-lg);
  }

  .pm-pin-input--invalid .pm-pin-input__field {
    border-color: light-dark(var(--pm-color-danger-500), var(--pm-color-danger-400));
  }

  /* Separator between fields */
  .pm-pin-input__separator {
    display: inline-flex;
    align-items: center;
    color: light-dark(var(--pm-color-neutral-400), var(--pm-color-neutral-500));
    font-size: var(--pm-font-size-lg);
  }

  /* ---- Theme overrides ---- */
  :where([data-theme="antd"]) .pm-pin-input {
    --_pm-pin-radius: 4px;
    --_pm-pin-focus-color: #1677ff;
  }

  :where([data-theme="material"]) .pm-pin-input {
    --_pm-pin-radius: 12px;
  }

  :where([data-theme="bootstrap"]) .pm-pin-input {
    --_pm-pin-radius: 6px;
    --_pm-pin-focus-color: #0d6efd;
  }

  :where([data-theme="bootstrap"]) .pm-pin-input__field:focus-visible {
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 0.25);
  }

  :where([data-theme="dark-modern"]) .pm-pin-input__field:focus-visible {
    box-shadow: 0 0 0 2px light-dark(transparent, var(--pm-color-primary-500) / 0.3);
  }

  :where([data-theme="light-modern"]) .pm-pin-input__field:focus-visible {
    box-shadow: 0 0 0 3px light-dark(var(--pm-color-primary-100), var(--pm-color-primary-900));
  }
}
`,

  "pin-input.module.css": `@layer pm.components {
  .pm-pin-input {
    display: inline-flex;
    align-items: center;
    gap: var(--pm-spacing-2);
  }

  .pm-pin-input--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .pm-pin-input__field {
    text-align: center;
    font-family: var(--pm-font-family-sans);
    border: 1px solid light-dark(var(--pm-color-neutral-300), var(--pm-color-neutral-600));
    border-radius: var(--pm-radius-md);
    background-color: transparent;
    color: light-dark(var(--pm-color-neutral-900), var(--pm-color-neutral-100));
    transition-property: border-color, box-shadow;
    transition-duration: var(--pm-transition-fast);
  }

  .pm-pin-input__field:focus-visible {
    outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
    outline-offset: var(--pm-focus-ring-offset);
  }

  .pm-pin-input--xs .pm-pin-input__field {
    width: 24px;
    height: 24px;
    font-size: var(--pm-font-size-xs);
  }

  .pm-pin-input--sm .pm-pin-input__field {
    width: 32px;
    height: 32px;
    font-size: var(--pm-font-size-sm);
  }

  .pm-pin-input--md .pm-pin-input__field {
    width: 40px;
    height: 40px;
    font-size: var(--pm-font-size-md);
  }

  .pm-pin-input--lg .pm-pin-input__field {
    width: 48px;
    height: 48px;
    font-size: var(--pm-font-size-lg);
  }

  .pm-pin-input--invalid .pm-pin-input__field {
    border-color: light-dark(var(--pm-color-danger-500), var(--pm-color-danger-400));
  }

  .pm-pin-input__separator {
    display: inline-flex;
    align-items: center;
    color: light-dark(var(--pm-color-neutral-400), var(--pm-color-neutral-500));
    font-size: var(--pm-font-size-lg);
  }
}
`,
})

// ============================================================
// COMPONENT 5: Search Input
// ============================================================
writeComponent("search-input", {
  "search-input.types.ts": `import type { FormSize, InputVariant } from "../shared.types.js"

/** Options for generating search input class names */
export interface SearchClassesOptions {
  /** Visual variant of the input */
  variant?: InputVariant
  /** Size of the input */
  size?: FormSize
  /** Whether the input is in an invalid state */
  invalid?: boolean
  /** Whether the input is disabled */
  disabled?: boolean
  /** Whether the input takes full width */
  fullWidth?: boolean
  /** Whether the input is currently loading results */
  loading?: boolean
}

/** Props for the search input component */
export interface SearchProps extends SearchClassesOptions {
  /** Placeholder text */
  placeholder?: string
  /** Controlled value */
  value?: string
  /** Default value for uncontrolled usage */
  defaultValue?: string
  /** Name attribute for form submission */
  name?: string
  /** Callback fired when value changes */
  onChange?: (event: Event) => void
  /** Callback fired when the clear button is clicked */
  onClear?: () => void
  /** Callback fired when Enter is pressed */
  onSearch?: (value: string) => void
}
`,

  "search-input.classes.ts": `import type { SearchClassesOptions } from "./search-input.types.js"

const BASE = "pm-search"

/**
 * Returns BEM class names for the search input wrapper (human-readable).
 */
export function searchClasses(options: SearchClassesOptions = {}): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    fullWidth = false,
    loading = false,
  } = options
  const classes = [BASE, \`\${BASE}--\${variant}\`, \`\${BASE}--\${size}\`]

  if (invalid) classes.push(\`\${BASE}--invalid\`)
  if (disabled) classes.push(\`\${BASE}--disabled\`)
  if (fullWidth) classes.push(\`\${BASE}--full-width\`)
  if (loading) classes.push(\`\${BASE}--loading\`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the search input wrapper (hashed).
 */
export function searchModuleClasses(
  classMap: Record<string, string>,
  options: SearchClassesOptions = {},
): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    fullWidth = false,
    loading = false,
  } = options

  const classes = [
    classMap["pm-search"],
    classMap[\`pm-search--\${variant}\`],
    classMap[\`pm-search--\${size}\`],
  ]

  if (invalid) classes.push(classMap["pm-search--invalid"])
  if (disabled) classes.push(classMap["pm-search--disabled"])
  if (fullWidth) classes.push(classMap["pm-search--full-width"])
  if (loading) classes.push(classMap["pm-search--loading"])

  return classes.filter(Boolean).join(" ")
}
`,

  "search-input.css": `@layer pm.components {
  .pm-search {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: auto;

    & .pm-input {
      width: 100%;
      padding-left: var(--pm-spacing-9);
      padding-right: var(--pm-spacing-9);
    }

    &.pm-search--xs .pm-input {
      padding-left: var(--pm-spacing-7);
      padding-right: var(--pm-spacing-7);
    }

    &.pm-search--sm .pm-input {
      padding-left: var(--pm-spacing-8);
      padding-right: var(--pm-spacing-8);
    }

    &.pm-search--lg .pm-input {
      padding-left: var(--pm-spacing-10);
      padding-right: var(--pm-spacing-10);
    }

    &.pm-search--full-width {
      width: 100%;
    }

    &.pm-search--disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  .pm-search__icon {
    position: absolute;
    left: var(--pm-spacing-3);
    display: flex;
    align-items: center;
    pointer-events: none;
    color: light-dark(var(--pm-color-neutral-400), var(--pm-color-neutral-500));
  }

  .pm-search__clear {
    position: absolute;
    right: var(--pm-spacing-2);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    color: light-dark(var(--pm-color-neutral-400), var(--pm-color-neutral-500));
    padding: var(--pm-spacing-1);
    border-radius: var(--pm-radius-full);

    &:hover {
      color: light-dark(var(--pm-color-neutral-700), var(--pm-color-neutral-200));
      background-color: light-dark(var(--pm-color-neutral-100), var(--pm-color-neutral-800));
    }

    &:focus-visible {
      outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
    }
  }

  .pm-search__spinner {
    position: absolute;
    right: var(--pm-spacing-3);
    display: flex;
    align-items: center;
    color: light-dark(var(--pm-color-neutral-400), var(--pm-color-neutral-500));
  }
}
`,

  "search-input.module.css": `@layer pm.components {
  .pm-search {
    position: relative;
    display: inline-flex;
    align-items: center;
    width: auto;
  }

  .pm-search--full-width {
    width: 100%;
  }

  .pm-search--disabled {
    opacity: 0.5;
    pointer-events: none;
  }

  .pm-search__icon {
    position: absolute;
    left: var(--pm-spacing-3);
    display: flex;
    align-items: center;
    pointer-events: none;
    color: light-dark(var(--pm-color-neutral-400), var(--pm-color-neutral-500));
  }

  .pm-search__clear {
    position: absolute;
    right: var(--pm-spacing-2);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    color: light-dark(var(--pm-color-neutral-400), var(--pm-color-neutral-500));
    padding: var(--pm-spacing-1);
    border-radius: var(--pm-radius-full);
  }

  .pm-search__clear:hover {
    color: light-dark(var(--pm-color-neutral-700), var(--pm-color-neutral-200));
    background-color: light-dark(var(--pm-color-neutral-100), var(--pm-color-neutral-800));
  }

  .pm-search__clear:focus-visible {
    outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
  }

  .pm-search__spinner {
    position: absolute;
    right: var(--pm-spacing-3);
    display: flex;
    align-items: center;
    color: light-dark(var(--pm-color-neutral-400), var(--pm-color-neutral-500));
  }
}
`,
})

// ============================================================
// COMPONENT 6: Tags Input
// ============================================================
writeComponent("tags-input", {
  "tags-input.types.ts": `import type { FormSize, InputVariant } from "../shared.types.js"

/** Options for generating tags input class names */
export interface TagsInputClassesOptions {
  /** Visual variant */
  variant?: InputVariant
  /** Size of the tags input */
  size?: FormSize
  /** Whether the tags input is disabled */
  disabled?: boolean
  /** Whether the tags input is in an invalid state */
  invalid?: boolean
  /** Whether the tags input takes full width */
  fullWidth?: boolean
}

/** Props for the tags input component */
export interface TagsInputProps extends TagsInputClassesOptions {
  /** Controlled array of tag values */
  value?: string[]
  /** Default tags for uncontrolled usage */
  defaultValue?: string[]
  /** Maximum number of tags allowed */
  maxTags?: number
  /** Whether duplicates are allowed */
  allowDuplicates?: boolean
  /** Separator characters that trigger tag creation (default: Enter, comma) */
  separator?: string | string[]
  /** Placeholder text when no tags exist */
  placeholder?: string
  /** Whether tags can be removed */
  clearable?: boolean
  /** Name attribute for form submission */
  name?: string
  /** Callback fired when tags change */
  onChange?: (tags: string[]) => void
  /** Callback fired when a tag is added */
  onTagAdd?: (tag: string) => void
  /** Callback fired when a tag is removed */
  onTagRemove?: (tag: string) => void
  /** Validation function for new tags */
  validate?: (tag: string) => boolean
}
`,

  "tags-input.classes.ts": `import type { TagsInputClassesOptions } from "./tags-input.types.js"

const BASE = "pm-tags-input"

/**
 * Returns BEM class names for the tags input component (human-readable).
 */
export function tagsInputClasses(options: TagsInputClassesOptions = {}): string {
  const {
    variant = "outline",
    size = "md",
    disabled = false,
    invalid = false,
    fullWidth = false,
  } = options
  const classes = [BASE, \`\${BASE}--\${variant}\`, \`\${BASE}--\${size}\`]

  if (disabled) classes.push(\`\${BASE}--disabled\`)
  if (invalid) classes.push(\`\${BASE}--invalid\`)
  if (fullWidth) classes.push(\`\${BASE}--full-width\`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the tags input component (hashed).
 */
export function tagsInputModuleClasses(
  classMap: Record<string, string>,
  options: TagsInputClassesOptions = {},
): string {
  const {
    variant = "outline",
    size = "md",
    disabled = false,
    invalid = false,
    fullWidth = false,
  } = options

  const classes = [
    classMap["pm-tags-input"],
    classMap[\`pm-tags-input--\${variant}\`],
    classMap[\`pm-tags-input--\${size}\`],
  ]

  if (disabled) classes.push(classMap["pm-tags-input--disabled"])
  if (invalid) classes.push(classMap["pm-tags-input--invalid"])
  if (fullWidth) classes.push(classMap["pm-tags-input--full-width"])

  return classes.filter(Boolean).join(" ")
}
`,

  "tags-input.css": `@layer pm.components {
  .pm-tags-input {
    --_pm-tags-radius: var(--pm-radius-md);
    --_pm-tags-focus-color: var(--pm-color-primary-500);

    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--pm-spacing-1);
    font-family: var(--pm-font-family-sans);
    border-radius: var(--_pm-tags-radius);
    transition-property: border-color, box-shadow;
    transition-duration: var(--pm-transition-fast);
    cursor: text;

    &:focus-within:not(.pm-tags-input--disabled) {
      outline: var(--pm-focus-ring-width) solid var(--_pm-tags-focus-color);
      outline-offset: var(--pm-focus-ring-offset);
    }

    &.pm-tags-input--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    &.pm-tags-input--full-width {
      width: 100%;
    }
  }

  .pm-tags-input--outline {
    border: 1px solid light-dark(var(--pm-color-neutral-300), var(--pm-color-neutral-600));
    background-color: transparent;
  }

  .pm-tags-input--filled {
    border: 1px solid transparent;
    background-color: light-dark(var(--pm-color-neutral-100), var(--pm-color-neutral-800));
  }

  .pm-tags-input--unstyled {
    border: none;
    background-color: transparent;
  }

  .pm-tags-input--xs {
    padding: var(--pm-spacing-0-5) var(--pm-spacing-1-5);
    min-height: calc(var(--pm-spacing-6));
    font-size: var(--pm-font-size-xs);
  }

  .pm-tags-input--sm {
    padding: var(--pm-spacing-1) var(--pm-spacing-2);
    min-height: calc(var(--pm-spacing-8));
    font-size: var(--pm-font-size-sm);
  }

  .pm-tags-input--md {
    padding: var(--pm-spacing-1) var(--pm-spacing-3);
    min-height: calc(var(--pm-spacing-10));
    font-size: var(--pm-font-size-md);
  }

  .pm-tags-input--lg {
    padding: var(--pm-spacing-2) var(--pm-spacing-4);
    min-height: calc(var(--pm-spacing-12));
    font-size: var(--pm-font-size-lg);
  }

  .pm-tags-input--invalid {
    border-color: light-dark(var(--pm-color-danger-500), var(--pm-color-danger-400));
  }

  .pm-tags-input__tag {
    display: inline-flex;
    align-items: center;
    gap: var(--pm-spacing-1);
    padding: var(--pm-spacing-0-5) var(--pm-spacing-2);
    border-radius: var(--pm-radius-full);
    background-color: light-dark(var(--pm-color-neutral-100), var(--pm-color-neutral-700));
    color: light-dark(var(--pm-color-neutral-800), var(--pm-color-neutral-200));
    font-size: inherit;
    line-height: var(--pm-font-lineHeight-tight);
    max-width: 100%;
  }

  .pm-tags-input__tag-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pm-tags-input__tag-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: light-dark(var(--pm-color-neutral-500), var(--pm-color-neutral-400));
    font-size: 0.75em;
    line-height: 1;
    border-radius: var(--pm-radius-full);
    flex-shrink: 0;

    &:hover {
      color: light-dark(var(--pm-color-neutral-800), var(--pm-color-neutral-100));
    }

    &:focus-visible {
      outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
      outline-offset: var(--pm-focus-ring-offset);
    }
  }

  .pm-tags-input__field {
    flex: 1;
    min-width: 60px;
    border: none;
    outline: none;
    background: transparent;
    color: light-dark(var(--pm-color-neutral-900), var(--pm-color-neutral-100));
    font-family: inherit;
    font-size: inherit;
    padding: 0;

    &::placeholder {
      color: light-dark(var(--pm-color-neutral-400), var(--pm-color-neutral-500));
    }
  }

  /* ---- Theme overrides ---- */
  :where([data-theme="antd"]) .pm-tags-input {
    --_pm-tags-radius: 4px;
    --_pm-tags-focus-color: #1677ff;
  }

  :where([data-theme="material"]) .pm-tags-input {
    --_pm-tags-radius: 12px;
  }

  :where([data-theme="bootstrap"]) .pm-tags-input {
    --_pm-tags-radius: 6px;
    --_pm-tags-focus-color: #0d6efd;
  }

  :where([data-theme="bootstrap"]) .pm-tags-input:focus-within {
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 0.25);
  }

  :where([data-theme="dark-modern"]) .pm-tags-input:focus-within {
    box-shadow: 0 0 0 2px light-dark(transparent, var(--pm-color-primary-500) / 0.3);
  }

  :where([data-theme="light-modern"]) .pm-tags-input:focus-within {
    box-shadow: 0 0 0 3px light-dark(var(--pm-color-primary-100), var(--pm-color-primary-900));
  }
}
`,

  "tags-input.module.css": `@layer pm.components {
  .pm-tags-input {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--pm-spacing-1);
    font-family: var(--pm-font-family-sans);
    border-radius: var(--pm-radius-md);
    transition-property: border-color, box-shadow;
    transition-duration: var(--pm-transition-fast);
    cursor: text;
  }

  .pm-tags-input--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .pm-tags-input--full-width {
    width: 100%;
  }

  .pm-tags-input--outline {
    border: 1px solid light-dark(var(--pm-color-neutral-300), var(--pm-color-neutral-600));
    background-color: transparent;
  }

  .pm-tags-input--filled {
    border: 1px solid transparent;
    background-color: light-dark(var(--pm-color-neutral-100), var(--pm-color-neutral-800));
  }

  .pm-tags-input--unstyled {
    border: none;
    background-color: transparent;
  }

  .pm-tags-input--xs {
    padding: var(--pm-spacing-0-5) var(--pm-spacing-1-5);
    min-height: calc(var(--pm-spacing-6));
    font-size: var(--pm-font-size-xs);
  }

  .pm-tags-input--sm {
    padding: var(--pm-spacing-1) var(--pm-spacing-2);
    min-height: calc(var(--pm-spacing-8));
    font-size: var(--pm-font-size-sm);
  }

  .pm-tags-input--md {
    padding: var(--pm-spacing-1) var(--pm-spacing-3);
    min-height: calc(var(--pm-spacing-10));
    font-size: var(--pm-font-size-md);
  }

  .pm-tags-input--lg {
    padding: var(--pm-spacing-2) var(--pm-spacing-4);
    min-height: calc(var(--pm-spacing-12));
    font-size: var(--pm-font-size-lg);
  }

  .pm-tags-input--invalid {
    border-color: light-dark(var(--pm-color-danger-500), var(--pm-color-danger-400));
  }

  .pm-tags-input__tag {
    display: inline-flex;
    align-items: center;
    gap: var(--pm-spacing-1);
    padding: var(--pm-spacing-0-5) var(--pm-spacing-2);
    border-radius: var(--pm-radius-full);
    background-color: light-dark(var(--pm-color-neutral-100), var(--pm-color-neutral-700));
    color: light-dark(var(--pm-color-neutral-800), var(--pm-color-neutral-200));
    font-size: inherit;
    line-height: var(--pm-font-lineHeight-tight);
    max-width: 100%;
  }

  .pm-tags-input__tag-label {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .pm-tags-input__tag-close {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: light-dark(var(--pm-color-neutral-500), var(--pm-color-neutral-400));
    font-size: 0.75em;
    line-height: 1;
    border-radius: var(--pm-radius-full);
    flex-shrink: 0;
  }

  .pm-tags-input__tag-close:hover {
    color: light-dark(var(--pm-color-neutral-800), var(--pm-color-neutral-100));
  }

  .pm-tags-input__tag-close:focus-visible {
    outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
    outline-offset: var(--pm-focus-ring-offset);
  }

  .pm-tags-input__field {
    flex: 1;
    min-width: 60px;
    border: none;
    outline: none;
    background: transparent;
    color: light-dark(var(--pm-color-neutral-900), var(--pm-color-neutral-100));
    font-family: inherit;
    font-size: inherit;
    padding: 0;
  }

  .pm-tags-input__field::placeholder {
    color: light-dark(var(--pm-color-neutral-400), var(--pm-color-neutral-500));
  }
}
`,
})

// ============================================================
// COMPONENT 7: Editable Text
// ============================================================
writeComponent("editable-text", {
  "editable-text.types.ts": `import type { FormSize } from "../shared.types.js"

/** Options for generating editable text class names */
export interface EditableClassesOptions {
  /** Size of the editable text */
  size?: FormSize
  /** Whether the component is disabled */
  disabled?: boolean
  /** Whether the component is currently in edit mode */
  editing?: boolean
}

/** Props for the editable text component */
export interface EditableProps extends EditableClassesOptions {
  /** Controlled value */
  value?: string
  /** Default value for uncontrolled usage */
  defaultValue?: string
  /** Placeholder text when value is empty */
  placeholder?: string
  /** Whether the input is a textarea (multiline) */
  isTextarea?: boolean
  /** Whether to select all text on focus */
  selectAllOnFocus?: boolean
  /** Whether to submit on blur */
  submitOnBlur?: boolean
  /** Whether to start in edit mode */
  startWithEditView?: boolean
  /** Callback fired when value is submitted */
  onSubmit?: (value: string) => void
  /** Callback fired when editing is cancelled */
  onCancel?: () => void
  /** Callback fired when edit mode changes */
  onEdit?: () => void
  /** Callback fired when value changes during editing */
  onChange?: (value: string) => void
}
`,

  "editable-text.classes.ts": `import type { EditableClassesOptions } from "./editable-text.types.js"

const BASE = "pm-editable"

/**
 * Returns BEM class names for the editable text component (human-readable).
 */
export function editableClasses(options: EditableClassesOptions = {}): string {
  const { size = "md", disabled = false, editing = false } = options
  const classes = [BASE, \`\${BASE}--\${size}\`]

  if (disabled) classes.push(\`\${BASE}--disabled\`)
  if (editing) classes.push(\`\${BASE}--editing\`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the editable text component (hashed).
 */
export function editableModuleClasses(
  classMap: Record<string, string>,
  options: EditableClassesOptions = {},
): string {
  const { size = "md", disabled = false, editing = false } = options

  const classes = [classMap["pm-editable"], classMap[\`pm-editable--\${size}\`]]

  if (disabled) classes.push(classMap["pm-editable--disabled"])
  if (editing) classes.push(classMap["pm-editable--editing"])

  return classes.filter(Boolean).join(" ")
}
`,
})

// ============================================================
// COMPONENT 8: Mentions
// ============================================================
writeComponent("mentions", {
  "mentions.types.ts": `import type { FormSize, InputVariant } from "../shared.types.js"

/** A single mention suggestion item */
export interface MentionSuggestion {
  /** Unique identifier */
  id: string
  /** Display label */
  label: string
  /** Optional avatar or icon URL */
  avatar?: string
  /** Optional description text */
  description?: string
}

/** Options for generating mentions class names */
export interface MentionsClassesOptions {
  /** Visual variant */
  variant?: InputVariant
  /** Size of the component */
  size?: FormSize
  /** Whether in an invalid state */
  invalid?: boolean
  /** Whether the component is disabled */
  disabled?: boolean
  /** Whether the suggestions dropdown is open */
  open?: boolean
}

/** Props for the mentions component */
export interface MentionsProps extends MentionsClassesOptions {
  /** Controlled value */
  value?: string
  /** Default value for uncontrolled usage */
  defaultValue?: string
  /** Placeholder text */
  placeholder?: string
  /** Trigger character(s) (default: "@") */
  trigger?: string | string[]
  /** List of available suggestions */
  suggestions?: MentionSuggestion[]
  /** Name attribute for form submission */
  name?: string
  /** Callback fired when value changes */
  onChange?: (value: string) => void
  /** Callback fired when a mention is selected */
  onMention?: (suggestion: MentionSuggestion) => void
  /** Callback fired when the trigger character is typed */
  onSearch?: (query: string, trigger: string) => void
}
`,

  "mentions.classes.ts": `import type { MentionsClassesOptions } from "./mentions.types.js"

const BASE = "pm-mentions"

/**
 * Returns BEM class names for the mentions component (human-readable).
 */
export function mentionsClasses(options: MentionsClassesOptions = {}): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    open = false,
  } = options
  const classes = [BASE, \`\${BASE}--\${variant}\`, \`\${BASE}--\${size}\`]

  if (invalid) classes.push(\`\${BASE}--invalid\`)
  if (disabled) classes.push(\`\${BASE}--disabled\`)
  if (open) classes.push(\`\${BASE}--open\`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the mentions component (hashed).
 */
export function mentionsModuleClasses(
  classMap: Record<string, string>,
  options: MentionsClassesOptions = {},
): string {
  const {
    variant = "outline",
    size = "md",
    invalid = false,
    disabled = false,
    open = false,
  } = options

  const classes = [
    classMap["pm-mentions"],
    classMap[\`pm-mentions--\${variant}\`],
    classMap[\`pm-mentions--\${size}\`],
  ]

  if (invalid) classes.push(classMap["pm-mentions--invalid"])
  if (disabled) classes.push(classMap["pm-mentions--disabled"])
  if (open) classes.push(classMap["pm-mentions--open"])

  return classes.filter(Boolean).join(" ")
}
`,
})

// ============================================================
// COMPONENT: Checkbox (update types with JSDoc)
// ============================================================
writeComponent("checkbox", {
  "checkbox.types.ts": `import type { FormSize } from "../shared.types.js"

/** Options for generating checkbox class names */
export interface CheckboxClassesOptions {
  /** Size of the checkbox */
  size?: FormSize
  /** Whether the checkbox is disabled */
  disabled?: boolean
  /** Whether the checkbox is in an invalid state */
  invalid?: boolean
  /** Whether the checkbox is checked */
  checked?: boolean
  /** Whether the checkbox is in indeterminate state */
  indeterminate?: boolean
}

/** Props for the checkbox component */
export interface CheckboxProps extends CheckboxClassesOptions {
  /** Controlled checked value */
  value?: string
  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean
  /** Name attribute for form submission */
  name?: string
  /** Whether the checkbox is required */
  required?: boolean
  /** Callback fired when checked state changes */
  onChange?: (event: Event) => void
}
`,

  "checkbox.classes.ts": `import type { CheckboxClassesOptions } from "./checkbox.types.js"

const BASE = "pm-checkbox"

/**
 * Returns BEM class names for the checkbox component (human-readable).
 */
export function checkboxClasses(options: CheckboxClassesOptions = {}): string {
  const {
    size = "md",
    disabled = false,
    invalid = false,
    checked = false,
    indeterminate = false,
  } = options
  const classes = [BASE, \`\${BASE}--\${size}\`]

  if (disabled) classes.push(\`\${BASE}--disabled\`)
  if (invalid) classes.push(\`\${BASE}--invalid\`)
  if (checked) classes.push(\`\${BASE}--checked\`)
  if (indeterminate) classes.push(\`\${BASE}--indeterminate\`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the checkbox component (hashed).
 */
export function checkboxModuleClasses(
  classMap: Record<string, string>,
  options: CheckboxClassesOptions = {},
): string {
  const {
    size = "md",
    disabled = false,
    invalid = false,
    checked = false,
    indeterminate = false,
  } = options

  const classes = [classMap["pm-checkbox"], classMap[\`pm-checkbox--\${size}\`]]

  if (disabled) classes.push(classMap["pm-checkbox--disabled"])
  if (invalid) classes.push(classMap["pm-checkbox--invalid"])
  if (checked) classes.push(classMap["pm-checkbox--checked"])
  if (indeterminate) classes.push(classMap["pm-checkbox--indeterminate"])

  return classes.filter(Boolean).join(" ")
}
`,

  "checkbox.css": `@layer pm.components {
  .pm-checkbox {
    --_pm-checkbox-color: light-dark(var(--pm-color-primary-600), var(--pm-color-primary-500));
    --_pm-checkbox-radius: var(--pm-radius-sm);
    --_pm-checkbox-focus-color: var(--pm-color-primary-500);

    display: inline-flex;
    align-items: center;
    gap: var(--pm-spacing-2);
    cursor: pointer;
    position: relative;

    &.pm-checkbox--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .pm-checkbox__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
  }

  .pm-checkbox__indicator {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 2px solid light-dark(var(--pm-color-neutral-300), var(--pm-color-neutral-600));
    border-radius: var(--_pm-checkbox-radius);
    background-color: transparent;
    transition-property: background-color, border-color;
    transition-duration: var(--pm-transition-fast);
    color: var(--pm-color-neutral-0);
  }

  /* Sizes for indicator */
  .pm-checkbox--xs .pm-checkbox__indicator {
    width: 14px;
    height: 14px;
    font-size: 8px;
  }

  .pm-checkbox--sm .pm-checkbox__indicator {
    width: 16px;
    height: 16px;
    font-size: 10px;
  }

  .pm-checkbox--md .pm-checkbox__indicator {
    width: 20px;
    height: 20px;
    font-size: 12px;
  }

  .pm-checkbox--lg .pm-checkbox__indicator {
    width: 24px;
    height: 24px;
    font-size: 14px;
  }

  .pm-checkbox--checked .pm-checkbox__indicator,
  .pm-checkbox--indeterminate .pm-checkbox__indicator {
    background-color: var(--_pm-checkbox-color);
    border-color: var(--_pm-checkbox-color);
  }

  .pm-checkbox--invalid .pm-checkbox__indicator {
    border-color: light-dark(var(--pm-color-danger-500), var(--pm-color-danger-400));
  }

  /* Focus on hidden input shows ring on indicator */
  .pm-checkbox__input:focus-visible + .pm-checkbox__indicator {
    outline: var(--pm-focus-ring-width) solid var(--_pm-checkbox-focus-color);
    outline-offset: var(--pm-focus-ring-offset);
  }

  .pm-checkbox__label {
    font-family: var(--pm-font-family-sans);
    color: light-dark(var(--pm-color-neutral-700), var(--pm-color-neutral-200));
    user-select: none;
  }

  .pm-checkbox--xs .pm-checkbox__label {
    font-size: var(--pm-font-size-xs);
  }

  .pm-checkbox--sm .pm-checkbox__label {
    font-size: var(--pm-font-size-sm);
  }

  .pm-checkbox--md .pm-checkbox__label {
    font-size: var(--pm-font-size-md);
  }

  .pm-checkbox--lg .pm-checkbox__label {
    font-size: var(--pm-font-size-lg);
  }

  .pm-checkbox__description {
    font-family: var(--pm-font-family-sans);
    font-size: var(--pm-font-size-sm);
    color: light-dark(var(--pm-color-neutral-500), var(--pm-color-neutral-400));
  }

  /* ---- Theme overrides ---- */
  :where([data-theme="antd"]) .pm-checkbox {
    --_pm-checkbox-color: #1677ff;
    --_pm-checkbox-radius: 2px;
    --_pm-checkbox-focus-color: #1677ff;
  }

  :where([data-theme="material"]) .pm-checkbox {
    --_pm-checkbox-radius: 2px;
  }

  :where([data-theme="bootstrap"]) .pm-checkbox {
    --_pm-checkbox-color: #0d6efd;
    --_pm-checkbox-radius: 4px;
    --_pm-checkbox-focus-color: #0d6efd;
  }

  :where([data-theme="bootstrap"]) .pm-checkbox__input:focus-visible + .pm-checkbox__indicator {
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 0.25);
  }

  :where([data-theme="dark-modern"]) .pm-checkbox__input:focus-visible + .pm-checkbox__indicator {
    box-shadow: 0 0 0 2px light-dark(transparent, var(--pm-color-primary-500) / 0.3);
  }

  :where([data-theme="light-modern"]) .pm-checkbox__input:focus-visible + .pm-checkbox__indicator {
    box-shadow: 0 0 0 3px light-dark(var(--pm-color-primary-100), var(--pm-color-primary-900));
  }
}
`,
})

// ============================================================
// COMPONENT: Checkbox Card
// ============================================================
writeComponent("checkbox-card", {
  "checkbox-card.types.ts": `import type { FormSize } from "../shared.types.js"

/** Options for generating checkbox card class names */
export interface ChkCardClassesOptions {
  /** Size of the checkbox card */
  size?: FormSize
  /** Whether the checkbox card is disabled */
  disabled?: boolean
  /** Whether the checkbox card is checked */
  checked?: boolean
}

/** Props for the checkbox card component */
export interface ChkCardProps extends ChkCardClassesOptions {
  /** Controlled checked value */
  value?: string
  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean
  /** Name attribute for form submission */
  name?: string
  /** Title text for the card */
  title?: string
  /** Description text for the card */
  description?: string
  /** Whether to show the checkbox indicator */
  showIndicator?: boolean
  /** Callback fired when checked state changes */
  onChange?: (event: Event) => void
}
`,

  "checkbox-card.classes.ts": `import type { ChkCardClassesOptions } from "./checkbox-card.types.js"

const BASE = "pm-chk-card"

/**
 * Returns BEM class names for the checkbox card component (human-readable).
 */
export function chkCardClasses(options: ChkCardClassesOptions = {}): string {
  const { size = "md", disabled = false, checked = false } = options
  const classes = [BASE, \`\${BASE}--\${size}\`]

  if (disabled) classes.push(\`\${BASE}--disabled\`)
  if (checked) classes.push(\`\${BASE}--checked\`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the checkbox card component (hashed).
 */
export function chkCardModuleClasses(
  classMap: Record<string, string>,
  options: ChkCardClassesOptions = {},
): string {
  const { size = "md", disabled = false, checked = false } = options

  const classes = [classMap["pm-chk-card"], classMap[\`pm-chk-card--\${size}\`]]

  if (disabled) classes.push(classMap["pm-chk-card--disabled"])
  if (checked) classes.push(classMap["pm-chk-card--checked"])

  return classes.filter(Boolean).join(" ")
}
`,

  "checkbox-card.css": `@layer pm.components {
  .pm-chk-card {
    --_pm-chk-card-radius: var(--pm-radius-md);
    --_pm-chk-card-checked-bg: light-dark(var(--pm-color-primary-50), var(--pm-color-primary-950));
    --_pm-chk-card-checked-border: light-dark(var(--pm-color-primary-500), var(--pm-color-primary-400));

    display: flex;
    align-items: flex-start;
    gap: var(--pm-spacing-3);
    border: 1px solid light-dark(var(--pm-color-neutral-200), var(--pm-color-neutral-700));
    border-radius: var(--_pm-chk-card-radius);
    cursor: pointer;
    transition-property: border-color, box-shadow, background-color;
    transition-duration: var(--pm-transition-fast);
    position: relative;

    &:hover:not(.pm-chk-card--disabled) {
      border-color: light-dark(var(--pm-color-primary-300), var(--pm-color-primary-600));
    }

    &.pm-chk-card--xs {
      padding: var(--pm-spacing-1-5) var(--pm-spacing-2);
    }

    &.pm-chk-card--sm {
      padding: var(--pm-spacing-2) var(--pm-spacing-3);
    }

    &.pm-chk-card--md {
      padding: var(--pm-spacing-3) var(--pm-spacing-4);
    }

    &.pm-chk-card--lg {
      padding: var(--pm-spacing-4) var(--pm-spacing-5);
    }

    &.pm-chk-card--checked {
      border-color: var(--_pm-chk-card-checked-border);
      background-color: var(--_pm-chk-card-checked-bg);
    }

    &.pm-chk-card--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .pm-chk-card__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
  }

  .pm-chk-card__input:focus-visible ~ .pm-chk-card__content {
    outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
    outline-offset: var(--pm-focus-ring-offset);
    border-radius: var(--_pm-chk-card-radius);
  }

  .pm-chk-card__content {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .pm-chk-card__title {
    font-family: var(--pm-font-family-sans);
    font-weight: var(--pm-font-weight-medium);
    color: light-dark(var(--pm-color-neutral-800), var(--pm-color-neutral-100));
  }

  .pm-chk-card__description {
    font-family: var(--pm-font-family-sans);
    font-size: var(--pm-font-size-sm);
    color: light-dark(var(--pm-color-neutral-500), var(--pm-color-neutral-400));
    margin-top: var(--pm-spacing-0-5);
  }

  /* ---- Theme overrides ---- */
  :where([data-theme="antd"]) .pm-chk-card {
    --_pm-chk-card-radius: 4px;
    --_pm-chk-card-checked-border: #1677ff;
    --_pm-chk-card-checked-bg: #e6f4ff;
  }

  :where([data-theme="material"]) .pm-chk-card {
    --_pm-chk-card-radius: 12px;
  }

  :where([data-theme="bootstrap"]) .pm-chk-card {
    --_pm-chk-card-radius: 6px;
    --_pm-chk-card-checked-border: #0d6efd;
  }

  :where([data-theme="dark-modern"]) .pm-chk-card {
    --_pm-chk-card-checked-bg: light-dark(transparent, var(--pm-color-primary-900));
  }
}
`,
})

// ============================================================
// COMPONENT: Radio (update types)
// ============================================================
writeComponent("radio", {
  "radio.types.ts": `import type { FormSize, FormOrientation } from "../shared.types.js"

/** Options for generating radio class names */
export interface RadioClassesOptions {
  /** Size of the radio */
  size?: FormSize
  /** Whether the radio is disabled */
  disabled?: boolean
  /** Whether the radio is in an invalid state */
  invalid?: boolean
  /** Whether the radio is checked */
  checked?: boolean
}

/** Props for the radio component */
export interface RadioProps extends RadioClassesOptions {
  /** Name attribute, shared within a radio group */
  name?: string
  /** Value of this radio option */
  value?: string
  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean
  /** Whether the radio is required */
  required?: boolean
  /** Callback fired when checked state changes */
  onChange?: (event: Event) => void
}

/** Options for generating radio group class names */
export interface RadioGroupClassesOptions {
  /** Layout orientation */
  orientation?: FormOrientation
  /** Size applied to all radios in the group */
  size?: FormSize
}

/** Props for the radio group component */
export interface RadioGroupProps extends RadioGroupClassesOptions {
  /** Name attribute shared by all radios */
  name?: string
  /** Controlled value */
  value?: string
  /** Default value for uncontrolled usage */
  defaultValue?: string
  /** Callback fired when selected value changes */
  onChange?: (value: string) => void
}
`,

  "radio.classes.ts": `import type { RadioClassesOptions, RadioGroupClassesOptions } from "./radio.types.js"

const RADIO_BASE = "pm-radio"
const GROUP_BASE = "pm-radio-group"

/**
 * Returns BEM class names for the radio component (human-readable).
 */
export function radioClasses(options: RadioClassesOptions = {}): string {
  const { size = "md", disabled = false, invalid = false, checked = false } = options
  const classes = [RADIO_BASE, \`\${RADIO_BASE}--\${size}\`]

  if (disabled) classes.push(\`\${RADIO_BASE}--disabled\`)
  if (invalid) classes.push(\`\${RADIO_BASE}--invalid\`)
  if (checked) classes.push(\`\${RADIO_BASE}--checked\`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the radio component (hashed).
 */
export function radioModuleClasses(
  classMap: Record<string, string>,
  options: RadioClassesOptions = {},
): string {
  const { size = "md", disabled = false, invalid = false, checked = false } = options

  const classes = [classMap["pm-radio"], classMap[\`pm-radio--\${size}\`]]

  if (disabled) classes.push(classMap["pm-radio--disabled"])
  if (invalid) classes.push(classMap["pm-radio--invalid"])
  if (checked) classes.push(classMap["pm-radio--checked"])

  return classes.filter(Boolean).join(" ")
}

/**
 * Returns BEM class names for the radio group component (human-readable).
 */
export function radioGroupClasses(options: RadioGroupClassesOptions = {}): string {
  const { orientation = "vertical", size = "md" } = options
  const classes = [GROUP_BASE, \`\${GROUP_BASE}--\${orientation}\`, \`\${GROUP_BASE}--\${size}\`]

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the radio group component (hashed).
 */
export function radioGroupModuleClasses(
  classMap: Record<string, string>,
  options: RadioGroupClassesOptions = {},
): string {
  const { orientation = "vertical", size = "md" } = options

  const classes = [
    classMap["pm-radio-group"],
    classMap[\`pm-radio-group--\${orientation}\`],
    classMap[\`pm-radio-group--\${size}\`],
  ]

  return classes.filter(Boolean).join(" ")
}
`,

  "radio.css": `@layer pm.components {
  .pm-radio {
    --_pm-radio-color: light-dark(var(--pm-color-primary-600), var(--pm-color-primary-500));
    --_pm-radio-focus-color: var(--pm-color-primary-500);

    display: inline-flex;
    align-items: center;
    gap: var(--pm-spacing-2);
    cursor: pointer;
    position: relative;

    &.pm-radio--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .pm-radio__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
  }

  .pm-radio__indicator {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    border: 2px solid light-dark(var(--pm-color-neutral-300), var(--pm-color-neutral-600));
    border-radius: var(--pm-radius-full);
    background-color: transparent;
    transition-property: background-color, border-color;
    transition-duration: var(--pm-transition-fast);
  }

  .pm-radio--xs .pm-radio__indicator {
    width: 14px;
    height: 14px;
  }

  .pm-radio--sm .pm-radio__indicator {
    width: 16px;
    height: 16px;
  }

  .pm-radio--md .pm-radio__indicator {
    width: 20px;
    height: 20px;
  }

  .pm-radio--lg .pm-radio__indicator {
    width: 24px;
    height: 24px;
  }

  .pm-radio--checked .pm-radio__indicator {
    border-color: var(--_pm-radio-color);
  }

  .pm-radio--checked .pm-radio__indicator::after {
    content: "";
    display: block;
    border-radius: var(--pm-radius-full);
    background-color: var(--_pm-radio-color);
  }

  .pm-radio--xs.pm-radio--checked .pm-radio__indicator::after {
    width: 6px;
    height: 6px;
  }

  .pm-radio--sm.pm-radio--checked .pm-radio__indicator::after {
    width: 8px;
    height: 8px;
  }

  .pm-radio--md.pm-radio--checked .pm-radio__indicator::after {
    width: 10px;
    height: 10px;
  }

  .pm-radio--lg.pm-radio--checked .pm-radio__indicator::after {
    width: 12px;
    height: 12px;
  }

  .pm-radio--invalid .pm-radio__indicator {
    border-color: light-dark(var(--pm-color-danger-500), var(--pm-color-danger-400));
  }

  .pm-radio__input:focus-visible + .pm-radio__indicator {
    outline: var(--pm-focus-ring-width) solid var(--_pm-radio-focus-color);
    outline-offset: var(--pm-focus-ring-offset);
  }

  .pm-radio__label {
    font-family: var(--pm-font-family-sans);
    color: light-dark(var(--pm-color-neutral-700), var(--pm-color-neutral-200));
    user-select: none;
  }

  .pm-radio--xs .pm-radio__label {
    font-size: var(--pm-font-size-xs);
  }

  .pm-radio--sm .pm-radio__label {
    font-size: var(--pm-font-size-sm);
  }

  .pm-radio--md .pm-radio__label {
    font-size: var(--pm-font-size-md);
  }

  .pm-radio--lg .pm-radio__label {
    font-size: var(--pm-font-size-lg);
  }

  .pm-radio__description {
    font-family: var(--pm-font-family-sans);
    font-size: var(--pm-font-size-sm);
    color: light-dark(var(--pm-color-neutral-500), var(--pm-color-neutral-400));
  }

  /* Radio Group */
  .pm-radio-group {
    display: flex;

    &.pm-radio-group--vertical {
      flex-direction: column;
      gap: var(--pm-spacing-2);
    }

    &.pm-radio-group--horizontal {
      flex-direction: row;
      gap: var(--pm-spacing-4);
    }
  }

  /* ---- Theme overrides ---- */
  :where([data-theme="antd"]) .pm-radio {
    --_pm-radio-color: #1677ff;
    --_pm-radio-focus-color: #1677ff;
  }

  :where([data-theme="bootstrap"]) .pm-radio {
    --_pm-radio-color: #0d6efd;
    --_pm-radio-focus-color: #0d6efd;
  }

  :where([data-theme="bootstrap"]) .pm-radio__input:focus-visible + .pm-radio__indicator {
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 0.25);
  }

  :where([data-theme="dark-modern"]) .pm-radio__input:focus-visible + .pm-radio__indicator {
    box-shadow: 0 0 0 2px light-dark(transparent, var(--pm-color-primary-500) / 0.3);
  }

  :where([data-theme="light-modern"]) .pm-radio__input:focus-visible + .pm-radio__indicator {
    box-shadow: 0 0 0 3px light-dark(var(--pm-color-primary-100), var(--pm-color-primary-900));
  }
}
`,
})

// ============================================================
// COMPONENT: Radio Card
// ============================================================
writeComponent("radio-card", {
  "radio-card.types.ts": `import type { FormSize } from "../shared.types.js"

/** Options for generating radio card class names */
export interface RadioCardClassesOptions {
  /** Size of the radio card */
  size?: FormSize
  /** Whether the radio card is disabled */
  disabled?: boolean
  /** Whether the radio card is checked */
  checked?: boolean
}

/** Props for the radio card component */
export interface RadioCardProps extends RadioCardClassesOptions {
  /** Name attribute, shared within a radio group */
  name?: string
  /** Value of this radio option */
  value?: string
  /** Title text for the card */
  title?: string
  /** Description text for the card */
  description?: string
  /** Whether to show the radio indicator */
  showIndicator?: boolean
  /** Callback fired when selected */
  onChange?: (event: Event) => void
}
`,
})

// ============================================================
// COMPONENT: Switch
// ============================================================
writeComponent("switch", {
  "switch.types.ts": `import type { FormSize } from "../shared.types.js"

/** Label placement for the switch */
export type SwitchLabelPlacement = "start" | "end"

/** Options for generating switch class names */
export interface SwitchClassesOptions {
  /** Size of the switch */
  size?: FormSize
  /** Whether the switch is disabled */
  disabled?: boolean
  /** Whether the switch is on */
  checked?: boolean
  /** Where the label appears relative to the track */
  labelPlacement?: SwitchLabelPlacement
}

/** Props for the switch component */
export interface SwitchProps extends SwitchClassesOptions {
  /** Controlled checked state */
  value?: boolean
  /** Default checked state for uncontrolled usage */
  defaultChecked?: boolean
  /** Name attribute for form submission */
  name?: string
  /** Whether the switch is required */
  required?: boolean
  /** Callback fired when the switch is toggled */
  onChange?: (event: Event) => void
}
`,

  "switch.css": `@layer pm.components {
  .pm-switch {
    --_pm-switch-color: light-dark(var(--pm-color-primary-600), var(--pm-color-primary-500));
    --_pm-switch-track-bg: light-dark(var(--pm-color-neutral-300), var(--pm-color-neutral-600));

    display: inline-flex;
    align-items: center;
    gap: var(--pm-spacing-2);
    cursor: pointer;
    position: relative;

    &.pm-switch--label-start {
      flex-direction: row-reverse;
    }

    &.pm-switch--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .pm-switch__input {
    position: absolute;
    opacity: 0;
    width: 0;
    height: 0;
    margin: 0;
  }

  .pm-switch__track {
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
    border-radius: var(--pm-radius-full);
    background-color: var(--_pm-switch-track-bg);
    transition-property: background-color;
    transition-duration: var(--pm-transition-fast);
    position: relative;
  }

  .pm-switch--xs .pm-switch__track {
    width: 26px;
    height: 14px;
  }

  .pm-switch--sm .pm-switch__track {
    width: 32px;
    height: 18px;
  }

  .pm-switch--md .pm-switch__track {
    width: 40px;
    height: 22px;
  }

  .pm-switch--lg .pm-switch__track {
    width: 48px;
    height: 26px;
  }

  .pm-switch--checked .pm-switch__track {
    background-color: var(--_pm-switch-color);
  }

  .pm-switch__thumb {
    position: absolute;
    border-radius: var(--pm-radius-full);
    background-color: var(--pm-color-neutral-0);
    box-shadow: var(--pm-shadow-sm);
    transition-property: transform;
    transition-duration: var(--pm-transition-fast);
  }

  .pm-switch--xs .pm-switch__thumb {
    width: 10px;
    height: 10px;
    top: 2px;
    left: 2px;
  }

  .pm-switch--sm .pm-switch__thumb {
    width: 14px;
    height: 14px;
    top: 2px;
    left: 2px;
  }

  .pm-switch--md .pm-switch__thumb {
    width: 18px;
    height: 18px;
    top: 2px;
    left: 2px;
  }

  .pm-switch--lg .pm-switch__thumb {
    width: 22px;
    height: 22px;
    top: 2px;
    left: 2px;
  }

  .pm-switch--xs.pm-switch--checked .pm-switch__thumb {
    transform: translateX(12px);
  }

  .pm-switch--sm.pm-switch--checked .pm-switch__thumb {
    transform: translateX(14px);
  }

  .pm-switch--md.pm-switch--checked .pm-switch__thumb {
    transform: translateX(18px);
  }

  .pm-switch--lg.pm-switch--checked .pm-switch__thumb {
    transform: translateX(22px);
  }

  .pm-switch__input:focus-visible + .pm-switch__track {
    outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
    outline-offset: var(--pm-focus-ring-offset);
  }

  .pm-switch__label {
    font-family: var(--pm-font-family-sans);
    color: light-dark(var(--pm-color-neutral-700), var(--pm-color-neutral-200));
    user-select: none;
  }

  .pm-switch--xs .pm-switch__label {
    font-size: var(--pm-font-size-xs);
  }

  .pm-switch--sm .pm-switch__label {
    font-size: var(--pm-font-size-sm);
  }

  .pm-switch--md .pm-switch__label {
    font-size: var(--pm-font-size-md);
  }

  .pm-switch--lg .pm-switch__label {
    font-size: var(--pm-font-size-lg);
  }

  /* ---- Theme overrides ---- */
  :where([data-theme="antd"]) .pm-switch {
    --_pm-switch-color: #1677ff;
  }

  :where([data-theme="bootstrap"]) .pm-switch {
    --_pm-switch-color: #0d6efd;
  }

  :where([data-theme="bootstrap"]) .pm-switch__input:focus-visible + .pm-switch__track {
    box-shadow: 0 0 0 0.25rem rgb(13 110 253 / 0.25);
  }

  :where([data-theme="dark-modern"]) .pm-switch__input:focus-visible + .pm-switch__track {
    box-shadow: 0 0 0 2px light-dark(transparent, var(--pm-color-primary-500) / 0.3);
  }

  :where([data-theme="light-modern"]) .pm-switch__input:focus-visible + .pm-switch__track {
    box-shadow: 0 0 0 3px light-dark(var(--pm-color-primary-100), var(--pm-color-primary-900));
  }
}
`,
})

// ============================================================
// COMPONENT: Segmented Control
// ============================================================
writeComponent("segmented-control", {
  "segmented-control.types.ts": `import type { FormSize } from "../shared.types.js"

/** Options for generating segmented control class names */
export interface SegCtrlClassesOptions {
  /** Size of the segmented control */
  size?: FormSize
  /** Whether the segmented control takes full width */
  fullWidth?: boolean
  /** Whether the segmented control is disabled */
  disabled?: boolean
}

/** Props for the segmented control component */
export interface SegCtrlProps extends SegCtrlClassesOptions {
  /** Controlled value */
  value?: string
  /** Default value for uncontrolled usage */
  defaultValue?: string
  /** Callback fired when selected segment changes */
  onChange?: (value: string) => void
  /** Available segment options */
  options?: Array<{ label: string; value: string; disabled?: boolean }>
}
`,

  "segmented-control.classes.ts": `import type { SegCtrlClassesOptions } from "./segmented-control.types.js"

const BASE = "pm-seg-ctrl"

/**
 * Returns BEM class names for the segmented control component (human-readable).
 */
export function segCtrlClasses(options: SegCtrlClassesOptions = {}): string {
  const { size = "md", fullWidth = false, disabled = false } = options
  const classes = [BASE, \`\${BASE}--\${size}\`]

  if (fullWidth) classes.push(\`\${BASE}--full-width\`)
  if (disabled) classes.push(\`\${BASE}--disabled\`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the segmented control component (hashed).
 */
export function segCtrlModuleClasses(
  classMap: Record<string, string>,
  options: SegCtrlClassesOptions = {},
): string {
  const { size = "md", fullWidth = false, disabled = false } = options

  const classes = [classMap["pm-seg-ctrl"], classMap[\`pm-seg-ctrl--\${size}\`]]

  if (fullWidth) classes.push(classMap["pm-seg-ctrl--full-width"])
  if (disabled) classes.push(classMap["pm-seg-ctrl--disabled"])

  return classes.filter(Boolean).join(" ")
}
`,

  "segmented-control.css": `@layer pm.components {
  .pm-seg-ctrl {
    --_pm-segment-bg: light-dark(var(--pm-color-neutral-100), var(--pm-color-neutral-800));
    --_pm-segment-active-bg: light-dark(var(--pm-color-neutral-0), var(--pm-color-neutral-700));
    --_pm-segment-radius: var(--pm-radius-md);

    display: inline-flex;
    align-items: center;
    background-color: var(--_pm-segment-bg);
    border-radius: var(--_pm-segment-radius);
    padding: 2px;
    position: relative;

    &.pm-seg-ctrl--full-width {
      width: 100%;
    }

    &.pm-seg-ctrl--disabled {
      opacity: 0.5;
      pointer-events: none;
    }

    &.pm-seg-ctrl--xs {
      height: calc(var(--pm-spacing-6));
    }

    &.pm-seg-ctrl--sm {
      height: calc(var(--pm-spacing-8));
    }

    &.pm-seg-ctrl--md {
      height: calc(var(--pm-spacing-10));
    }

    &.pm-seg-ctrl--lg {
      height: calc(var(--pm-spacing-12));
    }
  }

  .pm-seg-ctrl__item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 1;
    padding: 0 var(--pm-spacing-3);
    border: none;
    background: transparent;
    cursor: pointer;
    font-family: var(--pm-font-family-sans);
    font-weight: var(--pm-font-weight-medium);
    color: light-dark(var(--pm-color-neutral-600), var(--pm-color-neutral-400));
    border-radius: calc(var(--_pm-segment-radius) - 2px);
    transition-property: background-color, color, box-shadow;
    transition-duration: var(--pm-transition-fast);
    height: 100%;
    z-index: 1;
    position: relative;

    &:focus-visible {
      outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
      outline-offset: var(--pm-focus-ring-offset);
    }

    &:hover:not(.pm-seg-ctrl__item--active):not(:disabled) {
      color: light-dark(var(--pm-color-neutral-800), var(--pm-color-neutral-200));
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .pm-seg-ctrl--xs .pm-seg-ctrl__item {
    font-size: var(--pm-font-size-xs);
    padding: 0 var(--pm-spacing-2);
  }

  .pm-seg-ctrl--sm .pm-seg-ctrl__item {
    font-size: var(--pm-font-size-sm);
  }

  .pm-seg-ctrl--md .pm-seg-ctrl__item {
    font-size: var(--pm-font-size-md);
  }

  .pm-seg-ctrl--lg .pm-seg-ctrl__item {
    font-size: var(--pm-font-size-lg);
  }

  .pm-seg-ctrl__item--active {
    background-color: var(--_pm-segment-active-bg);
    color: light-dark(var(--pm-color-neutral-900), var(--pm-color-neutral-100));
    box-shadow: var(--pm-shadow-sm);
  }

  .pm-seg-ctrl__indicator {
    position: absolute;
    top: 2px;
    bottom: 2px;
    border-radius: calc(var(--_pm-segment-radius) - 2px);
    background-color: var(--_pm-segment-active-bg);
    box-shadow: var(--pm-shadow-sm);
    transition-property: left, width;
    transition-duration: var(--pm-transition-normal);
    transition-timing-function: ease-in-out;
  }

  /* ---- Theme overrides ---- */
  :where([data-theme="antd"]) .pm-seg-ctrl {
    --_pm-segment-radius: 4px;
    --_pm-segment-bg: #f5f5f5;
  }

  :where([data-theme="material"]) .pm-seg-ctrl {
    --_pm-segment-radius: 20px;
  }

  :where([data-theme="bootstrap"]) .pm-seg-ctrl {
    --_pm-segment-radius: 6px;
  }
}
`,
})

// ============================================================
// COMPONENT: Color Picker (empty CSS - needs full implementation)
// ============================================================
writeComponent("color-picker", {
  "color-picker.types.ts": `import type { FormSize } from "../shared.types.js"

/** Color format types */
export type ColorFormat = "hex" | "rgb" | "hsl" | "hsv"

/** Options for generating color picker class names */
export interface ColorpickerClassesOptions {
  /** Size of the color picker trigger */
  size?: FormSize
  /** Whether the color picker is disabled */
  disabled?: boolean
  /** Whether the popover is open */
  open?: boolean
  /** Whether the color picker takes full width */
  fullWidth?: boolean
}

/** Props for the color picker component */
export interface ColorpickerProps extends ColorpickerClassesOptions {
  /** Controlled color value */
  value?: string
  /** Default value for uncontrolled usage */
  defaultValue?: string
  /** Color format to use */
  format?: ColorFormat
  /** Whether to show the alpha slider */
  withAlpha?: boolean
  /** Whether to show preset swatches */
  withSwatches?: boolean
  /** Preset color swatches */
  swatches?: string[]
  /** Whether to show the text input for the color value */
  withInput?: boolean
  /** Whether to show the eye dropper button */
  withEyeDropper?: boolean
  /** Name attribute for form submission */
  name?: string
  /** Callback fired when color changes */
  onChange?: (color: string) => void
  /** Callback fired when popover opens/closes */
  onOpenChange?: (open: boolean) => void
}
`,

  "color-picker.classes.ts": `import type { ColorpickerClassesOptions } from "./color-picker.types.js"

const BASE = "pm-colorpicker"

/**
 * Returns BEM class names for the color picker component (human-readable).
 */
export function colorpickerClasses(options: ColorpickerClassesOptions = {}): string {
  const { size = "md", disabled = false, open = false, fullWidth = false } = options
  const classes = [BASE, \`\${BASE}--\${size}\`]

  if (disabled) classes.push(\`\${BASE}--disabled\`)
  if (open) classes.push(\`\${BASE}--open\`)
  if (fullWidth) classes.push(\`\${BASE}--full-width\`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the color picker component (hashed).
 */
export function colorpickerModuleClasses(
  classMap: Record<string, string>,
  options: ColorpickerClassesOptions = {},
): string {
  const { size = "md", disabled = false, open = false, fullWidth = false } = options

  const classes = [classMap["pm-colorpicker"], classMap[\`pm-colorpicker--\${size}\`]]

  if (disabled) classes.push(classMap["pm-colorpicker--disabled"])
  if (open) classes.push(classMap["pm-colorpicker--open"])
  if (fullWidth) classes.push(classMap["pm-colorpicker--full-width"])

  return classes.filter(Boolean).join(" ")
}
`,

  "color-picker.css": `@layer pm.components {
  .pm-colorpicker {
    --_pm-colorpicker-radius: var(--pm-radius-md);

    position: relative;
    display: inline-flex;
    flex-direction: column;
    font-family: var(--pm-font-family-sans);

    &.pm-colorpicker--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    &.pm-colorpicker--full-width {
      width: 100%;
    }
  }

  .pm-colorpicker__trigger {
    display: inline-flex;
    align-items: center;
    gap: var(--pm-spacing-2);
    border: 1px solid light-dark(var(--pm-color-neutral-300), var(--pm-color-neutral-600));
    border-radius: var(--_pm-colorpicker-radius);
    background: none;
    cursor: pointer;
    transition-property: border-color, box-shadow;
    transition-duration: var(--pm-transition-fast);
    font-family: inherit;
    color: light-dark(var(--pm-color-neutral-900), var(--pm-color-neutral-100));

    &:focus-visible {
      outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
      outline-offset: var(--pm-focus-ring-offset);
    }
  }

  .pm-colorpicker--xs .pm-colorpicker__trigger {
    padding: var(--pm-spacing-0-5) var(--pm-spacing-1-5);
    height: var(--pm-spacing-6);
    font-size: var(--pm-font-size-xs);
  }

  .pm-colorpicker--sm .pm-colorpicker__trigger {
    padding: var(--pm-spacing-1) var(--pm-spacing-2);
    height: var(--pm-spacing-8);
    font-size: var(--pm-font-size-sm);
  }

  .pm-colorpicker--md .pm-colorpicker__trigger {
    padding: var(--pm-spacing-2) var(--pm-spacing-3);
    height: var(--pm-spacing-10);
    font-size: var(--pm-font-size-md);
  }

  .pm-colorpicker--lg .pm-colorpicker__trigger {
    padding: var(--pm-spacing-3) var(--pm-spacing-4);
    height: var(--pm-spacing-12);
    font-size: var(--pm-font-size-lg);
  }

  .pm-colorpicker__swatch {
    display: inline-block;
    flex-shrink: 0;
    border-radius: var(--pm-radius-sm);
    border: 1px solid light-dark(var(--pm-color-neutral-200), var(--pm-color-neutral-700));
  }

  .pm-colorpicker--xs .pm-colorpicker__swatch {
    width: 16px;
    height: 16px;
  }

  .pm-colorpicker--sm .pm-colorpicker__swatch {
    width: 18px;
    height: 18px;
  }

  .pm-colorpicker--md .pm-colorpicker__swatch {
    width: 22px;
    height: 22px;
  }

  .pm-colorpicker--lg .pm-colorpicker__swatch {
    width: 26px;
    height: 26px;
  }

  .pm-colorpicker__popover {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    margin-top: var(--pm-spacing-1);
    border: 1px solid light-dark(var(--pm-color-neutral-200), var(--pm-color-neutral-700));
    border-radius: var(--_pm-colorpicker-radius);
    background-color: light-dark(var(--pm-color-neutral-0), var(--pm-color-neutral-900));
    box-shadow: var(--pm-shadow-lg);
    padding: var(--pm-spacing-3);
    min-width: 240px;
  }

  .pm-colorpicker--open .pm-colorpicker__popover {
    display: flex;
    flex-direction: column;
    gap: var(--pm-spacing-3);
  }

  .pm-colorpicker__saturation {
    position: relative;
    width: 100%;
    height: 160px;
    border-radius: var(--pm-radius-sm);
    cursor: crosshair;
    overflow: hidden;
  }

  .pm-colorpicker__saturation-cursor {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid var(--pm-color-neutral-0);
    border-radius: var(--pm-radius-full);
    box-shadow: var(--pm-shadow-sm);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .pm-colorpicker__sliders {
    display: flex;
    flex-direction: column;
    gap: var(--pm-spacing-2);
  }

  .pm-colorpicker__hue,
  .pm-colorpicker__alpha {
    position: relative;
    height: 12px;
    border-radius: var(--pm-radius-full);
    cursor: pointer;
  }

  .pm-colorpicker__hue {
    background: linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
  }

  .pm-colorpicker__slider-thumb {
    position: absolute;
    top: 50%;
    width: 16px;
    height: 16px;
    border: 2px solid var(--pm-color-neutral-0);
    border-radius: var(--pm-radius-full);
    box-shadow: var(--pm-shadow-sm);
    transform: translate(-50%, -50%);
    cursor: grab;

    &:active {
      cursor: grabbing;
    }

    &:focus-visible {
      outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
      outline-offset: var(--pm-focus-ring-offset);
    }
  }

  .pm-colorpicker__swatches {
    display: flex;
    flex-wrap: wrap;
    gap: var(--pm-spacing-1);
  }

  .pm-colorpicker__swatches button {
    width: 24px;
    height: 24px;
    border: 1px solid light-dark(var(--pm-color-neutral-200), var(--pm-color-neutral-700));
    border-radius: var(--pm-radius-sm);
    cursor: pointer;
    padding: 0;

    &:focus-visible {
      outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
      outline-offset: var(--pm-focus-ring-offset);
    }
  }

  .pm-colorpicker__input {
    display: flex;
    gap: var(--pm-spacing-2);
    align-items: center;
  }

  .pm-colorpicker__input input {
    flex: 1;
    font-family: var(--pm-font-family-sans);
    font-size: var(--pm-font-size-sm);
    padding: var(--pm-spacing-1) var(--pm-spacing-2);
    border: 1px solid light-dark(var(--pm-color-neutral-300), var(--pm-color-neutral-600));
    border-radius: var(--pm-radius-sm);
    background-color: transparent;
    color: light-dark(var(--pm-color-neutral-900), var(--pm-color-neutral-100));

    &:focus-visible {
      outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
      outline-offset: var(--pm-focus-ring-offset);
    }
  }

  /* ---- Theme overrides ---- */
  :where([data-theme="antd"]) .pm-colorpicker {
    --_pm-colorpicker-radius: 4px;
  }

  :where([data-theme="material"]) .pm-colorpicker {
    --_pm-colorpicker-radius: 12px;
  }

  :where([data-theme="bootstrap"]) .pm-colorpicker {
    --_pm-colorpicker-radius: 6px;
  }
}
`,

  "color-picker.module.css": `@layer pm.components {
  .pm-colorpicker {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    font-family: var(--pm-font-family-sans);
  }

  .pm-colorpicker--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .pm-colorpicker--full-width {
    width: 100%;
  }

  .pm-colorpicker__trigger {
    display: inline-flex;
    align-items: center;
    gap: var(--pm-spacing-2);
    border: 1px solid light-dark(var(--pm-color-neutral-300), var(--pm-color-neutral-600));
    border-radius: var(--pm-radius-md);
    background: none;
    cursor: pointer;
    transition-property: border-color, box-shadow;
    transition-duration: var(--pm-transition-fast);
    font-family: inherit;
    color: light-dark(var(--pm-color-neutral-900), var(--pm-color-neutral-100));
  }

  .pm-colorpicker__trigger:focus-visible {
    outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
    outline-offset: var(--pm-focus-ring-offset);
  }

  .pm-colorpicker--xs .pm-colorpicker__trigger {
    padding: var(--pm-spacing-0-5) var(--pm-spacing-1-5);
    height: var(--pm-spacing-6);
    font-size: var(--pm-font-size-xs);
  }

  .pm-colorpicker--sm .pm-colorpicker__trigger {
    padding: var(--pm-spacing-1) var(--pm-spacing-2);
    height: var(--pm-spacing-8);
    font-size: var(--pm-font-size-sm);
  }

  .pm-colorpicker--md .pm-colorpicker__trigger {
    padding: var(--pm-spacing-2) var(--pm-spacing-3);
    height: var(--pm-spacing-10);
    font-size: var(--pm-font-size-md);
  }

  .pm-colorpicker--lg .pm-colorpicker__trigger {
    padding: var(--pm-spacing-3) var(--pm-spacing-4);
    height: var(--pm-spacing-12);
    font-size: var(--pm-font-size-lg);
  }

  .pm-colorpicker__swatch {
    display: inline-block;
    flex-shrink: 0;
    border-radius: var(--pm-radius-sm);
    border: 1px solid light-dark(var(--pm-color-neutral-200), var(--pm-color-neutral-700));
    width: 22px;
    height: 22px;
  }

  .pm-colorpicker__popover {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    margin-top: var(--pm-spacing-1);
    border: 1px solid light-dark(var(--pm-color-neutral-200), var(--pm-color-neutral-700));
    border-radius: var(--pm-radius-md);
    background-color: light-dark(var(--pm-color-neutral-0), var(--pm-color-neutral-900));
    box-shadow: var(--pm-shadow-lg);
    padding: var(--pm-spacing-3);
    min-width: 240px;
  }

  .pm-colorpicker--open .pm-colorpicker__popover {
    display: flex;
    flex-direction: column;
    gap: var(--pm-spacing-3);
  }

  .pm-colorpicker__saturation {
    position: relative;
    width: 100%;
    height: 160px;
    border-radius: var(--pm-radius-sm);
    cursor: crosshair;
    overflow: hidden;
  }

  .pm-colorpicker__saturation-cursor {
    position: absolute;
    width: 16px;
    height: 16px;
    border: 2px solid var(--pm-color-neutral-0);
    border-radius: var(--pm-radius-full);
    box-shadow: var(--pm-shadow-sm);
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  .pm-colorpicker__sliders {
    display: flex;
    flex-direction: column;
    gap: var(--pm-spacing-2);
  }

  .pm-colorpicker__hue {
    position: relative;
    height: 12px;
    border-radius: var(--pm-radius-full);
    cursor: pointer;
    background: linear-gradient(to right, #f00, #ff0, #0f0, #0ff, #00f, #f0f, #f00);
  }

  .pm-colorpicker__alpha {
    position: relative;
    height: 12px;
    border-radius: var(--pm-radius-full);
    cursor: pointer;
  }

  .pm-colorpicker__slider-thumb {
    position: absolute;
    top: 50%;
    width: 16px;
    height: 16px;
    border: 2px solid var(--pm-color-neutral-0);
    border-radius: var(--pm-radius-full);
    box-shadow: var(--pm-shadow-sm);
    transform: translate(-50%, -50%);
    cursor: grab;
  }

  .pm-colorpicker__slider-thumb:focus-visible {
    outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
    outline-offset: var(--pm-focus-ring-offset);
  }

  .pm-colorpicker__swatches {
    display: flex;
    flex-wrap: wrap;
    gap: var(--pm-spacing-1);
  }
}
`,
})

// ============================================================
// COMPONENT: Cascader (empty CSS - needs full implementation)
// ============================================================
writeComponent("cascader", {
  "cascader.types.ts": `import type { FormSize, InputVariant } from "../shared.types.js"

/** A single cascader option node */
export interface CascaderOption {
  /** Unique value */
  value: string
  /** Display label */
  label: string
  /** Whether this option is disabled */
  disabled?: boolean
  /** Child options for nested levels */
  children?: CascaderOption[]
  /** Whether this is a leaf node (no children to load) */
  isLeaf?: boolean
}

/** Options for generating cascader class names */
export interface CascaderClassesOptions {
  /** Visual variant */
  variant?: InputVariant
  /** Size of the cascader */
  size?: FormSize
  /** Whether the cascader is in an invalid state */
  invalid?: boolean
  /** Whether the cascader is disabled */
  disabled?: boolean
  /** Whether the dropdown is open */
  open?: boolean
  /** Whether the cascader takes full width */
  fullWidth?: boolean
}

/** Props for the cascader component */
export interface CascaderProps extends CascaderClassesOptions {
  /** Hierarchical option data */
  options?: CascaderOption[]
  /** Controlled selected path */
  value?: string[]
  /** Default value for uncontrolled usage */
  defaultValue?: string[]
  /** Placeholder text */
  placeholder?: string
  /** Whether to show the full path in the trigger */
  showFullPath?: boolean
  /** Separator for displaying the path */
  pathSeparator?: string
  /** Whether the selection can be cleared */
  clearable?: boolean
  /** Whether to allow searching options */
  searchable?: boolean
  /** Whether to expand on click or hover */
  expandTrigger?: "click" | "hover"
  /** Name attribute for form submission */
  name?: string
  /** Callback fired when value changes */
  onChange?: (value: string[]) => void
  /** Callback fired on lazy-load expansion */
  onExpand?: (option: CascaderOption) => void
}
`,

  "cascader.css": `@layer pm.components {
  .pm-cascader {
    --_pm-cascader-radius: var(--pm-radius-md);

    position: relative;
    display: inline-flex;
    flex-direction: column;
    width: auto;
    font-family: var(--pm-font-family-sans);

    &.pm-cascader--full-width {
      width: 100%;
    }

    &.pm-cascader--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }
  }

  .pm-cascader__trigger {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-radius: var(--_pm-cascader-radius);
    cursor: pointer;
    transition-property: border-color, box-shadow;
    transition-duration: var(--pm-transition-fast);
    font-family: inherit;
    background: none;
    text-align: left;
    gap: var(--pm-spacing-2);

    &:focus-visible {
      outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
      outline-offset: var(--pm-focus-ring-offset);
    }
  }

  .pm-cascader--outline .pm-cascader__trigger {
    border: 1px solid light-dark(var(--pm-color-neutral-300), var(--pm-color-neutral-600));
    background-color: transparent;
    color: light-dark(var(--pm-color-neutral-900), var(--pm-color-neutral-100));
  }

  .pm-cascader--filled .pm-cascader__trigger {
    border: 1px solid transparent;
    background-color: light-dark(var(--pm-color-neutral-100), var(--pm-color-neutral-800));
    color: light-dark(var(--pm-color-neutral-900), var(--pm-color-neutral-100));
  }

  .pm-cascader--unstyled .pm-cascader__trigger {
    border: none;
    background-color: transparent;
    color: light-dark(var(--pm-color-neutral-900), var(--pm-color-neutral-100));
  }

  .pm-cascader--xs .pm-cascader__trigger {
    padding: var(--pm-spacing-0-5) var(--pm-spacing-1-5);
    font-size: var(--pm-font-size-xs);
    height: calc(var(--pm-spacing-6));
  }

  .pm-cascader--sm .pm-cascader__trigger {
    padding: var(--pm-spacing-1) var(--pm-spacing-2);
    font-size: var(--pm-font-size-sm);
    height: calc(var(--pm-spacing-8));
  }

  .pm-cascader--md .pm-cascader__trigger {
    padding: var(--pm-spacing-2) var(--pm-spacing-3);
    font-size: var(--pm-font-size-md);
    height: calc(var(--pm-spacing-10));
  }

  .pm-cascader--lg .pm-cascader__trigger {
    padding: var(--pm-spacing-3) var(--pm-spacing-4);
    font-size: var(--pm-font-size-lg);
    height: calc(var(--pm-spacing-12));
  }

  .pm-cascader--invalid .pm-cascader__trigger {
    border-color: light-dark(var(--pm-color-danger-500), var(--pm-color-danger-400));
  }

  .pm-cascader__dropdown {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    margin-top: var(--pm-spacing-1);
    border: 1px solid light-dark(var(--pm-color-neutral-200), var(--pm-color-neutral-700));
    border-radius: var(--_pm-cascader-radius);
    background-color: light-dark(var(--pm-color-neutral-0), var(--pm-color-neutral-900));
    box-shadow: var(--pm-shadow-lg);
  }

  .pm-cascader--open .pm-cascader__dropdown {
    display: flex;
  }

  .pm-cascader__column {
    min-width: 140px;
    max-height: 240px;
    overflow-y: auto;
    padding: var(--pm-spacing-1) 0;
    border-right: 1px solid light-dark(var(--pm-color-neutral-200), var(--pm-color-neutral-700));

    &:last-child {
      border-right: none;
    }
  }

  .pm-cascader__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--pm-spacing-2) var(--pm-spacing-3);
    cursor: pointer;
    font-size: var(--pm-font-size-sm);
    color: light-dark(var(--pm-color-neutral-700), var(--pm-color-neutral-300));
    transition: background-color var(--pm-transition-fast);

    &:hover {
      background-color: light-dark(var(--pm-color-neutral-100), var(--pm-color-neutral-800));
    }

    &:focus-visible {
      outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
      outline-offset: -1px;
    }
  }

  .pm-cascader__option--active {
    background-color: light-dark(var(--pm-color-primary-50), var(--pm-color-primary-900));
    color: light-dark(var(--pm-color-primary-700), var(--pm-color-primary-200));
    font-weight: var(--pm-font-weight-medium);
  }

  .pm-cascader__option--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .pm-cascader__option-arrow {
    font-size: var(--pm-font-size-xs);
    color: light-dark(var(--pm-color-neutral-400), var(--pm-color-neutral-500));
    margin-left: var(--pm-spacing-2);
  }

  .pm-cascader__placeholder {
    color: light-dark(var(--pm-color-neutral-400), var(--pm-color-neutral-500));
  }

  .pm-cascader__clear {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    cursor: pointer;
    color: light-dark(var(--pm-color-neutral-400), var(--pm-color-neutral-500));
    padding: var(--pm-spacing-0-5);
    border-radius: var(--pm-radius-full);

    &:hover {
      color: light-dark(var(--pm-color-neutral-700), var(--pm-color-neutral-200));
    }

    &:focus-visible {
      outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
    }
  }

  /* ---- Theme overrides ---- */
  :where([data-theme="antd"]) .pm-cascader {
    --_pm-cascader-radius: 4px;
  }

  :where([data-theme="material"]) .pm-cascader {
    --_pm-cascader-radius: 12px;
  }

  :where([data-theme="bootstrap"]) .pm-cascader {
    --_pm-cascader-radius: 6px;
  }
}
`,

  "cascader.module.css": `@layer pm.components {
  .pm-cascader {
    position: relative;
    display: inline-flex;
    flex-direction: column;
    width: auto;
    font-family: var(--pm-font-family-sans);
  }

  .pm-cascader--full-width {
    width: 100%;
  }

  .pm-cascader--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .pm-cascader__trigger {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-radius: var(--pm-radius-md);
    cursor: pointer;
    transition-property: border-color, box-shadow;
    transition-duration: var(--pm-transition-fast);
    font-family: inherit;
    background: none;
    text-align: left;
    gap: var(--pm-spacing-2);
  }

  .pm-cascader__trigger:focus-visible {
    outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
    outline-offset: var(--pm-focus-ring-offset);
  }

  .pm-cascader--outline .pm-cascader__trigger {
    border: 1px solid light-dark(var(--pm-color-neutral-300), var(--pm-color-neutral-600));
    background-color: transparent;
    color: light-dark(var(--pm-color-neutral-900), var(--pm-color-neutral-100));
  }

  .pm-cascader--filled .pm-cascader__trigger {
    border: 1px solid transparent;
    background-color: light-dark(var(--pm-color-neutral-100), var(--pm-color-neutral-800));
    color: light-dark(var(--pm-color-neutral-900), var(--pm-color-neutral-100));
  }

  .pm-cascader--unstyled .pm-cascader__trigger {
    border: none;
    background-color: transparent;
    color: light-dark(var(--pm-color-neutral-900), var(--pm-color-neutral-100));
  }

  .pm-cascader--xs .pm-cascader__trigger {
    padding: var(--pm-spacing-0-5) var(--pm-spacing-1-5);
    font-size: var(--pm-font-size-xs);
    height: calc(var(--pm-spacing-6));
  }

  .pm-cascader--sm .pm-cascader__trigger {
    padding: var(--pm-spacing-1) var(--pm-spacing-2);
    font-size: var(--pm-font-size-sm);
    height: calc(var(--pm-spacing-8));
  }

  .pm-cascader--md .pm-cascader__trigger {
    padding: var(--pm-spacing-2) var(--pm-spacing-3);
    font-size: var(--pm-font-size-md);
    height: calc(var(--pm-spacing-10));
  }

  .pm-cascader--lg .pm-cascader__trigger {
    padding: var(--pm-spacing-3) var(--pm-spacing-4);
    font-size: var(--pm-font-size-lg);
    height: calc(var(--pm-spacing-12));
  }

  .pm-cascader--invalid .pm-cascader__trigger {
    border-color: light-dark(var(--pm-color-danger-500), var(--pm-color-danger-400));
  }

  .pm-cascader__dropdown {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10;
    margin-top: var(--pm-spacing-1);
    border: 1px solid light-dark(var(--pm-color-neutral-200), var(--pm-color-neutral-700));
    border-radius: var(--pm-radius-md);
    background-color: light-dark(var(--pm-color-neutral-0), var(--pm-color-neutral-900));
    box-shadow: var(--pm-shadow-lg);
  }

  .pm-cascader--open .pm-cascader__dropdown {
    display: flex;
  }

  .pm-cascader__column {
    min-width: 140px;
    max-height: 240px;
    overflow-y: auto;
    padding: var(--pm-spacing-1) 0;
    border-right: 1px solid light-dark(var(--pm-color-neutral-200), var(--pm-color-neutral-700));
  }

  .pm-cascader__column:last-child {
    border-right: none;
  }

  .pm-cascader__option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--pm-spacing-2) var(--pm-spacing-3);
    cursor: pointer;
    font-size: var(--pm-font-size-sm);
    color: light-dark(var(--pm-color-neutral-700), var(--pm-color-neutral-300));
    transition: background-color var(--pm-transition-fast);
  }

  .pm-cascader__option:hover {
    background-color: light-dark(var(--pm-color-neutral-100), var(--pm-color-neutral-800));
  }

  .pm-cascader__option--active {
    background-color: light-dark(var(--pm-color-primary-50), var(--pm-color-primary-900));
    color: light-dark(var(--pm-color-primary-700), var(--pm-color-primary-200));
    font-weight: var(--pm-font-weight-medium);
  }

  .pm-cascader__option--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }

  .pm-cascader__placeholder {
    color: light-dark(var(--pm-color-neutral-400), var(--pm-color-neutral-500));
  }
}
`,
})

// ============================================================
// Update remaining types files with JSDoc for components
// that already have good CSS/classes
// ============================================================

// Label
writeComponent("label", {
  "label.types.ts": `import type { FormSize } from "../shared.types.js"

/** Options for generating label class names */
export interface LabelClassesOptions {
  /** Size of the label text */
  size?: FormSize
  /** Whether the associated control is disabled */
  disabled?: boolean
  /** Whether the associated control is required */
  required?: boolean
}

/** Props for the label component */
export interface LabelProps extends LabelClassesOptions {
  /** The id of the associated form control */
  htmlFor?: string
}
`,
})

// Form Control
writeComponent("form-control", {
  "form-control.types.ts": `/** Options for generating form control class names */
export interface FormCtrlClassesOptions {
  /** Layout orientation of label + input */
  orientation?: "vertical" | "horizontal"
  /** Whether the associated control is in an invalid state */
  invalid?: boolean
  /** Whether the associated control is disabled */
  disabled?: boolean
  /** Whether the associated control is required */
  required?: boolean
}

/** Props for the form control component */
export interface FormCtrlProps extends FormCtrlClassesOptions {
  /** Unique ID for the form control, used to connect label/input/helper */
  id?: string
  /** Label text */
  label?: string
  /** Helper text displayed below the input */
  helperText?: string
  /** Error message displayed when invalid */
  errorText?: string
}
`,
})

// Fieldset
writeComponent("fieldset", {
  "fieldset.types.ts": `/** Visual variant for fieldset */
export type FieldsetVariant = "default" | "card"

/** Options for generating fieldset class names */
export interface FieldsetClassesOptions {
  /** Visual variant */
  variant?: FieldsetVariant
  /** Whether the fieldset is disabled */
  disabled?: boolean
}

/** Props for the fieldset component */
export interface FieldsetProps extends FieldsetClassesOptions {
  /** Legend text displayed at the top of the fieldset */
  legend?: string
}
`,
})

// Form
writeComponent("form", {
  "form.types.ts": `/** Layout direction for the form */
export type FormLayout = "vertical" | "horizontal" | "inline"

/** Gap between form controls */
export type FormGap = "sm" | "md" | "lg"

/** Options for generating form class names */
export interface FormClassesOptions {
  /** Layout direction */
  layout?: FormLayout
  /** Gap between form controls */
  gap?: FormGap
}

/** Props for the form component */
export interface FormProps extends FormClassesOptions {
  /** Callback fired on form submission */
  onSubmit?: (event: Event) => void
  /** Whether to prevent default form submission */
  preventDefault?: boolean
}
`,
})

// Slider
writeComponent("slider", {
  "slider.types.ts": `import type { FormSize } from "../shared.types.js"

/** Orientation for the slider */
export type SliderOrientation = "horizontal" | "vertical"

/** Options for generating slider class names */
export interface SliderClassesOptions {
  /** Size of the slider */
  size?: FormSize
  /** Whether the slider is disabled */
  disabled?: boolean
  /** Orientation of the slider */
  orientation?: SliderOrientation
  /** Whether to show scale marks */
  showMarks?: boolean
}

/** Props for the slider component */
export interface SliderProps extends SliderClassesOptions {
  /** Minimum value */
  min?: number
  /** Maximum value */
  max?: number
  /** Step increment */
  step?: number
  /** Controlled value (single thumb) */
  value?: number
  /** Default value for uncontrolled usage */
  defaultValue?: number
  /** Whether this is a range slider (two thumbs) */
  range?: boolean
  /** Controlled range values [min, max] */
  rangeValue?: [number, number]
  /** Default range values for uncontrolled usage */
  defaultRangeValue?: [number, number]
  /** Mark positions with labels */
  marks?: Array<{ value: number; label?: string }>
  /** Whether to show a tooltip on the thumb */
  showTooltip?: boolean
  /** Whether the value is inverted */
  inverted?: boolean
  /** Name attribute for form submission */
  name?: string
  /** Callback fired when value changes */
  onChange?: (value: number) => void
  /** Callback fired when range values change */
  onRangeChange?: (value: [number, number]) => void
  /** Callback fired when thumb is released */
  onChangeEnd?: (value: number) => void
}
`,
})

// Rating
writeComponent("rating", {
  "rating.types.ts": `import type { FormSize } from "../shared.types.js"

/** Options for generating rating class names */
export interface RatingClassesOptions {
  /** Size of the rating stars */
  size?: FormSize
  /** Whether the rating is disabled */
  disabled?: boolean
  /** Whether the rating is read-only */
  readOnly?: boolean
}

/** Props for the rating component */
export interface RatingProps extends RatingClassesOptions {
  /** Number of rating items */
  count?: number
  /** Controlled value */
  value?: number
  /** Default value for uncontrolled usage */
  defaultValue?: number
  /** Whether to allow half-star ratings */
  allowHalf?: boolean
  /** Whether to allow clearing the rating */
  allowClear?: boolean
  /** Custom icon for filled state */
  filledIcon?: string
  /** Custom icon for empty state */
  emptyIcon?: string
  /** Name attribute for form submission */
  name?: string
  /** Callback fired when rating changes */
  onChange?: (value: number) => void
  /** Callback fired on hover */
  onHover?: (value: number) => void
}
`,

  "rating.css": `@layer pm.components {
  .pm-rating {
    --_pm-rating-filled-color: light-dark(var(--pm-color-warning-500), var(--pm-color-warning-400));
    --_pm-rating-empty-color: light-dark(var(--pm-color-neutral-300), var(--pm-color-neutral-600));

    display: inline-flex;
    align-items: center;
    gap: var(--pm-spacing-1);

    &.pm-rating--disabled {
      opacity: 0.5;
      cursor: not-allowed;
      pointer-events: none;
    }

    &.pm-rating--read-only {
      pointer-events: none;
    }
  }

  .pm-rating__item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    color: var(--_pm-rating-empty-color);
    transition-property: color, transform;
    transition-duration: var(--pm-transition-fast);

    &:hover:not(:disabled) {
      transform: scale(1.1);
    }

    &:focus-visible {
      outline: var(--pm-focus-ring-width) solid var(--pm-color-primary-500);
      outline-offset: var(--pm-focus-ring-offset);
      border-radius: var(--pm-radius-sm);
    }
  }

  .pm-rating__item--filled {
    color: var(--_pm-rating-filled-color);
  }

  .pm-rating__item--half {
    position: relative;
  }

  .pm-rating__item--half::before {
    content: "";
    position: absolute;
    inset: 0;
    width: 50%;
    overflow: hidden;
  }

  .pm-rating--xs .pm-rating__item {
    font-size: var(--pm-font-size-md);
  }

  .pm-rating--sm .pm-rating__item {
    font-size: var(--pm-font-size-lg);
  }

  .pm-rating--md .pm-rating__item {
    font-size: var(--pm-font-size-xl);
  }

  .pm-rating--lg .pm-rating__item {
    font-size: var(--pm-font-size-2xl);
  }

  /* ---- Theme overrides ---- */
  :where([data-theme="antd"]) .pm-rating {
    --_pm-rating-filled-color: #fadb14;
  }

  :where([data-theme="material"]) .pm-rating {
    --_pm-rating-filled-color: #ffb400;
  }

  :where([data-theme="bootstrap"]) .pm-rating {
    --_pm-rating-filled-color: #ffc107;
  }
}
`,
})

// File Upload
writeComponent("file-upload", {
  "file-upload.types.ts": `import type { FormSize } from "../shared.types.js"

/** Options for generating file upload class names */
export interface UploadClassesOptions {
  /** Size of the trigger button */
  size?: FormSize
  /** Whether the file upload is disabled */
  disabled?: boolean
}

/** Props for the file upload component */
export interface UploadProps extends UploadClassesOptions {
  /** Accepted file types (MIME types or extensions) */
  accept?: string
  /** Whether multiple files can be selected */
  multiple?: boolean
  /** Maximum file size in bytes */
  maxFileSize?: number
  /** Maximum number of files */
  maxFiles?: number
  /** Name attribute for form submission */
  name?: string
  /** Callback fired when files are selected */
  onChange?: (files: File[]) => void
  /** Callback fired when a file is rejected */
  onReject?: (file: File, reason: string) => void
  /** Callback fired when a file is removed from the list */
  onRemove?: (file: File) => void
}
`,
})

// Dropzone
writeComponent("dropzone", {
  "dropzone.types.ts": `/** Options for generating dropzone class names */
export interface DropzoneClassesOptions {
  /** Whether the dropzone is disabled */
  disabled?: boolean
  /** Whether a file is currently being dragged over */
  dragging?: boolean
  /** Whether files are being rejected during drag */
  rejecting?: boolean
}

/** Props for the dropzone component */
export interface DropzoneProps extends DropzoneClassesOptions {
  /** Accepted file types (MIME types or extensions) */
  accept?: string
  /** Whether multiple files can be dropped */
  multiple?: boolean
  /** Maximum file size in bytes */
  maxFileSize?: number
  /** Maximum number of files */
  maxFiles?: number
  /** Name attribute for form submission */
  name?: string
  /** Callback fired when files are dropped */
  onDrop?: (files: File[]) => void
  /** Callback fired when a file is rejected */
  onReject?: (file: File, reason: string) => void
  /** Callback fired when drag enters the zone */
  onDragEnter?: (event: DragEvent) => void
  /** Callback fired when drag leaves the zone */
  onDragLeave?: (event: DragEvent) => void
}
`,

  "dropzone.classes.ts": `import type { DropzoneClassesOptions } from "./dropzone.types.js"

const BASE = "pm-dropzone"

/**
 * Returns BEM class names for the dropzone component (human-readable).
 */
export function dropzoneClasses(options: DropzoneClassesOptions = {}): string {
  const { disabled = false, dragging = false, rejecting = false } = options
  const classes = [BASE]

  if (disabled) classes.push(\`\${BASE}--disabled\`)
  if (dragging) classes.push(\`\${BASE}--dragging\`)
  if (rejecting) classes.push(\`\${BASE}--rejecting\`)

  return classes.join(" ")
}

/**
 * Returns CSS module class names for the dropzone component (hashed).
 */
export function dropzoneModuleClasses(
  classMap: Record<string, string>,
  options: DropzoneClassesOptions = {},
): string {
  const { disabled = false, dragging = false, rejecting = false } = options

  const classes = [classMap["pm-dropzone"]]

  if (disabled) classes.push(classMap["pm-dropzone--disabled"])
  if (dragging) classes.push(classMap["pm-dropzone--dragging"])
  if (rejecting) classes.push(classMap["pm-dropzone--rejecting"])

  return classes.filter(Boolean).join(" ")
}
`,

  "dropzone.css": `@layer pm.components {
  .pm-dropzone {
    --_pm-dropzone-radius: var(--pm-radius-lg);
    --_pm-dropzone-hover-border: light-dark(var(--pm-color-primary-400), var(--pm-color-primary-500));
    --_pm-dropzone-hover-bg: light-dark(var(--pm-color-primary-50), var(--pm-color-primary-950));

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--pm-spacing-2);
    border: 2px dashed light-dark(var(--pm-color-neutral-300), var(--pm-color-neutral-600));
    border-radius: var(--_pm-dropzone-radius);
    padding: var(--pm-spacing-8);
    text-align: center;
    transition-property: border-color, background-color;
    transition-duration: var(--pm-transition-fast);
    cursor: pointer;

    &:hover:not(.pm-dropzone--disabled) {
      border-color: var(--_pm-dropzone-hover-border);
      background-color: var(--_pm-dropzone-hover-bg);
    }

    &.pm-dropzone--dragging {
      border-color: var(--_pm-dropzone-hover-border);
      background-color: var(--_pm-dropzone-hover-bg);
      border-style: solid;
    }

    &.pm-dropzone--rejecting {
      border-color: light-dark(var(--pm-color-danger-500), var(--pm-color-danger-400));
      background-color: light-dark(var(--pm-color-danger-50), var(--pm-color-danger-950));
    }

    &.pm-dropzone--disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  .pm-dropzone__icon {
    color: light-dark(var(--pm-color-neutral-400), var(--pm-color-neutral-500));
    font-size: var(--pm-font-size-2xl);
  }

  .pm-dropzone__text {
    font-family: var(--pm-font-family-sans);
    font-size: var(--pm-font-size-sm);
    color: light-dark(var(--pm-color-neutral-500), var(--pm-color-neutral-400));
  }

  .pm-dropzone__text strong {
    color: light-dark(var(--pm-color-primary-600), var(--pm-color-primary-400));
    font-weight: var(--pm-font-weight-medium);
  }

  .pm-dropzone__hint {
    font-family: var(--pm-font-family-sans);
    font-size: var(--pm-font-size-xs);
    color: light-dark(var(--pm-color-neutral-400), var(--pm-color-neutral-500));
  }

  /* ---- Theme overrides ---- */
  :where([data-theme="antd"]) .pm-dropzone {
    --_pm-dropzone-radius: 4px;
    --_pm-dropzone-hover-border: #1677ff;
    --_pm-dropzone-hover-bg: #e6f4ff;
  }

  :where([data-theme="material"]) .pm-dropzone {
    --_pm-dropzone-radius: 12px;
  }

  :where([data-theme="bootstrap"]) .pm-dropzone {
    --_pm-dropzone-radius: 6px;
    --_pm-dropzone-hover-border: #0d6efd;
  }
}
`,
})

// Transfer
writeComponent("transfer", {
  "transfer.types.ts": `import type { FormSize } from "../shared.types.js"

/** A single transfer item */
export interface TransferItem {
  /** Unique key */
  key: string
  /** Display label */
  label: string
  /** Whether this item is disabled */
  disabled?: boolean
  /** Optional description */
  description?: string
}

/** Options for generating transfer class names */
export interface TransferClassesOptions {
  /** Size of the transfer */
  size?: FormSize
  /** Whether the transfer is disabled */
  disabled?: boolean
}

/** Props for the transfer component */
export interface TransferProps extends TransferClassesOptions {
  /** All available items */
  dataSource?: TransferItem[]
  /** Keys of items in the target list */
  targetKeys?: string[]
  /** Default target keys for uncontrolled usage */
  defaultTargetKeys?: string[]
  /** Title for the source list */
  sourceTitle?: string
  /** Title for the target list */
  targetTitle?: string
  /** Whether to show a search input in each list */
  searchable?: boolean
  /** Whether to show the select all checkbox */
  showSelectAll?: boolean
  /** Callback fired when target keys change */
  onChange?: (targetKeys: string[]) => void
  /** Callback fired when search input changes */
  onSearch?: (direction: "source" | "target", query: string) => void
}
`,
})

// Select
writeComponent("select", {
  "select.types.ts": `import type { FormSize, InputVariant } from "../shared.types.js"

/** A single select option */
export interface SelectOption {
  /** Option value */
  value: string
  /** Display label */
  label: string
  /** Whether this option is disabled */
  disabled?: boolean
  /** Optional group label for grouped options */
  group?: string
}

/** Options for generating select class names */
export interface SelectClassesOptions {
  /** Visual variant */
  variant?: InputVariant
  /** Size of the select */
  size?: FormSize
  /** Whether the select is in an invalid state */
  invalid?: boolean
  /** Whether the select is disabled */
  disabled?: boolean
  /** Whether the dropdown is open */
  open?: boolean
  /** Whether the select takes full width */
  fullWidth?: boolean
}

/** Props for the select component */
export interface SelectProps extends SelectClassesOptions {
  /** Controlled value */
  value?: string
  /** Default value for uncontrolled usage */
  defaultValue?: string
  /** Placeholder text */
  placeholder?: string
  /** Available options */
  options?: SelectOption[]
  /** Whether the value can be cleared */
  clearable?: boolean
  /** Whether to allow searching/filtering options */
  searchable?: boolean
  /** Name attribute for form submission */
  name?: string
  /** Whether the select is required */
  required?: boolean
  /** Callback fired when value changes */
  onChange?: (value: string) => void
  /** Callback fired when the dropdown opens/closes */
  onOpenChange?: (open: boolean) => void
  /** Callback fired when search query changes */
  onSearch?: (query: string) => void
}
`,
})

// Native Select
writeComponent("native-select", {
  "native-select.types.ts": `import type { FormSize, InputVariant } from "../shared.types.js"

/** Options for generating native select class names */
export interface NativeSelClassesOptions {
  /** Visual variant */
  variant?: InputVariant
  /** Size of the select */
  size?: FormSize
  /** Whether the select is in an invalid state */
  invalid?: boolean
  /** Whether the select is disabled */
  disabled?: boolean
  /** Whether the select takes full width */
  fullWidth?: boolean
}

/** Props for the native select component */
export interface NativeSelProps extends NativeSelClassesOptions {
  /** Controlled value */
  value?: string
  /** Default value for uncontrolled usage */
  defaultValue?: string
  /** Placeholder text (shown as first disabled option) */
  placeholder?: string
  /** Name attribute for form submission */
  name?: string
  /** Whether the select is required */
  required?: boolean
  /** Whether multiple options can be selected */
  multiple?: boolean
  /** Callback fired when value changes */
  onChange?: (event: Event) => void
}
`,
})

// Multi Select
writeComponent("multi-select", {
  "multi-select.types.ts": `import type { FormSize, InputVariant } from "../shared.types.js"

/** Options for generating multi select class names */
export interface MultiSelClassesOptions {
  /** Visual variant */
  variant?: InputVariant
  /** Size of the multi select */
  size?: FormSize
  /** Whether the multi select is in an invalid state */
  invalid?: boolean
  /** Whether the multi select is disabled */
  disabled?: boolean
  /** Whether the dropdown is open */
  open?: boolean
  /** Whether the multi select takes full width */
  fullWidth?: boolean
}

/** Props for the multi select component */
export interface MultiSelProps extends MultiSelClassesOptions {
  /** Controlled selected values */
  value?: string[]
  /** Default values for uncontrolled usage */
  defaultValue?: string[]
  /** Placeholder text */
  placeholder?: string
  /** Available options */
  options?: Array<{ value: string; label: string; disabled?: boolean }>
  /** Maximum number of selections */
  maxSelections?: number
  /** Whether the selection can be cleared */
  clearable?: boolean
  /** Whether to allow searching/filtering options */
  searchable?: boolean
  /** Whether tags can be removed */
  removable?: boolean
  /** Name attribute for form submission */
  name?: string
  /** Callback fired when values change */
  onChange?: (values: string[]) => void
  /** Callback fired when the dropdown opens/closes */
  onOpenChange?: (open: boolean) => void
  /** Callback fired when search query changes */
  onSearch?: (query: string) => void
}
`,
})

// Combobox
writeComponent("combobox", {
  "combobox.types.ts": `import type { FormSize, InputVariant } from "../shared.types.js"

/** Options for generating combobox class names */
export interface ComboboxClassesOptions {
  /** Visual variant */
  variant?: InputVariant
  /** Size of the combobox */
  size?: FormSize
  /** Whether the combobox is in an invalid state */
  invalid?: boolean
  /** Whether the combobox is disabled */
  disabled?: boolean
  /** Whether the dropdown is open */
  open?: boolean
  /** Whether the combobox takes full width */
  fullWidth?: boolean
}

/** Props for the combobox component */
export interface ComboboxProps extends ComboboxClassesOptions {
  /** Controlled value */
  value?: string
  /** Default value for uncontrolled usage */
  defaultValue?: string
  /** Placeholder text */
  placeholder?: string
  /** Available options */
  options?: Array<{ value: string; label: string; disabled?: boolean }>
  /** Whether to allow custom values not in the list */
  allowCustomValue?: boolean
  /** Whether the value can be cleared */
  clearable?: boolean
  /** Message shown when no results match */
  emptyMessage?: string
  /** Name attribute for form submission */
  name?: string
  /** Whether the combobox is required */
  required?: boolean
  /** Callback fired when value changes */
  onChange?: (value: string) => void
  /** Callback fired when the dropdown opens/closes */
  onOpenChange?: (open: boolean) => void
  /** Callback fired when the input text changes */
  onInputChange?: (query: string) => void
}
`,
})

// Calendar
writeComponent("calendar", {
  "calendar.types.ts": `import type { FormSize } from "../shared.types.js"

/** Options for generating calendar class names */
export interface CalendarClassesOptions {
  /** Size of the calendar */
  size?: FormSize
  /** Whether the calendar is disabled */
  disabled?: boolean
}

/** Props for the calendar component */
export interface CalendarProps extends CalendarClassesOptions {
  /** Controlled selected date */
  value?: Date
  /** Default date for uncontrolled usage */
  defaultValue?: Date
  /** Minimum selectable date */
  minDate?: Date
  /** Maximum selectable date */
  maxDate?: Date
  /** Dates to disable */
  disabledDates?: Date[] | ((date: Date) => boolean)
  /** First day of the week (0 = Sunday, 1 = Monday) */
  firstDayOfWeek?: 0 | 1
  /** Number of months to display */
  numberOfMonths?: number
  /** Whether to allow range selection */
  range?: boolean
  /** Controlled range value */
  rangeValue?: [Date | null, Date | null]
  /** Default range value for uncontrolled usage */
  defaultRangeValue?: [Date | null, Date | null]
  /** Callback fired when date is selected */
  onChange?: (date: Date) => void
  /** Callback fired when range is selected */
  onRangeChange?: (range: [Date | null, Date | null]) => void
  /** Callback fired when the viewed month changes */
  onMonthChange?: (month: Date) => void
}
`,
})

// Date Picker
writeComponent("date-picker", {
  "date-picker.types.ts": `import type { FormSize, InputVariant } from "../shared.types.js"

/** Options for generating date picker class names */
export interface DatepickerClassesOptions {
  /** Visual variant */
  variant?: InputVariant
  /** Size of the date picker */
  size?: FormSize
  /** Whether the date picker is in an invalid state */
  invalid?: boolean
  /** Whether the date picker is disabled */
  disabled?: boolean
  /** Whether the calendar popover is open */
  open?: boolean
  /** Whether the date picker takes full width */
  fullWidth?: boolean
}

/** Props for the date picker component */
export interface DatepickerProps extends DatepickerClassesOptions {
  /** Controlled value */
  value?: Date
  /** Default value for uncontrolled usage */
  defaultValue?: Date
  /** Placeholder text */
  placeholder?: string
  /** Date format string */
  format?: string
  /** Minimum selectable date */
  minDate?: Date
  /** Maximum selectable date */
  maxDate?: Date
  /** Dates to disable */
  disabledDates?: Date[] | ((date: Date) => boolean)
  /** Whether the value can be cleared */
  clearable?: boolean
  /** Whether the input is read-only (calendar only) */
  readOnly?: boolean
  /** Name attribute for form submission */
  name?: string
  /** Callback fired when date changes */
  onChange?: (date: Date | null) => void
  /** Callback fired when popover opens/closes */
  onOpenChange?: (open: boolean) => void
}
`,
})

// Date Range Picker
writeComponent("date-range-picker", {
  "date-range-picker.types.ts": `import type { FormSize, InputVariant } from "../shared.types.js"

/** Options for generating date range picker class names */
export interface DaterangeClassesOptions {
  /** Visual variant */
  variant?: InputVariant
  /** Size of the date range picker */
  size?: FormSize
  /** Whether the date range picker is in an invalid state */
  invalid?: boolean
  /** Whether the date range picker is disabled */
  disabled?: boolean
  /** Whether the calendar popover is open */
  open?: boolean
  /** Whether the date range picker takes full width */
  fullWidth?: boolean
}

/** Props for the date range picker component */
export interface DaterangeProps extends DaterangeClassesOptions {
  /** Controlled range value [start, end] */
  value?: [Date | null, Date | null]
  /** Default range value for uncontrolled usage */
  defaultValue?: [Date | null, Date | null]
  /** Placeholder text for start date */
  startPlaceholder?: string
  /** Placeholder text for end date */
  endPlaceholder?: string
  /** Date format string */
  format?: string
  /** Minimum selectable date */
  minDate?: Date
  /** Maximum selectable date */
  maxDate?: Date
  /** Whether the value can be cleared */
  clearable?: boolean
  /** Number of calendar months to show */
  numberOfMonths?: number
  /** Name attribute for form submission */
  name?: string
  /** Callback fired when range changes */
  onChange?: (range: [Date | null, Date | null]) => void
  /** Callback fired when popover opens/closes */
  onOpenChange?: (open: boolean) => void
}
`,
})

// Time Picker
writeComponent("time-picker", {
  "time-picker.types.ts": `import type { FormSize, InputVariant } from "../shared.types.js"

/** Time format */
export type TimeFormat = "12h" | "24h"

/** Options for generating time picker class names */
export interface TimepickerClassesOptions {
  /** Visual variant */
  variant?: InputVariant
  /** Size of the time picker */
  size?: FormSize
  /** Whether the time picker is in an invalid state */
  invalid?: boolean
  /** Whether the time picker is disabled */
  disabled?: boolean
  /** Whether the dropdown is open */
  open?: boolean
  /** Whether the time picker takes full width */
  fullWidth?: boolean
}

/** Props for the time picker component */
export interface TimepickerProps extends TimepickerClassesOptions {
  /** Controlled value as a string (e.g. "14:30") */
  value?: string
  /** Default value for uncontrolled usage */
  defaultValue?: string
  /** Placeholder text */
  placeholder?: string
  /** Time format */
  format?: TimeFormat
  /** Whether to show seconds */
  withSeconds?: boolean
  /** Step interval for minutes */
  minuteStep?: number
  /** Step interval for seconds */
  secondStep?: number
  /** Minimum allowed time */
  minTime?: string
  /** Maximum allowed time */
  maxTime?: string
  /** Whether the value can be cleared */
  clearable?: boolean
  /** Name attribute for form submission */
  name?: string
  /** Callback fired when time changes */
  onChange?: (time: string) => void
  /** Callback fired when the dropdown opens/closes */
  onOpenChange?: (open: boolean) => void
}
`,
})

console.log("\\nAll form component types, classes, CSS, and module.css files generated successfully!")
