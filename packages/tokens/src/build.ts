import StyleDictionary from "style-dictionary"
import { fileURLToPath } from "node:url"
import { dirname, resolve } from "node:path"
import { writeFileSync, mkdirSync, readFileSync } from "node:fs"

const __dirname = dirname(fileURLToPath(import.meta.url))
const rootDir = resolve(__dirname, "..")
const distDir = resolve(rootDir, "dist")

// Flatten tokens.json into a flat map of CSS custom property name -> value
interface TokenValue {
  $value: string | number
  $type: string
}

interface TokenGroup {
  [key: string]: TokenValue | TokenGroup
}

function isTokenValue(obj: unknown): obj is TokenValue {
  return typeof obj === "object" && obj !== null && "$value" in obj
}

function flattenTokens(
  obj: TokenGroup,
  prefix: string = "pm",
  result: Map<string, string> = new Map(),
): Map<string, string> {
  for (const [key, value] of Object.entries(obj)) {
    const name = `${prefix}-${key}`
    if (isTokenValue(value)) {
      result.set(`--${name}`, String(value.$value))
    } else {
      flattenTokens(value as TokenGroup, name, result)
    }
  }
  return result
}

// Read tokens
const tokensPath = resolve(__dirname, "tokens.json")
const tokens: TokenGroup = JSON.parse(readFileSync(tokensPath, "utf-8"))
const flat = flattenTokens(tokens)

// Ensure dist directories exist
mkdirSync(resolve(distDir, "css"), { recursive: true })
mkdirSync(resolve(distDir, "js"), { recursive: true })

// Generate CSS custom properties
const cssLines = [":root {"]
for (const [name, value] of flat) {
  cssLines.push(`  ${name}: ${value};`)
}
cssLines.push("}")
cssLines.push("")

const cssContent = cssLines.join("\n")
writeFileSync(resolve(distDir, "css", "tokens.css"), cssContent)

// Generate CSS with @layer wrapper
const layerContent = `@layer pm.tokens {\n${cssContent}}\n`
writeFileSync(resolve(distDir, "css", "tokens.layers.css"), layerContent)

// Generate JS constants
const jsLines: string[] = []
const dtsLines: string[] = []

for (const [name, value] of flat) {
  // Convert --pm-color-primary-500 to pmColorPrimary500
  const camelName = name
    .replace(/^--/, "")
    .replace(/-([a-z0-9])/g, (_, c: string) => c.toUpperCase())

  jsLines.push(`export const ${camelName} = "${name}"`)
  dtsLines.push(`export declare const ${camelName}: string`)
}

jsLines.push("")
dtsLines.push("")

writeFileSync(resolve(distDir, "js", "tokens.js"), jsLines.join("\n"))
writeFileSync(resolve(distDir, "js", "tokens.d.ts"), dtsLines.join("\n"))

// Copy foundational CSS files (reset + layers) into dist/css
const resetCss = readFileSync(resolve(__dirname, "reset.css"), "utf-8")
const layersCss = readFileSync(resolve(__dirname, "layers.css"), "utf-8")
writeFileSync(resolve(distDir, "css", "reset.css"), resetCss)
writeFileSync(resolve(distDir, "css", "layers.css"), layersCss)

console.log(`Built ${flat.size} tokens`)
console.log("  -> dist/css/tokens.css")
console.log("  -> dist/css/tokens.layers.css")
console.log("  -> dist/css/reset.css")
console.log("  -> dist/css/layers.css")
console.log("  -> dist/js/tokens.js")
console.log("  -> dist/js/tokens.d.ts")
