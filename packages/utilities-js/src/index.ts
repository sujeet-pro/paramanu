// @paramanu/utilities-js — Utilities & Providers

// Visually Hidden
export {
  visuallyHiddenClasses,
  visuallyHiddenModuleClasses,
} from "./visually-hidden/visually-hidden.classes.js"
export type { VisuallyHiddenClassesOptions } from "./visually-hidden/visually-hidden.types.js"

// Skip Nav
export {
  skipNavClasses,
  skipNavTargetClasses,
  skipNavModuleClasses,
  skipNavTargetModuleClasses,
} from "./skip-nav/skip-nav.classes.js"

// Show/Hide
export { showHideClasses, showHideModuleClasses } from "./show-hide/show-hide.classes.js"
export type { ShowHideDisplay, ShowHideClassesOptions } from "./show-hide/show-hide.types.js"

// Affix
export { affixClasses, affixModuleClasses } from "./affix/affix.classes.js"
export type { AffixPosition, AffixClassesOptions } from "./affix/affix.types.js"

// Focus Trap
export { createFocusTrap, FOCUSABLE_SELECTOR } from "./focus-trap/focus-trap.js"
export type { FocusTrapOptions, FocusTrapInstance } from "./focus-trap/focus-trap.types.js"

// Portal
export { createPortal } from "./portal/portal.js"
export type { PortalOptions, PortalInstance } from "./portal/portal.types.js"

// Presence
export { createPresence } from "./presence/presence.js"
export { presenceClasses, presenceModuleClasses } from "./presence/presence.classes.js"
export type {
  PresenceState,
  PresenceOptions,
  PresenceInstance,
  PresenceClassesOptions,
} from "./presence/presence.types.js"

// Theme Provider
export { setTheme, getTheme, clearTheme } from "./theme-provider/theme-provider.js"
export {
  themeProviderClasses,
  themeProviderModuleClasses,
} from "./theme-provider/theme-provider.classes.js"
export type { ThemeMode, ThemeProviderOptions } from "./theme-provider/theme-provider.types.js"

// Direction Provider
export { setDirection, getDirection } from "./direction-provider/direction-provider.js"
export type { Direction } from "./direction-provider/direction-provider.types.js"

// Locale Provider
export { setLocale, getLocale } from "./locale-provider/locale-provider.js"
export type { LocaleOptions } from "./locale-provider/locale-provider.types.js"

// Client Only
export { isClient } from "./client-only/client-only.js"

// Format Number
export { formatNumber } from "./format-number/format-number.js"
export type { FormatNumberOptions } from "./format-number/format-number.types.js"

// Format Byte
export { formatByte } from "./format-byte/format-byte.js"
export type { FormatByteOptions } from "./format-byte/format-byte.types.js"
