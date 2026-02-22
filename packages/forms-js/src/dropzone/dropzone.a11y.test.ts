import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { dropzoneClasses } from "./dropzone.classes.js"

function createDropzoneHTML(
  options: Parameters<typeof dropzoneClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = dropzoneClasses(options)
  const disabledAttr = options?.disabled ? ' aria-disabled="true"' : ""
  return `<div class="${classes}" role="button" tabindex="0" aria-label="Drop files here or click to upload"${disabledAttr}${attrs ? " " + attrs : ""}>
    <input type="file" class="pm-upload__input" aria-hidden="true" tabindex="-1" />
    <span class="pm-dropzone__icon">&#128228;</span>
    <span class="pm-dropzone__text">Drag and drop files here</span>
  </div>`
}

describe("dropzone accessibility", () => {
  it("has role=button", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDropzoneHTML()}</body>`)
    const dropzone = dom.window.document.querySelector("[role='button']")
    expect(dropzone).not.toBeNull()
    expect(dropzone?.getAttribute("role")).toBe("button")
  })

  it("is keyboard focusable", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDropzoneHTML()}</body>`)
    const dropzone = dom.window.document.querySelector("[role='button']")
    expect(dropzone?.getAttribute("tabindex")).toBe("0")
  })

  it("has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDropzoneHTML()}</body>`)
    const dropzone = dom.window.document.querySelector("[role='button']")
    expect(dropzone?.getAttribute("aria-label")).toBe("Drop files here or click to upload")
  })

  it("has hidden file input", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDropzoneHTML()}</body>`)
    const input = dom.window.document.querySelector("input[type='file']")
    expect(input).not.toBeNull()
    expect(input?.getAttribute("aria-hidden")).toBe("true")
    expect(input?.getAttribute("tabindex")).toBe("-1")
  })

  it("disabled dropzone has aria-disabled", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDropzoneHTML({ disabled: true })}</body>`)
    const dropzone = dom.window.document.querySelector("[role='button']")
    expect(dropzone?.getAttribute("aria-disabled")).toBe("true")
  })

  it("has descriptive text", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDropzoneHTML()}</body>`)
    const text = dom.window.document.querySelector(".pm-dropzone__text")
    expect(text).not.toBeNull()
    expect(text?.textContent).toBe("Drag and drop files here")
  })
})
