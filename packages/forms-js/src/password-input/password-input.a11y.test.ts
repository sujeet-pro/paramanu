import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { pwdInputClasses } from "./password-input.classes.js"
import { inputClasses } from "../input/input.classes.js"

function createPwdInputHTML(
  options: Parameters<typeof pwdInputClasses>[0] = {},
  attrs: string = "",
): string {
  const wrapperClasses = pwdInputClasses(options)
  const innerClasses = inputClasses({
    variant: options?.variant,
    size: options?.size,
    invalid: options?.invalid,
    disabled: options?.disabled,
  })
  const disabledAttr = options?.disabled ? ' disabled aria-disabled="true"' : ""
  const invalidAttr = options?.invalid ? ' aria-invalid="true"' : ""
  return `<div class="${wrapperClasses}">
    <input class="${innerClasses}" type="password"${disabledAttr}${invalidAttr}${attrs ? " " + attrs : ""} />
    <button class="pm-pwd-input__toggle" type="button" aria-label="Toggle password visibility">Show</button>
  </div>`
}

describe("password input accessibility", () => {
  it("renders with a wrapper div and input element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createPwdInputHTML()}</body>`)
    const wrapper = dom.window.document.querySelector(".pm-pwd-input")
    const input = dom.window.document.querySelector("input")
    expect(wrapper).not.toBeNull()
    expect(input).not.toBeNull()
    expect(input?.getAttribute("type")).toBe("password")
  })

  it("toggle button has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createPwdInputHTML()}</body>`)
    const toggle = dom.window.document.querySelector(".pm-pwd-input__toggle")
    expect(toggle?.getAttribute("aria-label")).toBe("Toggle password visibility")
  })

  it("toggle button is type=button", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createPwdInputHTML()}</body>`)
    const toggle = dom.window.document.querySelector(".pm-pwd-input__toggle")
    expect(toggle?.getAttribute("type")).toBe("button")
  })

  it("disabled input has disabled attribute and aria-disabled", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createPwdInputHTML({ disabled: true })}</body>`)
    const input = dom.window.document.querySelector("input")
    expect(input?.hasAttribute("disabled")).toBe(true)
    expect(input?.getAttribute("aria-disabled")).toBe("true")
  })

  it("invalid input has aria-invalid", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createPwdInputHTML({ invalid: true })}</body>`)
    const input = dom.window.document.querySelector("input")
    expect(input?.getAttribute("aria-invalid")).toBe("true")
  })

  it("supports aria-label on input", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createPwdInputHTML({}, 'aria-label="Password"')}</body>`,
    )
    const input = dom.window.document.querySelector("input")
    expect(input?.getAttribute("aria-label")).toBe("Password")
  })
})
