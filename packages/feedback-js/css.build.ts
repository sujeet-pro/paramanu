import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { buildCss } from "../../tooling/css-build/index.js"

const __dirname = dirname(fileURLToPath(import.meta.url))

buildCss({
  packageName: "feedback",
  packageDir: __dirname,
  components: [
    "alert",
    "banner",
    "circular-progress",
    "inline-message",
    "loading-overlay",
    "notification",
    "nprogress",
    "progress-bar",
    "skeleton",
    "spinner",
    "toast",
  ],
})
