import { build } from "esbuild"
import { cpSync, readFileSync, writeFileSync, mkdirSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, "dist")
const tokensDistCss = resolve(__dirname, "..", "tokens", "dist", "css")

mkdirSync(distDir, { recursive: true })

// Build IIFE bundle
await build({
  entryPoints: [resolve(__dirname, "src/index.ts")],
  bundle: true,
  format: "iife",
  globalName: "Paramanu",
  outfile: resolve(distDir, "paramanu.min.js"),
  minify: true,
  target: "es2022",
  platform: "browser",
})

// Also build non-minified version
await build({
  entryPoints: [resolve(__dirname, "src/index.ts")],
  bundle: true,
  format: "iife",
  globalName: "Paramanu",
  outfile: resolve(distDir, "paramanu.js"),
  minify: false,
  target: "es2022",
  platform: "browser",
})

// ---------------------------------------------------------------------------
// CSS: Combine tokens + all component packages into single paramanu.css
// ---------------------------------------------------------------------------

const componentPackages = [
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

const packageNameMap: Record<string, string> = {
  "primitives-js": "primitives",
  "typography-js": "typography",
  "utilities-js": "utilities",
  "buttons-js": "buttons",
  "data-display-js": "data-display",
  "feedback-js": "feedback",
  "forms-js": "forms",
  "navigation-js": "navigation",
  "disclosure-js": "disclosure",
  "overlays-js": "overlays",
}

// Collect CSS parts in order: layers → reset → tokens → components
const cssParts: string[] = []
cssParts.push(readFileSync(resolve(tokensDistCss, "layers.css"), "utf-8"))
cssParts.push(readFileSync(resolve(tokensDistCss, "reset.css"), "utf-8"))
cssParts.push(readFileSync(resolve(tokensDistCss, "tokens.css"), "utf-8"))

for (const pkg of componentPackages) {
  const cssName = packageNameMap[pkg]
  const cssPath = resolve(__dirname, "..", pkg, "dist", "css", `${cssName}.css`)
  try {
    cssParts.push(readFileSync(cssPath, "utf-8"))
  } catch {
    // Package may not have CSS yet (empty scaffold)
  }
}

const combinedCss = cssParts.join("\n")
writeFileSync(resolve(distDir, "paramanu.css"), combinedCss)

// Minified version
const { transform } = await import("lightningcss")
const { code: minified } = transform({
  filename: "paramanu.min.css",
  code: Buffer.from(combinedCss),
  minify: true,
  sourceMap: false,
})
writeFileSync(resolve(distDir, "paramanu.min.css"), minified)

// Copy @property CSS
cpSync(resolve(tokensDistCss, "properties.css"), resolve(distDir, "paramanu-properties.css"))

// Copy theme files
const themes = ["material", "antd", "bootstrap", "dark-modern", "light-modern"]
for (const theme of themes) {
  cpSync(
    resolve(tokensDistCss, `theme-${theme}.css`),
    resolve(distDir, `paramanu-theme-${theme}.css`),
  )
}

// Copy themes barrel
cpSync(resolve(tokensDistCss, "themes.css"), resolve(distDir, "paramanu-themes.css"))

console.log("CDN build complete:")
console.log("  -> dist/paramanu.js")
console.log("  -> dist/paramanu.min.js")
console.log("  -> dist/paramanu.css (tokens + all components)")
console.log("  -> dist/paramanu.min.css")
console.log("  -> dist/paramanu-properties.css (@property declarations)")
console.log("  -> dist/paramanu-themes.css (all themes barrel)")
for (const theme of themes) {
  console.log(`  -> dist/paramanu-theme-${theme}.css`)
}
