/**
 * Migration script: Replace light-dark() with semantic tokens in component CSS.
 * Run 2: Extended mappings for patterns not in the core semantic token table.
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, "..")

// ---------------------------------------------------------------------------
// Mapping table
// ---------------------------------------------------------------------------

const semanticMap = new Map()

function addMapping(light, dark, token, context = "any") {
  const key = `${light},${dark}`
  if (!semanticMap.has(key)) semanticMap.set(key, [])
  semanticMap.get(key).push({ token, context })
}

// === Core semantic tokens (exact matches from semantic/color.json) ===

// Backgrounds
addMapping("neutral-0", "neutral-950", "bg", "bg")
addMapping("neutral-50", "neutral-900", "bg-subtle", "bg")
addMapping("neutral-100", "neutral-800", "bg-muted", "bg")
addMapping("neutral-800", "neutral-100", "bg-emphasis", "bg")
addMapping("neutral-900", "neutral-50", "bg-inverse", "bg")

// Foregrounds
addMapping("neutral-900", "neutral-100", "fg", "fg")
addMapping("neutral-600", "neutral-400", "fg-muted", "fg")
addMapping("neutral-400", "neutral-500", "fg-subtle", "fg")
addMapping("neutral-950", "neutral-0", "fg-emphasis", "fg")
addMapping("neutral-0", "neutral-950", "fg-inverse", "fg")
addMapping("primary-600", "primary-400", "fg-link", "fg")
addMapping("primary-700", "primary-300", "fg-link-hover", "fg")

// Borders
addMapping("neutral-300", "neutral-600", "border", "border")
addMapping("neutral-200", "neutral-700", "border-muted", "border")
addMapping("neutral-400", "neutral-500", "border-emphasis", "border")

// Primary interactive
addMapping("primary-600", "primary-500", "primary", "interactive")
addMapping("primary-700", "primary-400", "primary-hover", "interactive")
addMapping("primary-800", "primary-600", "primary-active", "interactive")
addMapping("primary-50", "primary-900", "primary-subtle", "interactive")
addMapping("primary-100", "primary-800", "primary-subtle-hover", "interactive")
addMapping("primary-500", "primary-400", "primary-border", "border")

// Neutral interactive
addMapping("neutral-100", "neutral-800", "neutral", "interactive")
addMapping("neutral-200", "neutral-700", "neutral-hover", "interactive")
addMapping("neutral-300", "neutral-600", "neutral-active", "interactive")
addMapping("neutral-700", "neutral-200", "neutral-fg", "fg")
addMapping("neutral-100", "neutral-800", "neutral-subtle", "interactive")
addMapping("neutral-200", "neutral-700", "neutral-subtle-hover", "interactive")
addMapping("neutral-300", "neutral-600", "neutral-border", "border")

// Status tokens (danger, success, warning, info)
for (const status of ["danger", "success", "warning", "info"]) {
  addMapping(`${status}-600`, `${status}-500`, status, "interactive")
  addMapping(`${status}-700`, `${status}-400`, `${status}-hover`, "interactive")
  addMapping(`${status}-800`, `${status}-600`, `${status}-active`, "interactive")
  addMapping(`${status}-50`, `${status}-900`, `${status}-subtle`, "interactive")
  addMapping(`${status}-800`, `${status}-100`, `${status}-subtle-fg`, "fg")
  addMapping(`${status}-200`, `${status}-700`, `${status}-border`, "border")
}

// Focus
addMapping("primary-500", "primary-400", "focus-ring", "focus")

// === Approximate mappings (close enough substitutions) ===

// neutral-0/neutral-900 ≈ --pm-bg (neutral-0/neutral-950)
addMapping("neutral-0", "neutral-900", "bg", "bg")
addMapping("neutral-0", "neutral-900", "fg-inverse", "fg")

// neutral-50/neutral-800 ≈ --pm-bg-subtle (neutral-50/neutral-900)
addMapping("neutral-50", "neutral-800", "bg-subtle", "bg")
addMapping("neutral-50", "neutral-800", "neutral-subtle", "interactive")

// neutral-100/neutral-700 ≈ --pm-bg-muted or --pm-neutral
addMapping("neutral-100", "neutral-700", "bg-muted", "bg")
addMapping("neutral-100", "neutral-700", "neutral", "interactive")

// neutral-700/neutral-300 ≈ --pm-neutral-fg (neutral-700/neutral-200)
addMapping("neutral-700", "neutral-300", "neutral-fg", "fg")

// neutral-800/neutral-200 ≈ --pm-fg (neutral-900/neutral-100)
addMapping("neutral-800", "neutral-200", "fg", "fg")
addMapping("neutral-800", "neutral-200", "bg-emphasis", "bg")

// neutral-500/neutral-400 ≈ --pm-fg-muted (neutral-600/neutral-400)
addMapping("neutral-500", "neutral-400", "fg-muted", "fg")
addMapping("neutral-500", "neutral-400", "border-emphasis", "border")

// neutral-600/neutral-300 ≈ --pm-fg-muted
addMapping("neutral-600", "neutral-300", "fg-muted", "fg")

// neutral-0/neutral-0 ≈ just use var(--pm-color-neutral-0) or --pm-bg
addMapping("neutral-0", "neutral-0", "bg", "bg")

// neutral-0/neutral-700 ≈ --pm-bg
addMapping("neutral-0", "neutral-700", "bg", "bg")

// neutral-0/neutral-800 ≈ --pm-bg
addMapping("neutral-0", "neutral-800", "bg", "bg")

// neutral-300/neutral-700 ≈ --pm-border (neutral-300/neutral-600)
addMapping("neutral-300", "neutral-700", "border", "border")

// primary-50/primary-950 ≈ --pm-primary-subtle (primary-50/primary-900)
addMapping("primary-50", "primary-950", "primary-subtle", "interactive")
addMapping("primary-50", "primary-950", "primary-subtle", "bg")

// primary-100/primary-900 ≈ --pm-primary-subtle-hover (primary-100/primary-800)
addMapping("primary-100", "primary-900", "primary-subtle-hover", "interactive")
addMapping("primary-100", "primary-900", "primary-subtle-hover", "bg")

// primary-200/primary-700 ≈ --pm-primary-border (primary-500/primary-400 is different, but close intent)
addMapping("primary-200", "primary-700", "primary-border", "border")
addMapping("primary-200", "primary-700", "primary-subtle-hover", "bg")

// primary-200/primary-800 ≈ --pm-primary-border
addMapping("primary-200", "primary-800", "primary-border", "border")

// primary-300/primary-600 ≈ --pm-primary-border
addMapping("primary-300", "primary-600", "primary-border", "border")
addMapping("primary-300", "primary-600", "primary-border", "bg")

// primary-300/primary-700 ≈ --pm-primary-border
addMapping("primary-300", "primary-700", "primary-border", "border")
addMapping("primary-300", "primary-700", "primary-border", "bg")

// primary-700/primary-200 ≈ --pm-fg-link (primary-600/primary-400 is the exact match)
addMapping("primary-700", "primary-200", "fg-link", "fg")

// primary-800/primary-200 ≈ --pm-primary-active (primary-800/primary-600) for color context
addMapping("primary-800", "primary-200", "fg-link-hover", "fg")

// primary-600/primary-300 ≈ --pm-primary-hover border
addMapping("primary-600", "primary-300", "primary-border", "border")
addMapping("primary-600", "primary-300", "fg-link", "fg")

// primary-400/primary-500 ≈ --pm-primary-border (reversed light/dark)
addMapping("primary-400", "primary-500", "primary-border", "border")
addMapping("primary-400", "primary-500", "primary-border", "any")

// primary-500/primary-500 → just use the primitive ref as-is — skip

// Status approximate mappings
for (const status of ["danger", "success", "warning", "info"]) {
  // {status}-500/400 ≈ --pm-{status}-border or accent
  addMapping(`${status}-500`, `${status}-400`, `${status}-border`, "border")
  addMapping(`${status}-500`, `${status}-400`, `${status}`, "fg")
  addMapping(`${status}-500`, `${status}-400`, `${status}-border`, "any")

  // {status}-600/400 ≈ --pm-{status} or foreground link-style
  addMapping(`${status}-600`, `${status}-400`, `${status}`, "fg")
  addMapping(`${status}-600`, `${status}-400`, `${status}`, "any")

  // {status}-700/300 ≈ --pm-{status}-subtle-fg (800/100 is exact)
  addMapping(`${status}-700`, `${status}-300`, `${status}-subtle-fg`, "fg")
  addMapping(`${status}-700`, `${status}-300`, `${status}-border`, "border")
  addMapping(`${status}-700`, `${status}-300`, `${status}-subtle-fg`, "any")

  // {status}-700/200 ≈ --pm-{status}-subtle-fg
  addMapping(`${status}-700`, `${status}-200`, `${status}-subtle-fg`, "fg")
  addMapping(`${status}-700`, `${status}-200`, `${status}-subtle-fg`, "any")

  // {status}-800/200 ≈ --pm-{status}-subtle-fg (800/100 is exact)
  addMapping(`${status}-800`, `${status}-200`, `${status}-subtle-fg`, "fg")
  addMapping(`${status}-800`, `${status}-200`, `${status}-border`, "border")
  addMapping(`${status}-800`, `${status}-200`, `${status}-subtle-fg`, "any")

  // {status}-100/800 ≈ --pm-{status}-subtle (50/900)
  addMapping(`${status}-100`, `${status}-800`, `${status}-subtle`, "bg")
  addMapping(`${status}-100`, `${status}-800`, `${status}-subtle`, "interactive")

  // {status}-100/900 ≈ --pm-{status}-subtle
  addMapping(`${status}-100`, `${status}-900`, `${status}-subtle`, "bg")
  addMapping(`${status}-100`, `${status}-900`, `${status}-subtle`, "interactive")

  // {status}-50/950 ≈ --pm-{status}-subtle
  addMapping(`${status}-50`, `${status}-950`, `${status}-subtle`, "bg")
  addMapping(`${status}-50`, `${status}-950`, `${status}-subtle`, "interactive")

  // {status}-300/600, {status}-300/700 ≈ --pm-{status}-border
  addMapping(`${status}-300`, `${status}-600`, `${status}-border`, "border")
  addMapping(`${status}-300`, `${status}-600`, `${status}-border`, "any")
  addMapping(`${status}-300`, `${status}-700`, `${status}-border`, "border")
  addMapping(`${status}-300`, `${status}-700`, `${status}-border`, "any")

  // {status}-400/500 ≈ --pm-{status}-border (reversed)
  addMapping(`${status}-400`, `${status}-500`, `${status}-border`, "border")
  addMapping(`${status}-400`, `${status}-500`, `${status}-border`, "any")
}

// ---------------------------------------------------------------------------
// Context detection
// ---------------------------------------------------------------------------

function detectContext(line) {
  const lower = line.toLowerCase()

  if (
    lower.includes("border-color") ||
    lower.includes("-border:") ||
    lower.includes("-border-color") ||
    lower.match(/border-left|border-right|border-top|border-bottom/) ||
    lower.match(/outline[^-]/)
  ) {
    return "border"
  }
  if (
    lower.includes("background") ||
    lower.includes("-bg:") ||
    lower.includes("-bg-color") ||
    lower.includes("hover-bg") ||
    lower.includes("active-bg")
  ) {
    return "bg"
  }
  if (lower.includes("focus") || lower.includes("ring")) {
    return "focus"
  }
  if (
    lower.includes("color:") ||
    lower.includes("-color:") ||
    lower.includes("-fg") ||
    lower.includes("-text") ||
    lower.includes("icon-color") ||
    lower.includes("hover-color") ||
    lower.includes("active-color")
  ) {
    return "fg"
  }
  return "any"
}

// ---------------------------------------------------------------------------
// Resolution
// ---------------------------------------------------------------------------

function resolveToken(lightPrim, darkPrim, lineContext) {
  const key = `${lightPrim},${darkPrim}`
  const candidates = semanticMap.get(key)

  if (!candidates || candidates.length === 0) return null
  if (candidates.length === 1) return candidates[0].token

  const contextPrefs = {
    bg: ["bg", "interactive", "any"],
    fg: ["fg", "interactive", "any"],
    border: ["border", "interactive", "any"],
    focus: ["focus", "border", "any"],
    interactive: ["interactive", "bg", "any"],
    any: ["interactive", "bg", "fg", "border", "any"],
  }

  const prefs = contextPrefs[lineContext] || contextPrefs["any"]
  for (const pref of prefs) {
    const match = candidates.find((c) => c.context === pref)
    if (match) return match.token
  }

  return candidates[0].token
}

// ---------------------------------------------------------------------------
// Process files
// ---------------------------------------------------------------------------

const lightDarkRe =
  /light-dark\(\s*var\(--pm-color-([a-z]+-[a-z0-9]+)\)\s*,\s*var\(--pm-color-([a-z]+-[a-z0-9]+)\)\s*\)/g

let totalReplacements = 0
let totalUnmatched = 0
let filesProcessed = 0
const unmatchedPatterns = new Map()

function processFile(filePath) {
  const content = readFileSync(filePath, "utf-8")
  const relPath = filePath.replace(root + "/", "")
  let modified = false

  const newContent = content.replace(lightDarkRe, (match, lightPrim, darkPrim, offset) => {
    const lineStart = content.lastIndexOf("\n", offset) + 1
    const lineEnd = content.indexOf("\n", offset)
    const line = content.slice(lineStart, lineEnd === -1 ? undefined : lineEnd)
    const ctx = detectContext(line)

    const token = resolveToken(lightPrim, darkPrim, ctx)
    if (token) {
      totalReplacements++
      modified = true
      return `var(--pm-${token})`
    }

    totalUnmatched++
    const patternKey = `${lightPrim},${darkPrim}`
    if (!unmatchedPatterns.has(patternKey)) {
      unmatchedPatterns.set(patternKey, [])
    }
    unmatchedPatterns.get(patternKey).push({ file: relPath, line: line.trim() })
    return match
  })

  if (modified) {
    writeFileSync(filePath, newContent)
    filesProcessed++
  }
}

function findCssFiles(dir) {
  const result = []
  try {
    const entries = readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = resolve(dir, entry.name)
      if (entry.isDirectory()) {
        result.push(...findCssFiles(fullPath))
      } else if (entry.name.endsWith(".css")) {
        result.push(fullPath)
      }
    }
  } catch {
    // Skip missing dirs
  }
  return result
}

// ---------------------------------------------------------------------------
// Run
// ---------------------------------------------------------------------------

const packages = [
  "primitives-js",
  "typography-js",
  "utilities-js",
  "buttons-js",
  "data-display-js",
  "feedback-js",
  "forms-js",
  "navigation-js",
  "disclosure-js",
  "overlays-js",
]

const allCssFiles = []
for (const pkg of packages) {
  const pkgDir = resolve(root, "packages", pkg, "src")
  allCssFiles.push(...findCssFiles(pkgDir))
}

console.log(`Found ${allCssFiles.length} CSS files to process`)

for (const file of allCssFiles) {
  processFile(file)
}

console.log(`\nMigration complete:`)
console.log(`  Files modified: ${filesProcessed}`)
console.log(`  Replacements: ${totalReplacements}`)
console.log(`  Unmatched: ${totalUnmatched}`)

if (unmatchedPatterns.size > 0) {
  console.log(`\nUnmatched light-dark patterns:`)
  for (const [pattern, occurrences] of unmatchedPatterns) {
    const [light, dark] = pattern.split(",")
    console.log(`  light-dark(${light}, ${dark}): ${occurrences.length} occurrence(s)`)
    for (const o of occurrences.slice(0, 2)) {
      console.log(`    - ${o.file}`)
    }
    if (occurrences.length > 2)
      console.log(`    ... and ${occurrences.length - 2} more`)
  }
}
