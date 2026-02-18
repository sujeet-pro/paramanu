import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { numberInputClasses } from "./number-input.classes.js"
import { inputClasses } from "../input/input.classes.js"

function createNumberInputHTML(
  options: Parameters<typeof numberInputClasses>[0] = {},
  attrs: string = "",
): string {
  const wrapperClasses = numberInputClasses(options)
  const innerClasses = inputClasses({
    variant: options?.variant,
    size: options?.size,
    invalid: options?.invalid,
    disabled: options?.disabled,
  })
  const disabledAttr = options?.disabled ? ' disabled aria-disabled="true"' : ""
  const invalidAttr = options?.invalid ? ' aria-invalid="true"' : ""
  return `<div class="${wrapperClasses}">
    <input class="${innerClasses}" type="number" inputmode="numeric"${disabledAttr}${invalidAttr}${attrs ? " " + attrs : ""} />
    <div class="pm-number-input__stepper">
      <button class="pm-number-input__increment" type="button" aria-label="Increment" tabindex="-1">+</button>
      <button class="pm-number-input__decrement" type="button" aria-label="Decrement" tabindex="-1">-</button>
    </div>
  </div>`
}

describe("number input accessibility", () => {
  it("renders with a wrapper div and number input", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createNumberInputHTML()}</body>`)
    const wrapper = dom.window.document.querySelector(".pm-number-input")
    const input = dom.window.document.querySelector("input")
    expect(wrapper).not.toBeNull()
    expect(input).not.toBeNull()
    expect(input?.getAttribute("type")).toBe("number")
  })

  it("input has inputmode=numeric", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createNumberInputHTML()}</body>`)
    const input = dom.window.document.querySelector("input")
    expect(input?.getAttribute("inputmode")).toBe("numeric")
  })

  it("increment button has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createNumberInputHTML()}</body>`)
    const increment = dom.window.document.querySelector(".pm-number-input__increment")
    expect(increment?.getAttribute("aria-label")).toBe("Increment")
  })

  it("decrement button has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createNumberInputHTML()}</body>`)
    const decrement = dom.window.document.querySelector(".pm-number-input__decrement")
    expect(decrement?.getAttribute("aria-label")).toBe("Decrement")
  })

  it("stepper buttons are type=button", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createNumberInputHTML()}</body>`)
    const increment = dom.window.document.querySelector(".pm-number-input__increment")
    const decrement = dom.window.document.querySelector(".pm-number-input__decrement")
    expect(increment?.getAttribute("type")).toBe("button")
    expect(decrement?.getAttribute("type")).toBe("button")
  })

  it("disabled input has disabled attribute and aria-disabled", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createNumberInputHTML({ disabled: true })}</body>`,
    )
    const input = dom.window.document.querySelector("input")
    expect(input?.hasAttribute("disabled")).toBe(true)
    expect(input?.getAttribute("aria-disabled")).toBe("true")
  })

  it("invalid input has aria-invalid", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createNumberInputHTML({ invalid: true })}</body>`,
    )
    const input = dom.window.document.querySelector("input")
    expect(input?.getAttribute("aria-invalid")).toBe("true")
  })

  it("supports min and max attributes", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createNumberInputHTML({}, 'min="0" max="100"')}</body>`,
    )
    const input = dom.window.document.querySelector("input")
    expect(input?.getAttribute("min")).toBe("0")
    expect(input?.getAttribute("max")).toBe("100")
  })
})
