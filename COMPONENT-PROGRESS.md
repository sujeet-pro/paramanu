# Component Implementation Progress

Track the implementation status of every component in the Paramanu design system.

**Legend:**
- [ ] Not started / basic scaffold only
- [~] In progress (being researched/updated)
- [x] Complete (researched, implemented, themed)

**Last updated:** 2026-02-18

---

## `primitives-js` / `primitives-react` — Layout & Base Building Blocks
**Dependencies:** `tokens` | **Total lines:** 6,060 (JS) + 2,888 (React) = 8,948

| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 1 | Box | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 2 | Flex | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 3 | Stack (HStack/VStack) | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 4 | Grid | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 5 | SimpleGrid | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 6 | Container | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 7 | Center | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 8 | Wrap | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 9 | Group | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 10 | Spacer | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 11 | Divider / Separator | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 12 | Aspect Ratio | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 13 | Scroll Area | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 14 | Bleed | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 15 | Float | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 16 | Splitter / Resizable | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 17 | AppShell / Page Layout | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 18 | Masonry | [x] | [x] | [x] | [x] | [x] | [x] | complete |

---

## `typography-js` / `typography-react` — Text & Content Formatting
**Dependencies:** `tokens` | **Total lines:** 4,237 (JS) + 1,039 (React) = 5,276

| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 1 | Text | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 2 | Heading | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 3 | Blockquote | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 4 | Prose | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 5 | Code / Code Block | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 6 | Kbd | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 7 | Highlight | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 8 | Mark | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 9 | Truncate | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 10 | List | [x] | [x] | [x] | [x] | [x] | [x] | complete |

---

## `buttons-js` / `buttons-react` — Buttons & Action Triggers
**Dependencies:** `tokens`, `primitives-js` | **Total lines:** 3,910 (JS) + 1,219 (React) = 5,129

| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 1 | Button | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 2 | Button Group | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 3 | Icon Button | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 4 | Close Button | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 5 | Toggle Button | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 6 | Toggle Group | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 7 | Floating Action Button (FAB) | [x] | [x] | [x] | [x] | [x] | [x] | complete |

---

## `forms-js` / `forms-react` — Form Controls & Data Entry
**Dependencies:** `tokens`, `primitives-js`, `typography-js`, `buttons-js` | **Total lines:** 13,442 (JS) + 4,122 (React) = 17,564

### Text Input
| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 1 | Input / Text Input | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 2 | Textarea | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 3 | Password Input | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 4 | Number Input | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 5 | Pin Input / OTP Input | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 6 | Search Input | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 7 | Tags Input | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 8 | Editable Text | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 9 | Mentions | [x] | [x] | [x] | [x] | [x] | [x] | complete |

### Selection Controls
| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 10 | Checkbox | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 11 | Checkbox Card | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 12 | Radio / Radio Group | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 13 | Radio Card | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 14 | Switch / Toggle | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 15 | Segmented Control | [x] | [x] | [x] | [x] | [x] | [x] | complete |

### Dropdowns & Pickers
| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 16 | Select | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 17 | Native Select | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 18 | Multi Select | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 19 | Combobox / Autocomplete | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 20 | Date Picker | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 21 | Date Range Picker | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 22 | Time Picker | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 23 | Calendar | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 24 | Color Picker / Color Swatch | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 25 | Cascader | [x] | [x] | [x] | [x] | [x] | [x] | complete |

### Range & Rating
| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 26 | Slider / Range | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 27 | Rating | [x] | [x] | [x] | [x] | [x] | [x] | complete |

### File Input
| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 28 | File Upload | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 29 | Dropzone | [x] | [x] | [x] | [x] | [x] | [x] | complete |

### Form Structure
| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 30 | Form | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 31 | Form Control / Field | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 32 | Label | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 33 | Fieldset | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 34 | Transfer | [x] | [x] | [x] | [x] | [x] | [x] | complete |

---

## `navigation-js` / `navigation-react` — Navigation & Wayfinding
**Dependencies:** `tokens`, `primitives-js`, `typography-js`, `buttons-js` | **Total lines:** 6,845 (JS) + 3,186 (React) = 10,031

| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 1 | Navbar / Navigation Menu | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 2 | Sidebar / Side Navigation | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 3 | Menu | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 4 | Menubar | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 5 | Dropdown Menu | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 6 | Context Menu | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 7 | Breadcrumbs | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 8 | Tabs | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 9 | Pagination | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 10 | Steps / Stepper | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 11 | Link | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 12 | Tree View | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 13 | Skip Nav Link | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 14 | Back to Top | [x] | [x] | [x] | [x] | [x] | [x] | complete |

---

## `data-display-js` / `data-display-react` — Data Display & Visualization
**Dependencies:** `tokens`, `primitives-js`, `typography-js` | **Total lines:** 8,885 (JS) + 2,861 (React) = 11,746

### Cards & Containers
| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 1 | Card | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 2 | Tile | [x] | [x] | [x] | [x] | [x] | [x] | complete |

### Tables & Lists
| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 3 | Table | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 4 | Data Table | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 5 | Data Grid | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 6 | Data List / Description List | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 7 | Structured List | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 8 | Timeline | [x] | [x] | [x] | [x] | [x] | [x] | complete |

### Media & Identity
| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 9 | Avatar | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 10 | Avatar Group / Stack | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 11 | Image | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 12 | Icon | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 13 | QR Code | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 14 | Embed | [x] | [x] | [x] | [x] | [x] | [x] | complete |

