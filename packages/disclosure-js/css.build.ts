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
const collapsibleCss = readFileSync(resolve(srcDir, "collapsible", "collapsible.css"), "utf-8")
const accordionCss = readFileSync(resolve(srcDir, "accordion", "accordion.css"), "utf-8")
const carouselCss = readFileSync(resolve(srcDir, "carousel", "carousel.css"), "utf-8")
const tourCss = readFileSync(resolve(srcDir, "tour", "tour.css"), "utf-8")

// Combine into full readable CSS
const fullCss = [layersCss, tokensCss, resetCss, collapsibleCss, accordionCss, carouselCss, tourCss].join("\n")

// Write readable CSS
const { code: minified } = transform({
  filename: "disclosure.css",
  code: Buffer.from(fullCss),
  minify: false,
  sourceMap: false,
})
writeFileSync(resolve(cssDistDir, "disclosure.css"), minified)

// Write minified version
const { code: minifiedCode } = transform({
  filename: "disclosure.min.css",
  code: Buffer.from(fullCss),
  minify: true,
  sourceMap: false,
})
writeFileSync(resolve(cssDistDir, "disclosure.min.css"), minifiedCode)

// Write layers version (same as full, it already has layers)
writeFileSync(resolve(cssDistDir, "disclosure.layers.css"), minified)

// Process CSS modules for collapsible
const collapsibleModuleSrc = readFileSync(
  resolve(srcDir, "collapsible", "collapsible.module.css"),
  "utf-8",
)

const { code: collapsibleModuleCode, exports: collapsibleModuleExports } = transform({
  filename: "collapsible.module.css",
  code: Buffer.from(collapsibleModuleSrc),
  cssModules: {
    pattern: "pm_[hash]_[local]",
  },
  minify: false,
  sourceMap: false,
})

writeFileSync(resolve(cssDistDir, "collapsible.module.css"), collapsibleModuleCode)

if (collapsibleModuleExports) {
  const mapEntries: string[] = []
  const dtsEntries: string[] = []

  for (const [localName, exported] of Object.entries(collapsibleModuleExports)) {
    const hashedName = exported.name
    mapEntries.push(`  "${localName}": "${hashedName}"`)
    dtsEntries.push(`  "${localName}": string`)
  }

  const mapJs = `const classMap = {\n${mapEntries.join(",\n")}\n}\nexport default classMap\n`
  const mapDts = `declare const classMap: {\n${dtsEntries.join("\n")}\n}\nexport default classMap\n`

  writeFileSync(resolve(cssDistDir, "collapsible.module.js"), mapJs)
  writeFileSync(resolve(cssDistDir, "collapsible.module.d.ts"), mapDts)
}

// Process CSS modules for accordion
const accordionModuleSrc = readFileSync(
  resolve(srcDir, "accordion", "accordion.module.css"),
  "utf-8",
)

const { code: accordionModuleCode, exports: accordionModuleExports } = transform({
  filename: "accordion.module.css",
  code: Buffer.from(accordionModuleSrc),
  cssModules: {
    pattern: "pm_[hash]_[local]",
  },
  minify: false,
  sourceMap: false,
})

writeFileSync(resolve(cssDistDir, "accordion.module.css"), accordionModuleCode)

if (accordionModuleExports) {
  const mapEntries: string[] = []
  const dtsEntries: string[] = []

  for (const [localName, exported] of Object.entries(accordionModuleExports)) {
    const hashedName = exported.name
    mapEntries.push(`  "${localName}": "${hashedName}"`)
    dtsEntries.push(`  "${localName}": string`)
  }

  const mapJs = `const classMap = {\n${mapEntries.join(",\n")}\n}\nexport default classMap\n`
  const mapDts = `declare const classMap: {\n${dtsEntries.join("\n")}\n}\nexport default classMap\n`

  writeFileSync(resolve(cssDistDir, "accordion.module.js"), mapJs)
  writeFileSync(resolve(cssDistDir, "accordion.module.d.ts"), mapDts)
}

// Process CSS modules for carousel
const carouselModuleSrc = readFileSync(
  resolve(srcDir, "carousel", "carousel.module.css"),
  "utf-8",
)

const { code: carouselModuleCode, exports: carouselModuleExports } = transform({
  filename: "carousel.module.css",
  code: Buffer.from(carouselModuleSrc),
  cssModules: {
    pattern: "pm_[hash]_[local]",
  },
  minify: false,
  sourceMap: false,
})

writeFileSync(resolve(cssDistDir, "carousel.module.css"), carouselModuleCode)

if (carouselModuleExports) {
  const mapEntries: string[] = []
  const dtsEntries: string[] = []

  for (const [localName, exported] of Object.entries(carouselModuleExports)) {
    const hashedName = exported.name
    mapEntries.push(`  "${localName}": "${hashedName}"`)
    dtsEntries.push(`  "${localName}": string`)
  }

  const mapJs = `const classMap = {\n${mapEntries.join(",\n")}\n}\nexport default classMap\n`
  const mapDts = `declare const classMap: {\n${dtsEntries.join("\n")}\n}\nexport default classMap\n`

  writeFileSync(resolve(cssDistDir, "carousel.module.js"), mapJs)
  writeFileSync(resolve(cssDistDir, "carousel.module.d.ts"), mapDts)
}

// Process CSS modules for tour
const tourModuleSrc = readFileSync(resolve(srcDir, "tour", "tour.module.css"), "utf-8")

const { code: tourModuleCode, exports: tourModuleExports } = transform({
  filename: "tour.module.css",
  code: Buffer.from(tourModuleSrc),
  cssModules: {
    pattern: "pm_[hash]_[local]",
  },
  minify: false,
  sourceMap: false,
})

writeFileSync(resolve(cssDistDir, "tour.module.css"), tourModuleCode)

if (tourModuleExports) {
  const mapEntries: string[] = []
  const dtsEntries: string[] = []

  for (const [localName, exported] of Object.entries(tourModuleExports)) {
    const hashedName = exported.name
    mapEntries.push(`  "${localName}": "${hashedName}"`)
    dtsEntries.push(`  "${localName}": string`)
  }

  const mapJs = `const classMap = {\n${mapEntries.join(",\n")}\n}\nexport default classMap\n`
  const mapDts = `declare const classMap: {\n${dtsEntries.join("\n")}\n}\nexport default classMap\n`

  writeFileSync(resolve(cssDistDir, "tour.module.js"), mapJs)
  writeFileSync(resolve(cssDistDir, "tour.module.d.ts"), mapDts)
}

console.log("CSS build complete:")
console.log("  -> dist/css/disclosure.css")
console.log("  -> dist/css/disclosure.min.css")
console.log("  -> dist/css/disclosure.layers.css")
console.log("  -> dist/css/collapsible.module.css")
console.log("  -> dist/css/collapsible.module.js")
console.log("  -> dist/css/collapsible.module.d.ts")
console.log("  -> dist/css/accordion.module.css")
console.log("  -> dist/css/accordion.module.js")
console.log("  -> dist/css/accordion.module.d.ts")
console.log("  -> dist/css/carousel.module.css")
console.log("  -> dist/css/carousel.module.js")
console.log("  -> dist/css/carousel.module.d.ts")
console.log("  -> dist/css/tour.module.css")
console.log("  -> dist/css/tour.module.js")
console.log("  -> dist/css/tour.module.d.ts")
