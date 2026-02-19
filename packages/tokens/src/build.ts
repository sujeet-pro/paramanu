import StyleDictionary from "style-dictionary"
import type { TransformedToken, Config } from "style-dictionary/types"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"
import { writeFileSync, mkdirSync, readFileSync, readdirSync } from "node:fs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, "..")
const distDir = resolve(rootDir, "dist")
const srcDir = __dirname

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Convert a token reference like "{color.primary.500}" to a CSS var name */
function refToCssVar(ref: string): string {
  const path = ref.replace(/^\{/, "").replace(/\}$/, "")
  return `var(--pm-${path.replace(/\./g, "-")})`
}

/** Resolve a reference value — either a direct value or a token reference */
function resolveRef(
  value: string,
  allTokensByPath: Map<string, TransformedToken>,
): string {
  if (value.startsWith("{") && value.endsWith("}")) {
    return refToCssVar(value)
  }
  return value
}

/** Check if a value is a reference (e.g. "{color.neutral.0}") */
function isReference(value: string): boolean {
  return typeof value === "string" && value.startsWith("{") && value.endsWith("}")
}

/** Get CSS @property syntax from $type */
function typeToCssSyntax(
  type: string | undefined,
  value: string,
): { syntax: string; inherits: boolean } | null {
  if (!type) return null
  const strVal = String(value)

  switch (type) {
    case "color":
      return { syntax: "<color>", inherits: true }
    case "dimension":
      // Only px values get <length>; rem/em use "*"
      if (strVal.endsWith("px")) return { syntax: "<length>", inherits: false }
      return null
    case "number":
      return { syntax: "<number>", inherits: true }
    case "fontWeight":
      return { syntax: "<number>", inherits: true }
    case "duration":
      return { syntax: "<time>", inherits: false }
    default:
      return null
  }
}

// ---------------------------------------------------------------------------
// Build token maps from JSON files (using our own parser, not SD)
// ---------------------------------------------------------------------------

interface TokenDef {
  $value: string | number
  $type?: string
  $extensions?: {
    "pm.lightDark"?: { light: string; dark: string }
  }
}

interface TokenGroup {
  [key: string]: TokenDef | TokenGroup | string
}

function isTokenDef(obj: unknown): obj is TokenDef {
  return typeof obj === "object" && obj !== null && "$value" in obj
}

interface FlatToken {
  cssVar: string
  value: string
  type: string | undefined
  lightDark?: { light: string; dark: string }
  path: string[]
}

function flattenTokens(
  obj: TokenGroup,
  parentType: string | undefined = undefined,
  pathParts: string[] = [],
  result: FlatToken[] = [],
): FlatToken[] {
  // Inherit $type from parent
  const groupType = (obj.$type as string) || parentType

  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith("$")) continue

    if (isTokenDef(value)) {
      const tokenType = value.$type || groupType
      const path = [...pathParts, key]
      const cssVar = `--pm-${path.join("-")}`

      result.push({
        cssVar,
        value: String(value.$value),
        type: tokenType,
        lightDark: value.$extensions?.["pm.lightDark"],
        path,
      })
    } else if (typeof value === "object" && value !== null) {
      flattenTokens(value as TokenGroup, groupType, [...pathParts, key], result)
    }
  }

  return result
}

function loadJsonDir(dir: string): TokenGroup {
  const merged: TokenGroup = {}
  try {
    const files = readdirSync(dir).filter((f) => f.endsWith(".json")).sort()
    for (const file of files) {
      const content = JSON.parse(readFileSync(resolve(dir, file), "utf-8"))
      Object.assign(merged, content)
    }
  } catch {
    // Directory might not exist
  }
  return merged
}

function loadJsonDirDeep(dir: string): TokenGroup {
  const merged: TokenGroup = {}
  try {
    const entries = readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith(".json")) {
        const content = JSON.parse(readFileSync(resolve(dir, entry.name), "utf-8"))
        deepMerge(merged, content)
      } else if (entry.isDirectory()) {
        const sub = loadJsonDirDeep(resolve(dir, entry.name))
        deepMerge(merged, sub)
      }
    }
  } catch {
    // Directory might not exist
  }
  return merged
}

