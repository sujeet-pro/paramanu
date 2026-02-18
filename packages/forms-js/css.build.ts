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

// All form components
const components = [
  "label",
  "form-control",
  "fieldset",
  "form",
  "input",
  "textarea",
  "password-input",
  "number-input",
  "search-input",
  "checkbox",
  "checkbox-card",
  "radio",
  "radio-card",
  "switch",
  "segmented-control",
  "native-select",
  "select",
  "multi-select",
  "combobox",
  "calendar",
  "date-picker",
  "date-range-picker",
  "time-picker",
  "color-picker",
  "cascader",
  "slider",
  "rating",
  "pin-input",
  "tags-input",
  "editable-text",
  "mentions",
  "file-upload",
  "dropzone",
  "transfer",
]

// Read all component CSS files
const componentCssFiles = components.map((name) =>
  readFileSync(resolve(srcDir, name, `${name}.css`), "utf-8"),
)

// Combine into full readable CSS
const fullCss = [layersCss, tokensCss, resetCss, ...componentCssFiles].join("\n")

// Write readable CSS
const { code: readable } = transform({
  filename: "forms.css",
  code: Buffer.from(fullCss),
  minify: false,
  sourceMap: false,
})
writeFileSync(resolve(cssDistDir, "forms.css"), readable)

// Write minified version
const { code: minified } = transform({
  filename: "forms.min.css",
  code: Buffer.from(fullCss),
  minify: true,
  sourceMap: false,
})
writeFileSync(resolve(cssDistDir, "forms.min.css"), minified)

// Write layers version
writeFileSync(resolve(cssDistDir, "forms.layers.css"), readable)

/**
 * Process a single CSS module file: transform with lightningcss, generate
 * the hashed CSS file plus JS/DTS class maps for consumers.
 */
function processModule(name: string): void {
  const moduleSrc = readFileSync(resolve(srcDir, name, `${name}.module.css`), "utf-8")

  const { code, exports: moduleExports } = transform({
    filename: `${name}.module.css`,
    code: Buffer.from(moduleSrc),
    cssModules: {
      pattern: "pm_[hash]_[local]",
    },
    minify: false,
    sourceMap: false,
  })

  writeFileSync(resolve(cssDistDir, `${name}.module.css`), code)

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

// Process all component modules
for (const name of components) {
  processModule(name)
}

console.log("CSS build complete:")
console.log(`  -> dist/css/forms.css`)
console.log(`  -> dist/css/forms.min.css`)
console.log(`  -> dist/css/forms.layers.css`)
for (const name of components) {
  console.log(`  -> dist/css/${name}.module.css`)
  console.log(`  -> dist/css/${name}.module.js`)
  console.log(`  -> dist/css/${name}.module.d.ts`)
}
