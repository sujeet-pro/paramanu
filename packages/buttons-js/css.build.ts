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
const buttonCss = readFileSync(resolve(srcDir, "button", "button.css"), "utf-8")
const buttonGroupCss = readFileSync(resolve(srcDir, "button-group", "button-group.css"), "utf-8")
const closeButtonCss = readFileSync(resolve(srcDir, "close-button", "close-button.css"), "utf-8")
const iconButtonCss = readFileSync(resolve(srcDir, "icon-button", "icon-button.css"), "utf-8")
const toggleButtonCss = readFileSync(
  resolve(srcDir, "toggle-button", "toggle-button.css"),
  "utf-8",
)
const toggleGroupCss = readFileSync(resolve(srcDir, "toggle-group", "toggle-group.css"), "utf-8")
const fabCss = readFileSync(resolve(srcDir, "fab", "fab.css"), "utf-8")

// Combine into full readable CSS
const fullCss = [
  layersCss,
  tokensCss,
  resetCss,
  buttonCss,
  buttonGroupCss,
  closeButtonCss,
  iconButtonCss,
  toggleButtonCss,
  toggleGroupCss,
  fabCss,
].join("\n")

// Write readable CSS
const { code: minified } = transform({
  filename: "buttons.css",
  code: Buffer.from(fullCss),
  minify: false,
  sourceMap: false,
})
writeFileSync(resolve(cssDistDir, "buttons.css"), minified)

// Write minified version
const { code: minifiedCode } = transform({
  filename: "buttons.min.css",
  code: Buffer.from(fullCss),
  minify: true,
  sourceMap: false,
})
writeFileSync(resolve(cssDistDir, "buttons.min.css"), minifiedCode)

// Write layers version (same as full, it already has layers)
writeFileSync(resolve(cssDistDir, "buttons.layers.css"), minified)

// Process CSS modules for button
const buttonModuleSrc = readFileSync(resolve(srcDir, "button", "button.module.css"), "utf-8")
const buttonGroupModuleSrc = readFileSync(
  resolve(srcDir, "button-group", "button-group.module.css"),
  "utf-8",
)

const { code: moduleCode, exports: moduleExports } = transform({
  filename: "button.module.css",
  code: Buffer.from(buttonModuleSrc),
  cssModules: {
    pattern: "pm_[hash]_[local]",
  },
  minify: false,
  sourceMap: false,
})

writeFileSync(resolve(cssDistDir, "button.module.css"), moduleCode)

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

  writeFileSync(resolve(cssDistDir, "button.module.js"), mapJs)
  writeFileSync(resolve(cssDistDir, "button.module.d.ts"), mapDts)
}

// Process CSS modules for button-group
const {
  code: buttonGroupModuleCode,
  exports: buttonGroupModuleExports,
} = transform({
  filename: "button-group.module.css",
  code: Buffer.from(buttonGroupModuleSrc),
  cssModules: {
    pattern: "pm_[hash]_[local]",
  },
  minify: false,
  sourceMap: false,
})

writeFileSync(resolve(cssDistDir, "button-group.module.css"), buttonGroupModuleCode)

// Generate JS class map from button-group CSS modules exports
if (buttonGroupModuleExports) {
  const mapEntries: string[] = []
  const dtsEntries: string[] = []

  for (const [localName, exported] of Object.entries(buttonGroupModuleExports)) {
    const hashedName = exported.name
    mapEntries.push(`  "${localName}": "${hashedName}"`)
    dtsEntries.push(`  "${localName}": string`)
  }

  const mapJs = `const classMap = {\n${mapEntries.join(",\n")}\n}\nexport default classMap\n`
  const mapDts = `declare const classMap: {\n${dtsEntries.join("\n")}\n}\nexport default classMap\n`

  writeFileSync(resolve(cssDistDir, "button-group.module.js"), mapJs)
  writeFileSync(resolve(cssDistDir, "button-group.module.d.ts"), mapDts)
}

// Process CSS modules for close-button
const closeButtonModuleSrc = readFileSync(
  resolve(srcDir, "close-button", "close-button.module.css"),
  "utf-8",
)

