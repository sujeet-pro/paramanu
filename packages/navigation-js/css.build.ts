import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { buildCss } from "../../tooling/css-build/index.js"

const __dirname = dirname(fileURLToPath(import.meta.url))

buildCss({
  packageName: "navigation",
  packageDir: __dirname,
  components: [
    "back-to-top",
    "breadcrumbs",
    "context-menu",
    "dropdown-menu",
    "link",
    "menu",
    "menubar",
    "navbar",
    "pagination",
    "sidebar",
    "skip-nav-link",
    "steps",
    "tabs",
    "tree-view",
  ],
})
