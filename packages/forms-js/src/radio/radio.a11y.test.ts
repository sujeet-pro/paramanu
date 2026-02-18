import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { radioClasses, radioGroupClasses } from "./radio.classes.js"

function createRadioHTML(
  label: string,
  options: Parameters<typeof radioClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = radioClasses(options)
  const checkedAttr = options.checked ? " checked" : ""
  const disabledAttr = options.disabled ? " disabled" : ""
  return `<label class="${classes}"><input type="radio" class="pm-radio__input"${checkedAttr}${disabledAttr}${attrs ? " " + attrs : ""} /><span class="pm-radio__indicator"></span><span class="pm-radio__label">${label}</span></label>`
}

function createRadioGroupHTML(
  children: string,
  options: Parameters<typeof radioGroupClasses>[0] = {},
): string {
  const classes = radioGroupClasses(options)
  return `<div role="radiogroup" class="${classes}">${children}</div>`
}

describe("radio accessibility", () => {
  it("renders as a label wrapping a radio input", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createRadioHTML("Option A")}</body>`)
    const label = dom.window.document.querySelector("label")
    expect(label).not.toBeNull()
    const input = label?.querySelector('input[type="radio"]')
    expect(input).not.toBeNull()
  })

  it("has accessible text content", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createRadioHTML("Option B")}</body>`)
    const labelSpan = dom.window.document.querySelector(".pm-radio__label")
    expect(labelSpan?.textContent).toBe("Option B")
  })

  it("hidden input is present", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createRadioHTML("Option")}</body>`)
    const input = dom.window.document.querySelector(".pm-radio__input")
    expect(input).not.toBeNull()
    expect(input?.tagName).toBe("INPUT")
  })

  it("supports checked state", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createRadioHTML("Selected", { checked: true })}</body>`,
    )
    const input = dom.window.document.querySelector("input") as HTMLInputElement
    expect(input.checked).toBe(true)
    const label = dom.window.document.querySelector("label")
    expect(label?.className).toContain("pm-radio--checked")
  })

  it("supports disabled state", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createRadioHTML("Disabled", { disabled: true })}</body>`,
    )
    const input = dom.window.document.querySelector("input") as HTMLInputElement
    expect(input.disabled).toBe(true)
    const label = dom.window.document.querySelector("label")
    expect(label?.className).toContain("pm-radio--disabled")
  })

  it("invalid state applies correct class", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createRadioHTML("Invalid", { invalid: true })}</body>`,
    )
    const label = dom.window.document.querySelector("label")
    expect(label?.className).toContain("pm-radio--invalid")
  })

  it("supports name attribute for grouping", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createRadioHTML("A", {}, 'name="color"')}</body>`,
    )
    const input = dom.window.document.querySelector("input")
    expect(input?.getAttribute("name")).toBe("color")
  })

  it("indicator element is present", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createRadioHTML("Test")}</body>`)
    const indicator = dom.window.document.querySelector(".pm-radio__indicator")
    expect(indicator).not.toBeNull()
  })
})

describe("radio group accessibility", () => {
  it("renders with role=radiogroup", () => {
    const radios = createRadioHTML("A") + createRadioHTML("B")
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createRadioGroupHTML(radios)}</body>`,
    )
    const group = dom.window.document.querySelector('[role="radiogroup"]')
    expect(group).not.toBeNull()
  })

  it("contains radio inputs", () => {
    const radios = createRadioHTML("A") + createRadioHTML("B")
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createRadioGroupHTML(radios)}</body>`,
    )
    const inputs = dom.window.document.querySelectorAll('input[type="radio"]')
    expect(inputs.length).toBe(2)
  })

  it("applies orientation class", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createRadioGroupHTML("", { orientation: "horizontal" })}</body>`,
    )
    const group = dom.window.document.querySelector('[role="radiogroup"]')
    expect(group?.className).toContain("pm-radio-group--horizontal")
  })
})
