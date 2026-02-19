import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { buildCss } from "../../tooling/css-build/index.js"

const __dirname = dirname(fileURLToPath(import.meta.url))

buildCss({
  packageName: "buttons",
  packageDir: __dirname,
  components: [
    "button",
    "button-group",
    "close-button",
    "icon-button",
    "toggle-button",
    "toggle-group",
    "fab",
  ],
})
