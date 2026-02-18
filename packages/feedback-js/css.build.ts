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

// Read all component CSS
const spinnerCss = readFileSync(resolve(srcDir, "spinner", "spinner.css"), "utf-8")
const skeletonCss = readFileSync(resolve(srcDir, "skeleton", "skeleton.css"), "utf-8")
const progressBarCss = readFileSync(resolve(srcDir, "progress-bar", "progress-bar.css"), "utf-8")
const circularProgressCss = readFileSync(
  resolve(srcDir, "circular-progress", "circular-progress.css"),
  "utf-8",
)
const loadingOverlayCss = readFileSync(
  resolve(srcDir, "loading-overlay", "loading-overlay.css"),
  "utf-8",
)
const nprogressCss = readFileSync(resolve(srcDir, "nprogress", "nprogress.css"), "utf-8")
const inlineMessageCss = readFileSync(
  resolve(srcDir, "inline-message", "inline-message.css"),
  "utf-8",
)
const alertCss = readFileSync(resolve(srcDir, "alert", "alert.css"), "utf-8")
const bannerCss = readFileSync(resolve(srcDir, "banner", "banner.css"), "utf-8")
const notificationCss = readFileSync(
  resolve(srcDir, "notification", "notification.css"),
  "utf-8",
)
const toastCss = readFileSync(resolve(srcDir, "toast", "toast.css"), "utf-8")

// Combine into full readable CSS
const fullCss = [
  layersCss,
  tokensCss,
  resetCss,
  spinnerCss,
  skeletonCss,
  progressBarCss,
  circularProgressCss,
  loadingOverlayCss,
  nprogressCss,
  inlineMessageCss,
  alertCss,
  bannerCss,
  notificationCss,
  toastCss,
].join("\n")

// Write readable CSS
const { code: minified } = transform({
  filename: "feedback.css",
  code: Buffer.from(fullCss),
  minify: false,
  sourceMap: false,
})
writeFileSync(resolve(cssDistDir, "feedback.css"), minified)

// Write minified version
const { code: minifiedCode } = transform({
  filename: "feedback.min.css",
  code: Buffer.from(fullCss),
  minify: true,
  sourceMap: false,
})
writeFileSync(resolve(cssDistDir, "feedback.min.css"), minifiedCode)

// Write layers version (same as full, it already has layers)
writeFileSync(resolve(cssDistDir, "feedback.layers.css"), minified)

// Process CSS modules for each component
const components = [
  "spinner",
  "skeleton",
  "progress-bar",
  "circular-progress",
  "loading-overlay",
  "nprogress",
  "inline-message",
  "alert",
  "banner",
  "notification",
  "toast",
]

for (const component of components) {
  const moduleSrc = readFileSync(
    resolve(srcDir, component, `${component}.module.css`),
    "utf-8",
  )

  const { code: moduleCode, exports: moduleExports } = transform({
    filename: `${component}.module.css`,
    code: Buffer.from(moduleSrc),
    cssModules: {
      pattern: "pm_[hash]_[local]",
    },
    minify: false,
    sourceMap: false,
  })

  writeFileSync(resolve(cssDistDir, `${component}.module.css`), moduleCode)

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

    writeFileSync(resolve(cssDistDir, `${component}.module.js`), mapJs)
    writeFileSync(resolve(cssDistDir, `${component}.module.d.ts`), mapDts)
  }
}

console.log("CSS build complete:")
console.log("  -> dist/css/feedback.css")
console.log("  -> dist/css/feedback.min.css")
console.log("  -> dist/css/feedback.layers.css")
for (const component of components) {
  console.log(`  -> dist/css/${component}.module.css`)
  console.log(`  -> dist/css/${component}.module.js`)
  console.log(`  -> dist/css/${component}.module.d.ts`)
}
