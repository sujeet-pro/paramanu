import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { fileUploadClasses } from "./file-upload.classes.js"

function createFileUploadHTML(
  options: Parameters<typeof fileUploadClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = fileUploadClasses(options)
  const disabledAttr = options?.disabled ? " disabled" : ""
  return `<div class="${classes}"${attrs ? " " + attrs : ""}>
    <input class="pm-file-upload__input" type="file" id="file-input" aria-label="Choose file"${disabledAttr} />
    <button class="pm-file-upload__trigger" type="button" aria-controls="file-input"${disabledAttr}>Choose file</button>
    <div class="pm-file-upload__file-list" role="list" aria-label="Selected files">
      <div class="pm-file-upload__file-item" role="listitem">
        <span class="pm-file-upload__file-name">document.pdf</span>
        <button class="pm-file-upload__file-remove" aria-label="Remove document.pdf" type="button">x</button>
      </div>
    </div>
  </div>`
}

describe("file-upload accessibility", () => {
  it("has a hidden file input", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createFileUploadHTML()}</body>`)
    const input = dom.window.document.querySelector("input[type='file']")
    expect(input).not.toBeNull()
    expect(input?.getAttribute("aria-label")).toBe("Choose file")
  })

  it("trigger button has type=button", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createFileUploadHTML()}</body>`)
    const trigger = dom.window.document.querySelector(".pm-file-upload__trigger")
    expect(trigger?.getAttribute("type")).toBe("button")
  })

  it("file list has role=list", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createFileUploadHTML()}</body>`)
    const list = dom.window.document.querySelector("[role='list']")
    expect(list).not.toBeNull()
    expect(list?.getAttribute("aria-label")).toBe("Selected files")
  })

  it("file items have role=listitem", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createFileUploadHTML()}</body>`)
    const items = dom.window.document.querySelectorAll("[role='listitem']")
    expect(items.length).toBe(1)
  })

  it("remove button has aria-label with filename", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createFileUploadHTML()}</body>`)
    const removeBtn = dom.window.document.querySelector(".pm-file-upload__file-remove")
    expect(removeBtn?.getAttribute("aria-label")).toBe("Remove document.pdf")
  })

  it("disabled input has disabled attribute", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createFileUploadHTML({ disabled: true })}</body>`,
    )
    const input = dom.window.document.querySelector("input[type='file']")
    expect(input?.hasAttribute("disabled")).toBe(true)
  })

  it("disabled trigger has disabled attribute", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createFileUploadHTML({ disabled: true })}</body>`,
    )
    const trigger = dom.window.document.querySelector(".pm-file-upload__trigger")
    expect(trigger?.hasAttribute("disabled")).toBe(true)
  })
})
