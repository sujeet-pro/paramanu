import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { buildCss } from "../../tooling/css-build/index.js"

const __dirname = dirname(fileURLToPath(import.meta.url))

buildCss({
  packageName: "utilities",
  packageDir: __dirname,
  components: [
    "affix",
    "client-only",
    "direction-provider",
    "focus-trap",
    "format-byte",
    "format-number",
    "locale-provider",
    "portal",
    "presence",
    "show-hide",
    "skip-nav",
    "theme-provider",
    "visually-hidden",
  ],
})
