import { dirname } from "node:path"
import { fileURLToPath } from "node:url"
import { buildCss } from "../../tooling/css-build/index.js"

const __dirname = dirname(fileURLToPath(import.meta.url))

buildCss({
  packageName: "forms",
  packageDir: __dirname,
  components: [
    "calendar",
    "cascader",
    "checkbox",
    "checkbox-card",
    "color-picker",
    "combobox",
    "date-picker",
    "date-range-picker",
    "dropzone",
    "editable-text",
    "fieldset",
    "file-upload",
    "form",
    "form-control",
    "input",
    "label",
    "mentions",
    "multi-select",
    "native-select",
    "number-input",
    "password-input",
    "pin-input",
    "radio",
    "radio-card",
    "rating",
    "search-input",
    "segmented-control",
    "select",
    "slider",
    "switch",
    "tags-input",
    "textarea",
    "time-picker",
    "transfer",
  ],
})