const {
  code: closeButtonModuleCode,
  exports: closeButtonModuleExports,
} = transform({
  filename: "close-button.module.css",
  code: Buffer.from(closeButtonModuleSrc),
  cssModules: {
    pattern: "pm_[hash]_[local]",
  },
  minify: false,
  sourceMap: false,
})

writeFileSync(resolve(cssDistDir, "close-button.module.css"), closeButtonModuleCode)

// Generate JS class map from close-button CSS modules exports
if (closeButtonModuleExports) {
  const mapEntries: string[] = []
  const dtsEntries: string[] = []

  for (const [localName, exported] of Object.entries(closeButtonModuleExports)) {
    const hashedName = exported.name
    mapEntries.push(`  "${localName}": "${hashedName}"`)
    dtsEntries.push(`  "${localName}": string`)
  }

  const mapJs = `const classMap = {\n${mapEntries.join(",\n")}\n}\nexport default classMap\n`
  const mapDts = `declare const classMap: {\n${dtsEntries.join("\n")}\n}\nexport default classMap\n`

  writeFileSync(resolve(cssDistDir, "close-button.module.js"), mapJs)
  writeFileSync(resolve(cssDistDir, "close-button.module.d.ts"), mapDts)
}

// Process CSS modules for icon-button
const iconButtonModuleSrc = readFileSync(
  resolve(srcDir, "icon-button", "icon-button.module.css"),
  "utf-8",
)

const {
  code: iconButtonModuleCode,
  exports: iconButtonModuleExports,
} = transform({
  filename: "icon-button.module.css",
  code: Buffer.from(iconButtonModuleSrc),
  cssModules: {
    pattern: "pm_[hash]_[local]",
  },
  minify: false,
  sourceMap: false,
})

writeFileSync(resolve(cssDistDir, "icon-button.module.css"), iconButtonModuleCode)

if (iconButtonModuleExports) {
  const mapEntries: string[] = []
  const dtsEntries: string[] = []

  for (const [localName, exported] of Object.entries(iconButtonModuleExports)) {
    const hashedName = exported.name
    mapEntries.push(`  "${localName}": "${hashedName}"`)
    dtsEntries.push(`  "${localName}": string`)
  }

  const mapJs = `const classMap = {\n${mapEntries.join(",\n")}\n}\nexport default classMap\n`
  const mapDts = `declare const classMap: {\n${dtsEntries.join("\n")}\n}\nexport default classMap\n`

  writeFileSync(resolve(cssDistDir, "icon-button.module.js"), mapJs)
  writeFileSync(resolve(cssDistDir, "icon-button.module.d.ts"), mapDts)
}

// Process CSS modules for toggle-button
const toggleButtonModuleSrc = readFileSync(
  resolve(srcDir, "toggle-button", "toggle-button.module.css"),
  "utf-8",
)

const {
  code: toggleButtonModuleCode,
  exports: toggleButtonModuleExports,
} = transform({
  filename: "toggle-button.module.css",
  code: Buffer.from(toggleButtonModuleSrc),
  cssModules: {
    pattern: "pm_[hash]_[local]",
  },
  minify: false,
  sourceMap: false,
})

writeFileSync(resolve(cssDistDir, "toggle-button.module.css"), toggleButtonModuleCode)

if (toggleButtonModuleExports) {
  const mapEntries: string[] = []
  const dtsEntries: string[] = []

  for (const [localName, exported] of Object.entries(toggleButtonModuleExports)) {
    const hashedName = exported.name
    mapEntries.push(`  "${localName}": "${hashedName}"`)
    dtsEntries.push(`  "${localName}": string`)
  }

  const mapJs = `const classMap = {\n${mapEntries.join(",\n")}\n}\nexport default classMap\n`
  const mapDts = `declare const classMap: {\n${dtsEntries.join("\n")}\n}\nexport default classMap\n`

  writeFileSync(resolve(cssDistDir, "toggle-button.module.js"), mapJs)
  writeFileSync(resolve(cssDistDir, "toggle-button.module.d.ts"), mapDts)
}

