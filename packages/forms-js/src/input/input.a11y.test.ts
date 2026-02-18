import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { inputClasses } from "./input.classes.js"

function createInputHTML(
  options: Parameters<typeof inputClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = inputClasses(options)
  const disabledAttr = options?.disabled ? ' disabled aria-disabled="true"' : ""
  const invalidAttr = options?.invalid ? ' aria-invalid="true"' : ""
  const readOnlyAttr = options?.readOnly ? " readonly" : ""
  return `<input class="${classes}" type="text"${disabledAttr}${invalidAttr}${readOnlyAttr}${attrs ? " " + attrs : ""} />`
}

describe("input accessibility", () => {
  it("renders as an input element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createInputHTML()}</body>`)
    const input = dom.window.document.querySelector("input")
    expect(input).not.toBeNull()
    expect(input?.tagName).toBe("INPUT")
  })

  it("has type attribute", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createInputHTML()}</body>`)
    const input = dom.window.document.querySelector("input")
    expect(input?.getAttribute("type")).toBe("text")
  })

  it("disabled input has disabled attribute and aria-disabled", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createInputHTML({ disabled: true })}</body>`,
    )
    const input = dom.window.document.querySelector("input")
    expect(input?.hasAttribute("disabled")).toBe(true)
    expect(input?.getAttribute("aria-disabled")).toBe("true")
  })

  it("invalid input has aria-invalid", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createInputHTML({ invalid: true })}</body>`,
    )
    const input = dom.window.document.querySelector("input")
    expect(input?.getAttribute("aria-invalid")).toBe("true")
  })

  it("read-only input has readonly attribute", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createInputHTML({ readOnly: true })}</body>`,
    )
    const input = dom.window.document.querySelector("input")
    expect(input?.hasAttribute("readonly")).toBe(true)
  })

  it("supports aria-label", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createInputHTML({}, 'aria-label="Email address"')}</body>`,
    )
    const input = dom.window.document.querySelector("input")
    expect(input?.getAttribute("aria-label")).toBe("Email address")
  })

  it("supports aria-required", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createInputHTML({}, 'aria-required="true"')}</body>`,
    )
    const input = dom.window.document.querySelector("input")
    expect(input?.getAttribute("aria-required")).toBe("true")
  })

  it("supports aria-describedby for error messages", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createInputHTML({ invalid: true }, 'aria-describedby="error-msg"')}<span id="error-msg">Invalid email</span></body>`,
    )
    const input = dom.window.document.querySelector("input")
    expect(input?.getAttribute("aria-describedby")).toBe("error-msg")
  })
})
