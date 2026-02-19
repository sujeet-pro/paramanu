import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { formCtrlClasses } from "./form-control.classes.js"

function createFormCtrlHTML(
  content: string,
  options: Parameters<typeof formCtrlClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = formCtrlClasses(options)
  return `<div class="${classes}" role="group"${attrs ? " " + attrs : ""}>${content}</div>`
}

describe("form-control accessibility", () => {
  it("renders as a div with group role", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createFormCtrlHTML("<label>Name</label><input />")}</body>`,
    )
    const control = dom.window.document.querySelector('[role="group"]')
    expect(control).not.toBeNull()
    expect(control?.tagName).toBe("DIV")
  })

  it("contains label and input elements", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createFormCtrlHTML('<label for="name">Name</label><input id="name" />')}</body>`,
    )
    const label = dom.window.document.querySelector("label")
    const input = dom.window.document.querySelector("input")
    expect(label).not.toBeNull()
    expect(input).not.toBeNull()
    expect(label?.getAttribute("for")).toBe("name")
  })

  it("supports aria-describedby for helper text", () => {
    const html = createFormCtrlHTML(
      '<label>Email</label><input aria-describedby="email-help" /><span id="email-help" class="pm-form-ctrl__helper-text">Enter your email</span>',
    )
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const input = dom.window.document.querySelector("input")
    const helperText = dom.window.document.querySelector(".pm-form-ctrl__helper-text")
    expect(input?.getAttribute("aria-describedby")).toBe("email-help")
    expect(helperText?.textContent).toBe("Enter your email")
  })

  it("supports aria-describedby for error text", () => {
    const html = createFormCtrlHTML(
      '<label>Email</label><input aria-describedby="email-error" aria-invalid="true" /><span id="email-error" class="pm-form-ctrl__error-text">Invalid email</span>',
      { invalid: true },
    )
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const input = dom.window.document.querySelector("input")
    expect(input?.getAttribute("aria-invalid")).toBe("true")
    expect(input?.getAttribute("aria-describedby")).toBe("email-error")
  })

  it("disabled form control has disabled class", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createFormCtrlHTML("<label>Disabled</label><input disabled />", { disabled: true })}</body>`,
    )
    const control = dom.window.document.querySelector('[role="group"]')
    expect(control?.className).toContain("pm-form-ctrl--disabled")
  })
})
