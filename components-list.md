# Design System Components

Components organized into packages by usage affinity. Items commonly used together are grouped in the same package.

---

## Package Dependency Graph

All `-js` packages depend on `@paramanu/tokens`. All `-react` packages depend on their corresponding `-js` package and peer-depend on `react`/`react-dom`. The cross-package dependencies below are **in addition** to those baseline deps.

```
Level 0 — Foundation
  tokens

Level 1 — Core (no cross-package deps)
  primitives-js
  typography-js
  utilities-js

  primitives-react
  typography-react
  utilities-react

Level 2 — Component packages
  buttons-js       → primitives-js
  data-display-js  → primitives-js, typography-js
  feedback-js      → primitives-js, typography-js, buttons-js
  forms-js         → primitives-js, typography-js, buttons-js
  navigation-js    → primitives-js, typography-js, buttons-js
  disclosure-js    → primitives-js, buttons-js

  buttons-react       → primitives-react
  data-display-react  → primitives-react, typography-react
  feedback-react      → primitives-react, typography-react, buttons-react
  forms-react         → primitives-react, typography-react, buttons-react
  navigation-react    → primitives-react, typography-react, buttons-react
  disclosure-react    → primitives-react, buttons-react

Level 3 — Higher-level packages
  overlays-js      → primitives-js, typography-js, buttons-js, utilities-js

  overlays-react   → primitives-react, typography-react, buttons-react, utilities-react
```

### Why each dependency exists

| Package | Depends on | Reason |
|---|---|---|
| `buttons-js` | `primitives-js` | Button Group uses Group/Flex layout |
| `data-display-js` | `primitives-js` | Card, Table use Box/Flex for structure |
| `data-display-js` | `typography-js` | Stat, Badge, Tag use Text for formatting |
| `feedback-js` | `primitives-js` | Alert, Toast use Flex/Stack for layout |
| `feedback-js` | `typography-js` | Alert messages, Banner text use Text |
| `feedback-js` | `buttons-js` | Dismissible alerts/toasts use Close Button |
| `forms-js` | `primitives-js` | Form/Field layout uses Stack/Flex |
| `forms-js` | `typography-js` | Label, help text, error text use Text |
| `forms-js` | `buttons-js` | Search Input clear, File Upload trigger |
| `navigation-js` | `primitives-js` | Nav, Sidebar use Flex/Stack for layout |
| `navigation-js` | `typography-js` | Link, Breadcrumb use Text styles |
| `navigation-js` | `buttons-js` | Menu items share button interaction patterns |
| `disclosure-js` | `primitives-js` | Accordion uses Stack for panel layout |
| `disclosure-js` | `buttons-js` | Accordion/Collapsible triggers are buttons |
| `overlays-js` | `primitives-js` | Dialog, Drawer use Box/Flex for layout |
| `overlays-js` | `typography-js` | Dialog headings, Tooltip text |
| `overlays-js` | `buttons-js` | Dialog close button, action buttons |
| `overlays-js` | `utilities-js` | Portal, Focus Trap, Presence for floating UI |

---

## `primitives` — Layout & Base Building Blocks
**Packages:** `@paramanu/primitives-js` · `@paramanu/primitives-react`
**Dependencies:** `tokens`

Low-level layout primitives and structural components used everywhere. This is a foundational package — most other component packages depend on it for layout.

- [x] Box
- [x] Flex
- [x] Stack (HStack / VStack)
- [x] Grid
- [x] SimpleGrid
- [x] Container
- [x] Center
- [x] Wrap
- [x] Group
- [x] Spacer
- [x] Divider / Separator
- [x] Aspect Ratio
- [x] Scroll Area
- [x] Bleed
- [x] Float
- [x] Splitter / Resizable
- [x] AppShell / Page Layout
- [x] Masonry

---

## `typography` — Text & Content Formatting
**Packages:** `@paramanu/typography-js` · `@paramanu/typography-react`
**Dependencies:** `tokens`

Everything related to rendering and styling text. Foundational package — used by most component packages for text content.

- [x] Text
- [x] Heading
- [x] Blockquote
- [x] Prose (long-form content)
- [x] Code / Code Block
- [x] Kbd (keyboard key)
- [x] Highlight
- [x] Mark
- [x] Truncate
- [x] List (ordered / unordered)

---

## `buttons` — Buttons & Action Triggers
**Packages:** `@paramanu/buttons-js` · `@paramanu/buttons-react`
**Dependencies:** `tokens`, `primitives-js`

All clickable action components. Close Button is reused by feedback (dismissible alerts) and overlays (dialog close).

- [x] Button
- [x] Button Group
- [x] Icon Button
- [x] Close Button
- [x] Toggle Button
- [x] Toggle Group
- [x] Floating Action Button (FAB)

---

## `forms` — Form Controls & Data Entry
**Packages:** `@paramanu/forms-js` · `@paramanu/forms-react`
**Dependencies:** `tokens`, `primitives-js`, `typography-js`, `buttons-js`

All input components and form structure elements. Uses primitives for form layout, typography for labels/help text, and buttons for embedded actions (e.g., search clear, file upload trigger).

### Text Input
- [x] Input / Text Input
- [x] Textarea
- [x] Password Input
- [x] Number Input
- [x] Pin Input / OTP Input
- [x] Search Input
- [x] Tags Input
- [x] Editable Text (inline editing)
- [x] Mentions

