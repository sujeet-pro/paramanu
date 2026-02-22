#!/usr/bin/env node
/**
 * Renames CSS class prefixes, CSS variables, function names, and type names
 * across the entire Paramanu monorepo to use shorter, industry-standard abbreviations.
 *
 * Usage: node scripts/rename-classes.mjs [--dry-run]
 */
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, "..")
const DRY_RUN = process.argv.includes("--dry-run")

// ──────────── RENAME MAPPINGS (kebab-case) ────────────

const RENAMES = [
  // BUTTONS GROUP
  { old: "icon-button", new: "icon-btn" },
  { old: "close-button", new: "close-btn" },
  { old: "toggle-button", new: "toggle-btn" },
  { old: "button-group", new: "btn-group" },
  { old: "toggle-group", new: "toggle-grp" },
  { old: "button", new: "btn" },

  // PRIMITIVES GROUP
  { old: "app-shell", new: "shell" },
  { old: "aspect-ratio", new: "aspect" },
  { old: "simple-grid", new: "sgrid" },
  { old: "scroll-area", new: "scroll" },

  // FORMS GROUP (order matters: longer first)
  { old: "date-range-picker", new: "daterange" },
  { old: "date-picker", new: "datepicker" },
  { old: "color-picker", new: "colorpicker" },
  { old: "time-picker", new: "timepicker" },
  { old: "checkbox-card", new: "chk-card" },
  { old: "editable-text", new: "editable" },
  { old: "file-upload", new: "upload" },
  { old: "form-control", new: "form-ctrl" },
  { old: "multi-select", new: "multi-sel" },
  { old: "native-select", new: "native-sel" },
  { old: "number-input", new: "num-input" },
  { old: "password-input", new: "pwd-input" },
  { old: "search-input", new: "search" },
  { old: "segmented-control", new: "seg-ctrl" },

  // NAVIGATION GROUP
  { old: "breadcrumbs", new: "breadcrumb" },
  { old: "dropdown-menu", new: "dropdown" },
  { old: "context-menu", new: "ctx-menu" },
  { old: "tree-view", new: "tree" },
  { old: "skip-nav-link", new: "skip-link" },
  { old: "back-to-top", new: "btt" },

  // FEEDBACK GROUP
  { old: "progress-bar", new: "progress" },
  { old: "circular-progress", new: "ring-progress" },
  { old: "loading-overlay", new: "loading" },
  { old: "notification", new: "notif" },
  { old: "inline-message", new: "inline-msg" },

  // DATA-DISPLAY GROUP
  { old: "avatar-group", new: "avatar-grp" },
  { old: "data-table", new: "datatable" },
  { old: "data-grid", new: "datagrid" },
  { old: "data-list", new: "datalist" },
  { old: "empty-state", new: "empty" },
  { old: "structured-list", new: "struct-list" },
  { old: "image", new: "img" },

  // OVERLAYS GROUP
  { old: "alert-dialog", new: "alertdialog" },
  { old: "hover-card", new: "hovercard" },
  { old: "inline-dialog", new: "inline-dlg" },
  { old: "command-palette", new: "cmd-palette" },

  // UTILITIES GROUP
  { old: "visually-hidden", new: "sr-only" },
  { old: "theme-provider", new: "theme" },
]

// ──────────── DOM TYPES TO PROTECT ────────────
// Use index-based placeholders to avoid the replacement strings appearing in the placeholder itself

const PROTECT = [
  "HTMLButtonElement",
  "ButtonHTMLAttributes",
  "HTMLImageElement",
  "ImageHTMLAttributes",
  "HTMLInputElement",
  "InputHTMLAttributes",
  "HTMLSelectElement",
  "SelectHTMLAttributes",
  "HTMLDialogElement",
  "DialogHTMLAttributes",
  "HTMLFormElement",
  "FormHTMLAttributes",
]

// Build safe placeholders: ___DOMGUARD_0___, ___DOMGUARD_1___, etc.
const PROTECT_PLACEHOLDERS = PROTECT.map((_, i) => `___DOMGUARD_${i}___`)

// ──────────── HELPERS ────────────

function kebabToCamel(s) {
  return s.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
}

function kebabToPascal(s) {
  const c = kebabToCamel(s)
  return c[0].toUpperCase() + c.slice(1)
}

// ──────────── BUILD REPLACEMENT PAIRS ────────────

const pairs = [] // Array of [oldStr, newStr]

