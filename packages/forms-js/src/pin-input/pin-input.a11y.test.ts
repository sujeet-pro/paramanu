import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { pinInputClasses } from "./pin-input.classes.js"

function createPinInputHTML(
  options: Parameters<typeof pinInputClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = pinInputClasses(options)
  const disabledAttr = options?.disabled ? " disabled" : ""
  const invalidAttr = options?.invalid ? ' aria-invalid="true"' : ""
  return `<div class="${classes}" role="group" aria-label="PIN code"${attrs ? " " + attrs : ""}>
    <input class="pm-pin-input__field" type="text" maxlength="1" inputmode="numeric" aria-label="Pin digit 1"${disabledAttr}${invalidAttr} />
    <input class="pm-pin-input__field" type="text" maxlength="1" inputmode="numeric" aria-label="Pin digit 2"${disabledAttr}${invalidAttr} />
    <input class="pm-pin-input__field" type="text" maxlength="1" inputmode="numeric" aria-label="Pin digit 3"${disabledAttr}${invalidAttr} />
    <input class="pm-pin-input__field" type="text" maxlength="1" inputmode="numeric" aria-label="Pin digit 4"${disabledAttr}${invalidAttr} />
  </div>`
}

describe("pin-input accessibility", () => {
  it("has role=group on container", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createPinInputHTML()}</body>`)
    const group = dom.window.document.querySelector("[role='group']")
    expect(group).not.toBeNull()
    expect(group?.getAttribute("role")).toBe("group")
  })

  it("has aria-label on container", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createPinInputHTML()}</body>`)
    const group = dom.window.document.querySelector("[role='group']")
    expect(group?.getAttribute("aria-label")).toBe("PIN code")
  })

  it("each field has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createPinInputHTML()}</body>`)
    const inputs = dom.window.document.querySelectorAll("input")
    expect(inputs[0]?.getAttribute("aria-label")).toBe("Pin digit 1")
    expect(inputs[3]?.getAttribute("aria-label")).toBe("Pin digit 4")
  })

  it("each field has maxlength=1", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createPinInputHTML()}</body>`)
    const inputs = dom.window.document.querySelectorAll("input")
    inputs.forEach((input) => {
      expect(input.getAttribute("maxlength")).toBe("1")
    })
  })

  it("each field has inputmode=numeric", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createPinInputHTML()}</body>`)
    const inputs = dom.window.document.querySelectorAll("input")
    inputs.forEach((input) => {
      expect(input.getAttribute("inputmode")).toBe("numeric")
    })
  })

  it("disabled fields have disabled attribute", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createPinInputHTML({ disabled: true })}</body>`)
    const inputs = dom.window.document.querySelectorAll("input")
    inputs.forEach((input) => {
      expect(input.hasAttribute("disabled")).toBe(true)
    })
  })

  it("invalid fields have aria-invalid", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createPinInputHTML({ invalid: true })}</body>`)
    const inputs = dom.window.document.querySelectorAll("input")
    inputs.forEach((input) => {
      expect(input.getAttribute("aria-invalid")).toBe("true")
    })
  })
})