### Selection Controls
- [x] Checkbox
- [x] Checkbox Card
- [x] Radio / Radio Group
- [x] Radio Card
- [x] Switch / Toggle
- [x] Segmented Control

### Dropdowns & Pickers
- [x] Select
- [x] Native Select
- [x] Multi Select
- [x] Combobox / Autocomplete
- [x] Date Picker
- [x] Date Range Picker
- [x] Time Picker
- [x] Calendar
- [x] Color Picker / Color Swatch
- [x] Cascader (hierarchical select)

### Range & Rating
- [x] Slider / Range
- [x] Rating (star rating)

### File Input
- [x] File Upload
- [x] Dropzone (drag & drop upload)

### Form Structure
- [x] Form
- [x] Form Control / Field
- [x] Label
- [x] Fieldset
- [x] Transfer (dual list)

---

## `navigation` — Navigation & Wayfinding
**Packages:** `@paramanu/navigation-js` · `@paramanu/navigation-react`
**Dependencies:** `tokens`, `primitives-js`, `typography-js`, `buttons-js`

Components for moving around an application. Uses primitives for nav layout, typography for link/breadcrumb text, and buttons for interactive menu items.

- [x] Navbar / Navigation Menu
- [x] Sidebar / Side Navigation
- [x] Menu
- [x] Menubar
- [x] Dropdown Menu
- [x] Context Menu (right-click)
- [x] Breadcrumbs
- [x] Tabs
- [x] Pagination
- [x] Steps / Stepper
- [x] Link
- [x] Tree View
- [x] Skip Nav Link (a11y)
- [x] Back to Top

---

## `data-display` — Data Display & Visualization
**Packages:** `@paramanu/data-display-js` · `@paramanu/data-display-react`
**Dependencies:** `tokens`, `primitives-js`, `typography-js`

Components for presenting data and content to users. Uses primitives for Card/Table structure and typography for text formatting in stats, badges, and labels.

### Cards & Containers
- [x] Card
- [x] Tile

### Tables & Lists
- [x] Table
- [x] Data Table (sortable, filterable)
- [x] Data Grid
- [x] Data List / Description List
- [x] Structured List
- [x] Timeline

### Media & Identity
- [x] Avatar
- [x] Avatar Group / Stack
- [x] Image
- [x] Icon
- [x] QR Code
- [x] Embed (iframe)

### Status & Metadata
- [x] Badge
- [x] Tag / Chip
- [x] Statistic / Stat
- [x] Empty State / Blankslate
- [x] Clipboard (copy to clipboard)

---

## `feedback` — Feedback & Status Indicators
**Packages:** `@paramanu/feedback-js` · `@paramanu/feedback-react`
**Dependencies:** `tokens`, `primitives-js`, `typography-js`, `buttons-js`

Components that communicate state, progress, or notifications. Uses primitives for alert/toast layout, typography for message text, and buttons for dismissible close actions.

### Notifications & Alerts
- [x] Alert
- [x] Toast / Snackbar
- [x] Notification
- [x] Banner
- [x] Inline Message

### Progress & Loading
- [x] Progress Bar (linear)
- [x] Circular Progress
- [x] Spinner / Loader
- [x] Skeleton
- [x] Loading Overlay
- [x] NProgress (page-level progress bar)

---

## `overlays` — Overlays & Floating UI
**Packages:** `@paramanu/overlays-js` · `@paramanu/overlays-react`
**Dependencies:** `tokens`, `primitives-js`, `typography-js`, `buttons-js`, `utilities-js`

Modal, popover, and tooltip components that float above the page. Uses primitives for dialog/drawer layout, typography for headings/content, buttons for close/action buttons, and utilities for Portal, Focus Trap, and Presence animations.

- [x] Dialog / Modal
- [x] Alert Dialog (confirmation)
- [x] Drawer
- [x] Sheet (bottom sheet)
- [x] Popover
- [x] Tooltip
- [x] Hover Card
- [x] Inline Dialog
- [x] Backdrop / Blanket
- [x] Command Palette / Spotlight

---

## `disclosure` — Disclosure & Collapsible Content
**Packages:** `@paramanu/disclosure-js` · `@paramanu/disclosure-react`
**Dependencies:** `tokens`, `primitives-js`, `buttons-js`

Components that show/hide content. Uses primitives for panel layout and buttons for disclosure triggers (accordion headers, collapsible toggles).

- [x] Accordion
- [x] Collapsible / Collapse
- [x] Carousel / Slider
- [x] Tour (product walkthrough)

---

## `utilities` — Utilities & Providers
**Packages:** `@paramanu/utilities-js` · `@paramanu/utilities-react`
**Dependencies:** `tokens`

Invisible components for behavior, a11y, and theming infrastructure. Foundational package — used by overlays for Portal/Focus Trap and by other packages for animation (Presence).

### Accessibility
- [x] Visually Hidden
- [x] Focus Trap
- [x] Skip Nav

### Rendering & Behavior
- [x] Portal
- [x] Presence (mount/unmount animations)
- [x] Show / Hide (conditional rendering)
- [x] Client Only

### Providers & Context
- [x] Theme Provider
- [x] Direction Provider (RTL/LTR)
- [x] Locale Provider (i18n)

### Formatting
- [x] Format Number
- [x] Format Byte

### Positioning
- [x] Affix (sticky positioning)
