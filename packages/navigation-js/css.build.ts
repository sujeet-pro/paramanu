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

// All navigation components
const components = [
  "link",
  "skip-nav-link",
  "back-to-top",
  "breadcrumbs",
  "tabs",
  "pagination",
  "steps",
  "menu",
  "menubar",
  "dropdown-menu",
  "context-menu",
  "navbar",
  "sidebar",
  "tree-view",
]

// Read all component CSS
const componentCssFiles: string[] = []
for (const name of components) {
  const cssPath = resolve(srcDir, name, `${name}.css`)
  if (existsSync(cssPath)) {
    componentCssFiles.push(readFileSync(cssPath, "utf-8"))
  }
}

// Combine into full readable CSS
const fullCss = [layersCss, tokensCss, resetCss, ...componentCssFiles].join("\n")

// Write readable CSS
const { code: minified } = transform({
  filename: "navigation.css",
  code: Buffer.from(fullCss),
  minify: false,
  sourceMap: false,
})
writeFileSync(resolve(cssDistDir, "navigation.css"), minified)

// Write minified version
const { code: minifiedCode } = transform({
  filename: "navigation.min.css",
  code: Buffer.from(fullCss),
  minify: true,
  sourceMap: false,
})
writeFileSync(resolve(cssDistDir, "navigation.min.css"), minifiedCode)

// Write layers version (same as full, it already has layers)
writeFileSync(resolve(cssDistDir, "navigation.layers.css"), minified)

// Process CSS modules for each component
for (const name of components) {
  const modulePath = resolve(srcDir, name, `${name}.module.css`)
  if (!existsSync(modulePath)) continue

  const moduleSrc = readFileSync(modulePath, "utf-8")

  const { code: moduleCode, exports: moduleExports } = transform({
    filename: `${name}.module.css`,
    code: Buffer.from(moduleSrc),
    cssModules: {
      pattern: "pm_[hash]_[local]",
    },
    minify: false,
    sourceMap: false,
  })

  writeFileSync(resolve(cssDistDir, `${name}.module.css`), moduleCode)

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

    writeFileSync(resolve(cssDistDir, `${name}.module.js`), mapJs)
    writeFileSync(resolve(cssDistDir, `${name}.module.d.ts`), mapDts)
  }
}

console.log("CSS build complete:")
console.log("  -> dist/css/navigation.css")
console.log("  -> dist/css/navigation.min.css")
console.log("  -> dist/css/navigation.layers.css")
for (const name of components) {
  const modulePath = resolve(srcDir, name, `${name}.module.css`)
  if (existsSync(modulePath)) {
    console.log(`  -> dist/css/${name}.module.css`)
    console.log(`  -> dist/css/${name}.module.js`)
    console.log(`  -> dist/css/${name}.module.d.ts`)
  }
}
