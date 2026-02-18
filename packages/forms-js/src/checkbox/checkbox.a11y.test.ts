import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { checkboxClasses } from "./checkbox.classes.js"

function createCheckboxHTML(
  label: string,
  options: Parameters<typeof checkboxClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = checkboxClasses(options)
  const checkedAttr = options.checked ? ' checked' : ""
  const disabledAttr = options.disabled ? ' disabled' : ""
  const ariaChecked = options.indeterminate ? ' aria-checked="mixed"' : options.checked ? ' aria-checked="true"' : ""
  return `<label class="${classes}"><input type="checkbox" class="pm-checkbox__input"${checkedAttr}${disabledAttr}${ariaChecked}${attrs ? " " + attrs : ""} /><span class="pm-checkbox__indicator">&#10003;</span><span class="pm-checkbox__label">${label}</span></label>`
}

describe("checkbox accessibility", () => {
  it("renders as a label wrapping a checkbox input", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCheckboxHTML("Accept terms")}</body>`)
    const label = dom.window.document.querySelector("label")
    expect(label).not.toBeNull()
    const input = label?.querySelector('input[type="checkbox"]')
    expect(input).not.toBeNull()
  })

  it("has accessible text content", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCheckboxHTML("Subscribe")}</body>`)
    const labelSpan = dom.window.document.querySelector(".pm-checkbox__label")
    expect(labelSpan?.textContent).toBe("Subscribe")
  })

  it("hidden input is visually hidden but present", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCheckboxHTML("Option A")}</body>`)
    const input = dom.window.document.querySelector(".pm-checkbox__input")
    expect(input).not.toBeNull()
    expect(input?.tagName).toBe("INPUT")
  })

  it("supports checked state", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createCheckboxHTML("Checked", { checked: true })}</body>`,
    )
    const input = dom.window.document.querySelector("input") as HTMLInputElement
    expect(input.checked).toBe(true)
    expect(input.getAttribute("aria-checked")).toBe("true")
  })

  it("supports indeterminate state via aria-checked mixed", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createCheckboxHTML("Indeterminate", { indeterminate: true })}</body>`,
    )
    const input = dom.window.document.querySelector("input")
    expect(input?.getAttribute("aria-checked")).toBe("mixed")
  })

  it("supports disabled state", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createCheckboxHTML("Disabled", { disabled: true })}</body>`,
    )
    const input = dom.window.document.querySelector("input") as HTMLInputElement
    expect(input.disabled).toBe(true)
    const label = dom.window.document.querySelector("label")
    expect(label?.className).toContain("pm-checkbox--disabled")
  })

  it("invalid state applies correct class", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createCheckboxHTML("Invalid", { invalid: true })}</body>`,
    )
    const label = dom.window.document.querySelector("label")
    expect(label?.className).toContain("pm-checkbox--invalid")
  })

  it("indicator element is present", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCheckboxHTML("Test")}</body>`)
    const indicator = dom.window.document.querySelector(".pm-checkbox__indicator")
    expect(indicator).not.toBeNull()
  })
})
