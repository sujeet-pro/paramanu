import { build } from "esbuild"
import { cpSync, mkdirSync } from "node:fs"
import { resolve, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, "dist")

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

// Copy CSS from buttons-js
const buttonsCssDir = resolve(__dirname, "..", "buttons-js", "dist", "css")
cpSync(resolve(buttonsCssDir, "buttons.css"), resolve(distDir, "paramanu.css"))
cpSync(resolve(buttonsCssDir, "buttons.min.css"), resolve(distDir, "paramanu.min.css"))

console.log("CDN build complete:")
console.log("  -> dist/paramanu.js")
console.log("  -> dist/paramanu.min.js")
console.log("  -> dist/paramanu.css")
console.log("  -> dist/paramanu.min.css")
