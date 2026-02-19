import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { buildCss } from "../../tooling/css-build/index.js"

const __dirname = dirname(fileURLToPath(import.meta.url))

buildCss({
  packageName: "overlays",
  packageDir: __dirname,
  components: [
    "alert-dialog",
    "backdrop",
    "command-palette",
    "dialog",
    "drawer",
    "hover-card",
    "inline-dialog",
    "popover",
    "sheet",
    "tooltip",
  ],
})
