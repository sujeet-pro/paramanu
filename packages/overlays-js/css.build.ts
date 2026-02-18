import { readFileSync, writeFileSync, mkdirSync } from "node:fs"
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

// Read component CSS
const components = [
  "backdrop",
  "dialog",
  "alert-dialog",
  "inline-dialog",
  "drawer",
  "sheet",
  "popover",
  "tooltip",
  "hover-card",
  "command-palette",
]

const componentCss = components.map((name) =>
  readFileSync(resolve(srcDir, name, `${name}.css`), "utf-8"),
)

// Combine into full readable CSS
const fullCss = [layersCss, tokensCss, resetCss, ...componentCss].join("\n")

// Write readable CSS
const { code: minified } = transform({
  filename: "overlays.css",
  code: Buffer.from(fullCss),
  minify: false,
  sourceMap: false,
})
writeFileSync(resolve(cssDistDir, "overlays.css"), minified)

// Write minified version
const { code: minifiedCode } = transform({
  filename: "overlays.min.css",
  code: Buffer.from(fullCss),
  minify: true,
  sourceMap: false,
})
writeFileSync(resolve(cssDistDir, "overlays.min.css"), minifiedCode)

// Write layers version
writeFileSync(resolve(cssDistDir, "overlays.layers.css"), minified)

// Process CSS modules for each component
function processModule(name: string): void {
  const moduleSrc = readFileSync(resolve(srcDir, name, `${name}.module.css`), "utf-8")

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

for (const name of components) {
  processModule(name)
}

console.log("CSS build complete:")
console.log("  -> dist/css/overlays.css")
console.log("  -> dist/css/overlays.min.css")
console.log("  -> dist/css/overlays.layers.css")
for (const name of components) {
  console.log(`  -> dist/css/${name}.module.css`)
  console.log(`  -> dist/css/${name}.module.js`)
  console.log(`  -> dist/css/${name}.module.d.ts`)
}
