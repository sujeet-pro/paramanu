import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { buildCss } from "../../tooling/css-build/index.js"

const __dirname = dirname(fileURLToPath(import.meta.url))

buildCss({
  packageName: "data-display",
  packageDir: __dirname,
  components: [
    "avatar",
    "avatar-group",
    "badge",
    "card",
    "clipboard",
    "data-grid",
    "data-list",
    "data-table",
    "embed",
    "empty-state",
    "icon",
    "image",
    "qr-code",
    "stat",
    "structured-list",
    "table",
    "tag",
    "tile",
    "timeline",
  ],
})
