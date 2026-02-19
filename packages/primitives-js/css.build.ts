import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { buildCss } from "../../tooling/css-build/index.js"

const __dirname = dirname(fileURLToPath(import.meta.url))

buildCss({
  packageName: "primitives",
  packageDir: __dirname,
  components: [
    "app-shell",
    "aspect-ratio",
    "bleed",
    "box",
    "center",
    "container",
    "divider",
    "flex",
    "float",
    "grid",
    "group",
    "masonry",
    "scroll-area",
    "simple-grid",
    "spacer",
    "splitter",
    "stack",
    "wrap",
  ],
})
