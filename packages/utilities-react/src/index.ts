// @paramanu/utilities-react — React wrappers for utility components

// Visually Hidden
export { SrOnly } from "./visually-hidden/visually-hidden.js"
export type { ReactSrOnlyProps } from "./visually-hidden/visually-hidden.js"

// Skip Nav
export { SkipNav, SkipNavTarget } from "./skip-nav/skip-nav.js"
export type { ReactSkipNavProps, ReactSkipNavTargetProps } from "./skip-nav/skip-nav.js"

// Show/Hide
export { ShowHide } from "./show-hide/show-hide.js"
export type { ReactShowHideProps } from "./show-hide/show-hide.js"

// Affix
export { Affix } from "./affix/affix.js"
export type { ReactAffixProps } from "./affix/affix.js"

// Focus Trap
export { FocusTrap, useFocusTrap } from "./focus-trap/focus-trap.js"
export type { ReactFocusTrapProps, UseFocusTrapOptions } from "./focus-trap/focus-trap.js"

// Portal
export { Portal } from "./portal/portal.js"
export type { ReactPortalProps } from "./portal/portal.js"

// Presence
export { Presence, usePresence } from "./presence/presence.js"
export type {
  ReactPresenceProps,
  UsePresenceOptions,
  UsePresenceReturn,
} from "./presence/presence.js"

// Theme Provider
export { Theme, useTheme } from "./theme-provider/theme-provider.js"
export type { ReactThemeProps } from "./theme-provider/theme-provider.js"

// Direction Provider
export { DirectionProvider, useDirection } from "./direction-provider/direction-provider.js"
export type { ReactDirectionProviderProps } from "./direction-provider/direction-provider.js"

// Locale Provider
export { LocaleProvider, useLocale } from "./locale-provider/locale-provider.js"
export type { ReactLocaleProviderProps } from "./locale-provider/locale-provider.js"

// Client Only
export { ClientOnly, useIsClient } from "./client-only/client-only.js"
export type { ReactClientOnlyProps } from "./client-only/client-only.js"

// Format Number
export { FormatNumber } from "./format-number/format-number.js"
export type { ReactFormatNumberProps } from "./format-number/format-number.js"

// Format Byte
export { FormatByte } from "./format-byte/format-byte.js"
export type { ReactFormatByteProps } from "./format-byte/format-byte.js"

// Re-export pure utilities and key types from @paramanu/utilities-js
export { formatNumber, formatByte, isClient } from "@paramanu/utilities-js"
export type {
  ThemeMode,
  Direction,
  PresenceState,
  FormatNumberOptions,
  FormatByteOptions,
} from "@paramanu/utilities-js"
