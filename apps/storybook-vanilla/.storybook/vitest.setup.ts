import { setProjectAnnotations } from "@storybook/html-vite"
import * as previewAnnotations from "./preview"

const annotations = setProjectAnnotations([previewAnnotations])

beforeAll(annotations.beforeAll)
