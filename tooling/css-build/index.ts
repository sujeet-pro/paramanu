/**
 * Shared CSS build utility for all -js packages.
 * Handles: bundled CSS, minified CSS, per-component CSS, CSS modules + class maps.
 *
 * Token CSS is NOT bundled — consumers import it separately.
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs"
import { resolve } from "node:path"
import { transform } from "lightningcss"

export interface CssBuildConfig {
  /** Package name without @paramanu/ prefix (e.g., "buttons") */
  packageName: string
  /** Root directory of the package (where css.build.ts lives) */
  packageDir: string
  /** Component directory names (e.g., ["button", "button-group", "close-button"]) */
  components: string[]
}

export function buildCss(config: CssBuildConfig) {
  const { packageName, packageDir, components } = config
  const srcDir = resolve(packageDir, "src")
  const distDir = resolve(packageDir, "dist")
  const cssDistDir = resolve(distDir, "css")

  mkdirSync(cssDistDir, { recursive: true })

  // -----------------------------------------------------------------------
  // Collect component CSS
  // -----------------------------------------------------------------------

  const componentCssParts: { name: string; css: string }[] = []
  for (const name of components) {
    const cssPath = resolve(srcDir, name, `${name}.css`)
    if (existsSync(cssPath)) {
      componentCssParts.push({ name, css: readFileSync(cssPath, "utf-8") })
    }
  }

  const combinedCss = componentCssParts.map((c) => c.css).join("\n")

  // -----------------------------------------------------------------------
  // Bundled CSS (component-only, no tokens)
  // -----------------------------------------------------------------------

  const { code: readable } = transform({
    filename: `${packageName}.css`,
    code: Buffer.from(combinedCss),
    minify: false,
    sourceMap: false,
  })
  writeFileSync(resolve(cssDistDir, `${packageName}.css`), readable)

  // Minified
  const { code: minified } = transform({
    filename: `${packageName}.min.css`,
    code: Buffer.from(combinedCss),
    minify: true,
    sourceMap: false,
  })
  writeFileSync(resolve(cssDistDir, `${packageName}.min.css`), minified)

  // -----------------------------------------------------------------------
  // Per-component CSS files (tree-shakeable)
  // -----------------------------------------------------------------------

  for (const { name, css } of componentCssParts) {
    const { code } = transform({
      filename: `${name}.css`,
      code: Buffer.from(css),
      minify: false,
      sourceMap: false,
    })
    writeFileSync(resolve(cssDistDir, `${name}.css`), code)
  }

  // -----------------------------------------------------------------------
  // CSS Modules
  // -----------------------------------------------------------------------

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

  // -----------------------------------------------------------------------
  // Report
  // -----------------------------------------------------------------------

  console.log(`CSS build complete (${packageName}):`)
  console.log(`  -> dist/css/${packageName}.css`)
  console.log(`  -> dist/css/${packageName}.min.css`)
  for (const { name } of componentCssParts) {
    console.log(`  -> dist/css/${name}.css`)
  }
  for (const name of components) {
    const modulePath = resolve(srcDir, name, `${name}.module.css`)
    if (existsSync(modulePath)) {
      console.log(`  -> dist/css/${name}.module.css`)
      console.log(`  -> dist/css/${name}.module.js`)
      console.log(`  -> dist/css/${name}.module.d.ts`)
    }
  }
}
