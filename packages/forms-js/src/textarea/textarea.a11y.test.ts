import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { textareaClasses } from "./textarea.classes.js"

function createTextareaHTML(
  options: Parameters<typeof textareaClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = textareaClasses(options)
  const disabledAttr = options?.disabled ? ' disabled aria-disabled="true"' : ""
  const invalidAttr = options?.invalid ? ' aria-invalid="true"' : ""
  const readOnlyAttr = options?.readOnly ? " readonly" : ""
  const rows = ' rows="4"'
  return `<textarea class="${classes}"${rows}${disabledAttr}${invalidAttr}${readOnlyAttr}${attrs ? " " + attrs : ""}></textarea>`
}

describe("textarea accessibility", () => {
  it("renders as a textarea element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTextareaHTML()}</body>`)
    const textarea = dom.window.document.querySelector("textarea")
    expect(textarea).not.toBeNull()
    expect(textarea?.tagName).toBe("TEXTAREA")
  })

  it("has rows attribute", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTextareaHTML()}</body>`)
    const textarea = dom.window.document.querySelector("textarea")
    expect(textarea?.getAttribute("rows")).toBe("4")
  })

  it("disabled textarea has disabled attribute and aria-disabled", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTextareaHTML({ disabled: true })}</body>`)
    const textarea = dom.window.document.querySelector("textarea")
    expect(textarea?.hasAttribute("disabled")).toBe(true)
    expect(textarea?.getAttribute("aria-disabled")).toBe("true")
  })

  it("invalid textarea has aria-invalid", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTextareaHTML({ invalid: true })}</body>`)
    const textarea = dom.window.document.querySelector("textarea")
    expect(textarea?.getAttribute("aria-invalid")).toBe("true")
  })

  it("read-only textarea has readonly attribute", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTextareaHTML({ readOnly: true })}</body>`)
    const textarea = dom.window.document.querySelector("textarea")
    expect(textarea?.hasAttribute("readonly")).toBe(true)
  })

  it("supports aria-label", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTextareaHTML({}, 'aria-label="Description"')}</body>`,
    )
    const textarea = dom.window.document.querySelector("textarea")
    expect(textarea?.getAttribute("aria-label")).toBe("Description")
  })

  it("supports aria-required", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTextareaHTML({}, 'aria-required="true"')}</body>`,
    )
    const textarea = dom.window.document.querySelector("textarea")
    expect(textarea?.getAttribute("aria-required")).toBe("true")
  })
})