for (const { old: o, new: n } of RENAMES) {
  const oc = kebabToCamel(o)
  const nc = kebabToCamel(n)
  const op = kebabToPascal(o)
  const np = kebabToPascal(n)

  // 1. CSS class/variable prefix: pm-<old> → pm-<new>
  pairs.push([`pm-${o}`, `pm-${n}`])

  // 2. camelCase function names
  pairs.push([`${oc}Classes`, `${nc}Classes`])
  pairs.push([`${oc}ModuleClasses`, `${nc}ModuleClasses`])
  pairs.push([`${oc}ItemClasses`, `${nc}ItemClasses`])
  pairs.push([`${oc}ItemModuleClasses`, `${nc}ItemModuleClasses`])

  // 3. PascalCase type names with known suffixes
  const suffixes = [
    "ClassesOptions",
    "ClassesResult",
    "ItemClassesOptions",
    "ItemClassesResult",
    "ItemProps",
    "Props",
    "Variant",
    "Size",
    "Orientation",
    "Type",
    "Shape",
    "Radius",
    "Position",
    "Placement",
    "Status",
    "Mode",
    "Direction",
    "Trigger",
    "Content",
    "Instance",
    "Component",
    "Slots",
    "State",
    "Action",
    "Item",
    "Column",
    "Row",
    "Cell",
    "Header",
    "Footer",
    "Body",
    "Panel",
    "Tab",
    "Step",
    "Node",
    "Option",
    "Value",
    "Label",
    "Group",
  ]
  for (const suffix of suffixes) {
    pairs.push([`${op}${suffix}`, `${np}${suffix}`])
  }

  // 4. React type prefix
  pairs.push([`React${op}`, `React${np}`])

  // 5. Bare PascalCase (React component name, JSX, exports)
  pairs.push([op, np])
}

// Deduplicate and filter no-ops
const seen = new Set()
const uniquePairs = []
for (const [o, n] of pairs) {
  if (o === n) continue
  const key = `${o}|${n}`
  if (!seen.has(key)) {
    seen.add(key)
    uniquePairs.push([o, n])
  }
}

// Sort by old string length DESCENDING — longest first prevents partial matches
uniquePairs.sort((a, b) => b[0].length - a[0].length)

console.log(`Generated ${uniquePairs.length} unique replacement pairs`)

// ──────────── FILE DISCOVERY ────────────

const EXTENSIONS = new Set([".ts", ".tsx", ".css", ".mdx", ".md", ".mjs"])
const SKIP_DIRS = new Set(["node_modules", "dist", ".git", ".turbo", ".next", ".astro"])

function walkDir(dir) {
  const results = []
  if (!fs.existsSync(dir)) return results
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      results.push(...walkDir(fullPath))
    } else if (entry.isFile() && EXTENSIONS.has(path.extname(entry.name))) {
      results.push(fullPath)
    }
  }
  return results
}

// ──────────── APPLY REPLACEMENTS ────────────

const SELF = path.resolve(__dirname, "rename-classes.mjs")
const files = [...walkDir(path.join(ROOT, "packages")), ...walkDir(path.join(ROOT, "apps"))].filter(
  (f) => f !== SELF,
)

console.log(`Processing ${files.length} files...`)
if (DRY_RUN) console.log("(DRY RUN — no files will be modified)\n")

let filesChanged = 0
const changedFiles = []

for (const filePath of files) {
  let content = fs.readFileSync(filePath, "utf-8")
  const original = content

  // Step 1: Protect DOM types with index-based placeholders
  for (let i = 0; i < PROTECT.length; i++) {
    content = content.replaceAll(PROTECT[i], PROTECT_PLACEHOLDERS[i])
  }

  // Step 2: Apply all replacements (sorted longest first)
  for (const [oldStr, newStr] of uniquePairs) {
    content = content.replaceAll(oldStr, newStr)
  }

  // Step 3: Restore protected DOM types
  for (let i = 0; i < PROTECT.length; i++) {
    content = content.replaceAll(PROTECT_PLACEHOLDERS[i], PROTECT[i])
  }

  if (content !== original) {
    if (!DRY_RUN) {
      fs.writeFileSync(filePath, content, "utf-8")
    }
    filesChanged++
    const rel = path.relative(ROOT, filePath)
    changedFiles.push(rel)
    console.log(`  ${DRY_RUN ? "[would change]" : "Changed"}: ${rel}`)
  }
}

console.log(`\n${DRY_RUN ? "Would change" : "Changed"} ${filesChanged} files.`)

if (filesChanged > 0 && !DRY_RUN) {
  console.log("\nNext steps:")
  console.log("  1. pnpm build    — verify all packages compile")
  console.log("  2. pnpm test     — verify all tests pass")
  console.log("  3. pnpm typecheck — verify no type errors")
}