### Status & Metadata
| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 15 | Badge | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 16 | Tag / Chip | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 17 | Statistic / Stat | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 18 | Empty State / Blankslate | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 19 | Clipboard | [x] | [x] | [x] | [x] | [x] | [x] | complete |

---

## `feedback-js` / `feedback-react` — Feedback & Status Indicators
**Dependencies:** `tokens`, `primitives-js`, `typography-js`, `buttons-js` | **Total lines:** 5,217 (JS) + 1,511 (React) = 6,728

### Notifications & Alerts
| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 1 | Alert | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 2 | Toast / Snackbar | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 3 | Notification | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 4 | Banner | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 5 | Inline Message | [x] | [x] | [x] | [x] | [x] | [x] | complete |

### Progress & Loading
| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 6 | Progress Bar | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 7 | Circular Progress | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 8 | Spinner / Loader | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 9 | Skeleton | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 10 | Loading Overlay | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 11 | NProgress | [x] | [x] | [x] | [x] | [x] | [x] | complete |

---

## `overlays-js` / `overlays-react` — Overlays & Floating UI
**Dependencies:** `tokens`, `primitives-js`, `typography-js`, `buttons-js`, `utilities-js` | **Total lines:** 5,951 (JS) + 2,547 (React) = 8,498

| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 1 | Dialog / Modal | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 2 | Alert Dialog | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 3 | Drawer | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 4 | Sheet | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 5 | Popover | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 6 | Tooltip | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 7 | Hover Card | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 8 | Inline Dialog | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 9 | Backdrop / Blanket | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 10 | Command Palette / Spotlight | [x] | [x] | [x] | [x] | [x] | [x] | complete |

---

## `disclosure-js` / `disclosure-react` — Disclosure & Collapsible Content
**Dependencies:** `tokens`, `primitives-js`, `buttons-js` | **Total lines:** 4,479 (JS) + 1,310 (React) = 5,789

| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 1 | Accordion | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 2 | Collapsible / Collapse | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 3 | Carousel / Slider | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 4 | Tour | [x] | [x] | [x] | [x] | [x] | [x] | complete |

---

## `utilities-js` / `utilities-react` — Utilities & Providers
**Dependencies:** `tokens` | **Total lines:** 3,059 (JS) + 1,673 (React) = 4,732

### Accessibility
| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 1 | Visually Hidden | [x] | [x] | [x] | [x] | [x] | N/A | complete |
| 2 | Focus Trap | [x] | N/A | N/A | N/A | [x] | N/A | complete |
| 3 | Skip Nav | [x] | [x] | [x] | [x] | [x] | N/A | complete |

### Rendering & Behavior
| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 4 | Portal | [x] | N/A | N/A | N/A | [x] | N/A | complete |
| 5 | Presence | [x] | [x] | [x] | [x] | [x] | N/A | complete |
| 6 | Show / Hide | [x] | N/A | N/A | N/A | [x] | N/A | complete |
| 7 | Client Only | [x] | N/A | N/A | N/A | [x] | N/A | complete |

### Providers & Context
| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 8 | Theme Provider | [x] | [x] | [x] | [x] | [x] | [x] | complete |
| 9 | Direction Provider | [x] | N/A | N/A | N/A | [x] | N/A | complete |
| 10 | Locale Provider | [x] | N/A | N/A | N/A | [x] | N/A | complete |

### Formatting
| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 11 | Format Number | [x] | N/A | N/A | N/A | [x] | N/A | complete |
| 12 | Format Byte | [x] | N/A | N/A | N/A | [x] | N/A | complete |

### Positioning
| # | Component | JS Types | JS Classes | CSS | CSS Module | React | Themes | Status |
|---|-----------|----------|------------|-----|------------|-------|--------|--------|
| 13 | Affix | [x] | [x] | [x] | [x] | [x] | N/A | complete |

---

## Summary

| Group | Total | Complete | JS Lines | React Lines | Total Lines |
|-------|-------|----------|----------|-------------|-------------|
| Primitives | 18 | 18 | 6,060 | 2,888 | 8,948 |
| Typography | 10 | 10 | 4,237 | 1,039 | 5,276 |
| Buttons | 7 | 7 | 3,910 | 1,219 | 5,129 |
| Forms | 34 | 34 | 13,442 | 4,122 | 17,564 |
| Navigation | 14 | 14 | 6,845 | 3,186 | 10,031 |
| Data Display | 19 | 19 | 8,885 | 2,861 | 11,746 |
| Feedback | 11 | 11 | 5,217 | 1,511 | 6,728 |
| Overlays | 10 | 10 | 5,951 | 2,547 | 8,498 |
| Disclosure | 4 | 4 | 4,479 | 1,310 | 5,789 |
| Utilities | 13 | 13 | 3,059 | 1,673 | 4,732 |
| **Total** | **140** | **140** | **62,085** | **22,356** | **84,441** |

## Themes

5 global theme CSS files created in `packages/tokens/src/themes/`:
- `dark-modern.css` — Dark surfaces, vibrant accents, glow effects
- `light-modern.css` — Clean white, refined shadows, modern corners
- `antd.css` — Ant Design colors (#1677ff), 4px radius, compact density
- `material.css` — Material Design 3 purple (#6750A4), elevation, Roboto
- `bootstrap.css` — Bootstrap blue (#0d6efd), standard sizing

Component-specific theme overrides are included inline in each component's CSS file.
