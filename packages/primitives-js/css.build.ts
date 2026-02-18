import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { transform } from "lightningcss"

const __dirname = dirname(fileURLToPath(import.meta.url))
const srcDir = resolve(__dirname, "src")
const distDir = resolve(__dirname, "dist")
const cssDistDir = resolve(distDir, "css")

mkdirSync(cssDistDir, { recursive: true })

// Read token CSS from the tokens package
const tokensDir = resolve(__dirname, "..", "tokens", "dist", "css")
const tokensCss = readFileSync(resolve(tokensDir, "tokens.layers.css"), "utf-8")
const layersCss = readFileSync(resolve(tokensDir, "layers.css"), "utf-8")
const resetCss = readFileSync(resolve(tokensDir, "reset.css"), "utf-8")

// All primitive component CSS files
const componentDirs = [
  "box",
  "flex",
  "stack",
  "grid",
  "simple-grid",
  "container",
  "center",
  "wrap",
  "group",
  "spacer",
  "divider",
  "aspect-ratio",
  "scroll-area",
  "bleed",
  "float",
  "splitter",
  "app-shell",
  "masonry",
]

const componentCssParts: string[] = []
for (const dir of componentDirs) {
  const cssPath = resolve(srcDir, dir, `${dir}.css`)
  if (existsSync(cssPath)) {
    componentCssParts.push(readFileSync(cssPath, "utf-8"))
  }
}

// Combine into full readable CSS
const fullCss = [layersCss, tokensCss, resetCss, ...componentCssParts].join("\n")

// Write readable CSS
const { code: readable } = transform({
  filename: "primitives.css",
  code: Buffer.from(fullCss),
  minify: false,
  sourceMap: false,
})
writeFileSync(resolve(cssDistDir, "primitives.css"), readable)

// Write minified version
const { code: minified } = transform({
  filename: "primitives.min.css",
  code: Buffer.from(fullCss),
  minify: true,
  sourceMap: false,
})
writeFileSync(resolve(cssDistDir, "primitives.min.css"), minified)

// Write layers version (same as full, it already has layers)
writeFileSync(resolve(cssDistDir, "primitives.layers.css"), readable)

// Process CSS modules for each component
for (const dir of componentDirs) {
  const modulePath = resolve(srcDir, dir, `${dir}.module.css`)
  if (!existsSync(modulePath)) continue

  const moduleSrc = readFileSync(modulePath, "utf-8")

  const { code: moduleCode, exports: moduleExports } = transform({
    filename: `${dir}.module.css`,
    code: Buffer.from(moduleSrc),
    cssModules: {
      pattern: "pm_[hash]_[local]",
    },
    minify: false,
    sourceMap: false,
  })

  writeFileSync(resolve(cssDistDir, `${dir}.module.css`), moduleCode)

  // Generate JS class map from CSS modules exports
  if (moduleExports) {
    const mapEntries: string[] = []
    const dtsEntries: string[] = []

    for (const [localName, exported] of Object.entries(moduleExports)) {
      const hashedName = exported.name
      mapEntries.push(`  "${localName}": "${hashedName}"`)
      dtsEntries.push(`  "${localName}": string`)
    }

    const mapJs = `const classMap = {\n${mapEntries.join(",\n")}\n}\nexport default classMap\n`
    const mapDts = `declare const classMap: {\n${dtsEntries.join("\n")}\n}\nexport default classMap\n`

    writeFileSync(resolve(cssDistDir, `${dir}.module.js`), mapJs)
    writeFileSync(resolve(cssDistDir, `${dir}.module.d.ts`), mapDts)
  }
}

console.log("CSS build complete:")
console.log("  -> dist/css/primitives.css")
console.log("  -> dist/css/primitives.min.css")
console.log("  -> dist/css/primitives.layers.css")
componentDirs.forEach((dir) => {
  const modulePath = resolve(srcDir, dir, `${dir}.module.css`)
  if (existsSync(modulePath)) {
    console.log(`  -> dist/css/${dir}.module.css`)
    console.log(`  -> dist/css/${dir}.module.js`)
  }
})