function deepMerge(target: TokenGroup, source: TokenGroup): TokenGroup {
  for (const [key, value] of Object.entries(source)) {
    if (
      typeof value === "object" &&
      value !== null &&
      !("$value" in value) &&
      typeof target[key] === "object" &&
      target[key] !== null &&
      !("$value" in (target[key] as TokenGroup))
    ) {
      deepMerge(target[key] as TokenGroup, value as TokenGroup)
    } else {
      target[key] = value
    }
  }
  return target
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

async function build() {
  // Ensure output dirs
  mkdirSync(resolve(distDir, "css"), { recursive: true })
  mkdirSync(resolve(distDir, "js"), { recursive: true })

  // Load base tokens
  const primitiveTokens = loadJsonDirDeep(resolve(srcDir, "tokens", "primitive"))
  const semanticTokens = loadJsonDirDeep(resolve(srcDir, "tokens", "semantic"))

  const primFlat = flattenTokens(primitiveTokens)
  const semFlat = flattenTokens(semanticTokens)
  const allFlat = [...primFlat, ...semFlat]

  // -------------------------------------------------------------------------
  // Generate primitives.css
  // -------------------------------------------------------------------------
  const primLines = [":root {"]
  for (const t of primFlat) {
    primLines.push(`  ${t.cssVar}: ${t.value};`)
  }
  primLines.push("}")
  primLines.push("")
  const primitivesContent = primLines.join("\n")
  writeFileSync(resolve(distDir, "css", "primitives.css"), primitivesContent)

  // -------------------------------------------------------------------------
  // Generate semantic.css
  // -------------------------------------------------------------------------
  const semLines = [":root {"]
  for (const t of semFlat) {
    if (t.lightDark) {
      const lightVal = isReference(t.lightDark.light)
        ? refToCssVar(t.lightDark.light)
        : t.lightDark.light
      const darkVal = isReference(t.lightDark.dark)
        ? refToCssVar(t.lightDark.dark)
        : t.lightDark.dark
      semLines.push(`  ${t.cssVar}: light-dark(${lightVal}, ${darkVal});`)
    } else {
      semLines.push(`  ${t.cssVar}: ${t.value};`)
    }
  }
  semLines.push("}")
  semLines.push("")
  const semanticContent = semLines.join("\n")
  writeFileSync(resolve(distDir, "css", "semantic.css"), semanticContent)

  // -------------------------------------------------------------------------
  // Generate tokens.css (combined with @layer + color-scheme)
  // -------------------------------------------------------------------------
  const tokensLines = ["@layer pm.tokens {", "  :root {", "    color-scheme: light dark;", ""]

  // Primitives
  tokensLines.push("    /* Primitives */")
  for (const t of primFlat) {
    tokensLines.push(`    ${t.cssVar}: ${t.value};`)
  }
  tokensLines.push("")

  // Semantics
  tokensLines.push("    /* Semantics */")
  for (const t of semFlat) {
    if (t.lightDark) {
      const lightVal = isReference(t.lightDark.light)
        ? refToCssVar(t.lightDark.light)
        : t.lightDark.light
      const darkVal = isReference(t.lightDark.dark)
        ? refToCssVar(t.lightDark.dark)
        : t.lightDark.dark
      tokensLines.push(`    ${t.cssVar}: light-dark(${lightVal}, ${darkVal});`)
    } else {
      tokensLines.push(`    ${t.cssVar}: ${t.value};`)
    }
  }

  tokensLines.push("  }")
  tokensLines.push("")

  // Color-scheme utility classes
  tokensLines.push("  .pm-light { color-scheme: light; }")
  tokensLines.push("  .pm-dark { color-scheme: dark; }")
  tokensLines.push("  .pm-auto { color-scheme: light dark; }")

  tokensLines.push("}")
  tokensLines.push("")
  writeFileSync(resolve(distDir, "css", "tokens.css"), tokensLines.join("\n"))

  // -------------------------------------------------------------------------
  // Generate properties.css (@property declarations)
  // -------------------------------------------------------------------------
  const propLines: string[] = []
  for (const t of primFlat) {
    const spec = typeToCssSyntax(t.type, t.value)
    if (spec) {
      propLines.push(`@property ${t.cssVar} {`)
      propLines.push(`  syntax: "${spec.syntax}";`)
      propLines.push(`  inherits: ${spec.inherits};`)
      propLines.push(`  initial-value: ${t.value};`)
      propLines.push("}")
    }
  }
  propLines.push("")
  writeFileSync(resolve(distDir, "css", "properties.css"), propLines.join("\n"))

  // -------------------------------------------------------------------------
  // Generate JS constants + TypeScript declarations
  // -------------------------------------------------------------------------
  const jsLines: string[] = []
  const dtsLines: string[] = []

  for (const t of allFlat) {
    const camelName = t.cssVar
      .replace(/^--/, "")
      .replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase())

    jsLines.push(`export const ${camelName} = "${t.cssVar}"`)
    dtsLines.push(`export declare const ${camelName}: string`)
  }

  jsLines.push("")
  dtsLines.push("")

  writeFileSync(resolve(distDir, "js", "tokens.js"), jsLines.join("\n"))
  writeFileSync(resolve(distDir, "js", "tokens.d.ts"), dtsLines.join("\n"))

  // -------------------------------------------------------------------------
  // Generate theme CSS files
  // -------------------------------------------------------------------------
  const themesDir = resolve(srcDir, "tokens", "themes")
  const themeNames: string[] = []

  try {
    const entries = readdirSync(themesDir, { withFileTypes: true })
    for (const entry of entries) {
      if (entry.isDirectory()) {
        themeNames.push(entry.name)
      }
    }
  } catch {
    // No themes dir
  }

  for (const themeName of themeNames) {
    const themeDir = resolve(themesDir, themeName)
    // Load base tokens first, then theme overrides (deep merge)
    const baseTokens = deepMerge(
      JSON.parse(JSON.stringify(primitiveTokens)),
      JSON.parse(JSON.stringify(semanticTokens)),
    )
    const themeTokens = loadJsonDirDeep(themeDir)

    // Flatten the theme overrides only (to know which tokens are overridden)
    const themeFlat = flattenTokens(themeTokens)
    const overriddenVars = new Set(themeFlat.map((t) => t.cssVar))

    // Merge theme into base so references resolve correctly
    const merged = deepMerge(baseTokens, JSON.parse(JSON.stringify(themeTokens)))
    const mergedFlat = flattenTokens(merged)

    // Determine color-scheme from theme name
    let colorScheme = "light dark"
    if (themeName === "dark-modern") colorScheme = "dark"
    else if (themeName === "light-modern") colorScheme = "light"

    const themeLines = [
      `@layer pm.tokens {`,
      `  .pm-theme-${themeName} {`,
      `    color-scheme: ${colorScheme};`,
      "",
    ]

    // Only output tokens that are in the theme override set
    for (const t of mergedFlat) {
      if (!overriddenVars.has(t.cssVar)) continue

      if (t.lightDark) {
        const lightVal = isReference(t.lightDark.light)
          ? refToCssVar(t.lightDark.light)
          : t.lightDark.light
        const darkVal = isReference(t.lightDark.dark)
          ? refToCssVar(t.lightDark.dark)
          : t.lightDark.dark
        themeLines.push(`    ${t.cssVar}: light-dark(${lightVal}, ${darkVal});`)
      } else {
        themeLines.push(`    ${t.cssVar}: ${t.value};`)
      }
    }

    themeLines.push("  }")
    themeLines.push("}")
    themeLines.push("")

    writeFileSync(resolve(distDir, "css", `theme-${themeName}.css`), themeLines.join("\n"))
  }

  // -------------------------------------------------------------------------
  // Generate themes.css barrel
  // -------------------------------------------------------------------------
  const themesBarrelLines = themeNames.map((name) => `@import "./theme-${name}.css";`)
  themesBarrelLines.push("")
  writeFileSync(resolve(distDir, "css", "themes.css"), themesBarrelLines.join("\n"))

  // -------------------------------------------------------------------------
  // Copy foundational CSS
  // -------------------------------------------------------------------------
  const resetCss = readFileSync(resolve(srcDir, "reset.css"), "utf-8")
  const layersCss = readFileSync(resolve(srcDir, "layers.css"), "utf-8")
  writeFileSync(resolve(distDir, "css", "reset.css"), resetCss)
  writeFileSync(resolve(distDir, "css", "layers.css"), layersCss)

  // -------------------------------------------------------------------------
  // Report
  // -------------------------------------------------------------------------
  console.log(`Built ${primFlat.length} primitive + ${semFlat.length} semantic tokens`)
  console.log(`  -> dist/css/primitives.css`)
  console.log(`  -> dist/css/semantic.css`)
  console.log(`  -> dist/css/tokens.css`)
  console.log(`  -> dist/css/properties.css`)
  console.log(`  -> dist/css/reset.css`)
  console.log(`  -> dist/css/layers.css`)
  console.log(`  -> dist/js/tokens.js`)
  console.log(`  -> dist/js/tokens.d.ts`)
  for (const name of themeNames) {
    console.log(`  -> dist/css/theme-${name}.css`)
  }
  console.log(`  -> dist/css/themes.css`)
}

build().catch((err) => {
  console.error("Token build failed:", err)
  process.exit(1)
})
