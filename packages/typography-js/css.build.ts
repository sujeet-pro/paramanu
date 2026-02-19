import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { buildCss } from "../../tooling/css-build/index.js"

const __dirname = dirname(fileURLToPath(import.meta.url))

buildCss({
  packageName: "typography",
  packageDir: __dirname,
  components: [
    "blockquote",
    "code",
    "heading",
    "highlight",
    "kbd",
    "list",
    "mark",
    "prose",
    "text",
    "truncate",
  ],
})