// Process CSS modules for toggle-group
const toggleGroupModuleSrc = readFileSync(
  resolve(srcDir, "toggle-group", "toggle-group.module.css"),
  "utf-8",
)

const {
  code: toggleGroupModuleCode,
  exports: toggleGroupModuleExports,
} = transform({
  filename: "toggle-group.module.css",
  code: Buffer.from(toggleGroupModuleSrc),
  cssModules: {
    pattern: "pm_[hash]_[local]",
  },
  minify: false,
  sourceMap: false,
})

writeFileSync(resolve(cssDistDir, "toggle-group.module.css"), toggleGroupModuleCode)

if (toggleGroupModuleExports) {
  const mapEntries: string[] = []
  const dtsEntries: string[] = []

  for (const [localName, exported] of Object.entries(toggleGroupModuleExports)) {
    const hashedName = exported.name
    mapEntries.push(`  "${localName}": "${hashedName}"`)
    dtsEntries.push(`  "${localName}": string`)
  }

  const mapJs = `const classMap = {\n${mapEntries.join(",\n")}\n}\nexport default classMap\n`
  const mapDts = `declare const classMap: {\n${dtsEntries.join("\n")}\n}\nexport default classMap\n`

  writeFileSync(resolve(cssDistDir, "toggle-group.module.js"), mapJs)
  writeFileSync(resolve(cssDistDir, "toggle-group.module.d.ts"), mapDts)
}

// Process CSS modules for fab
const fabModuleSrc = readFileSync(resolve(srcDir, "fab", "fab.module.css"), "utf-8")

const {
  code: fabModuleCode,
  exports: fabModuleExports,
} = transform({
  filename: "fab.module.css",
  code: Buffer.from(fabModuleSrc),
  cssModules: {
    pattern: "pm_[hash]_[local]",
  },
  minify: false,
  sourceMap: false,
})

writeFileSync(resolve(cssDistDir, "fab.module.css"), fabModuleCode)

if (fabModuleExports) {
  const mapEntries: string[] = []
  const dtsEntries: string[] = []

  for (const [localName, exported] of Object.entries(fabModuleExports)) {
    const hashedName = exported.name
    mapEntries.push(`  "${localName}": "${hashedName}"`)
    dtsEntries.push(`  "${localName}": string`)
  }

  const mapJs = `const classMap = {\n${mapEntries.join(",\n")}\n}\nexport default classMap\n`
  const mapDts = `declare const classMap: {\n${dtsEntries.join("\n")}\n}\nexport default classMap\n`

  writeFileSync(resolve(cssDistDir, "fab.module.js"), mapJs)
  writeFileSync(resolve(cssDistDir, "fab.module.d.ts"), mapDts)
}

console.log("CSS build complete:")
console.log("  -> dist/css/buttons.css")
console.log("  -> dist/css/buttons.min.css")
console.log("  -> dist/css/buttons.layers.css")
console.log("  -> dist/css/button.module.css")
console.log("  -> dist/css/button.module.js")
console.log("  -> dist/css/button.module.d.ts")
console.log("  -> dist/css/button-group.module.css")
console.log("  -> dist/css/button-group.module.js")
console.log("  -> dist/css/button-group.module.d.ts")
console.log("  -> dist/css/close-button.module.css")
console.log("  -> dist/css/close-button.module.js")
console.log("  -> dist/css/close-button.module.d.ts")
console.log("  -> dist/css/icon-button.module.css")
console.log("  -> dist/css/icon-button.module.js")
console.log("  -> dist/css/icon-button.module.d.ts")
console.log("  -> dist/css/toggle-button.module.css")
console.log("  -> dist/css/toggle-button.module.js")
console.log("  -> dist/css/toggle-button.module.d.ts")
console.log("  -> dist/css/toggle-group.module.css")
console.log("  -> dist/css/toggle-group.module.js")
console.log("  -> dist/css/toggle-group.module.d.ts")
console.log("  -> dist/css/fab.module.css")
console.log("  -> dist/css/fab.module.js")
console.log("  -> dist/css/fab.module.d.ts")
