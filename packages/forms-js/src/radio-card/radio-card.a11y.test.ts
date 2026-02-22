import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { radioCardClasses } from "./radio-card.classes.js"

function createRadioCardHTML(
  content: string,
  options: Parameters<typeof radioCardClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = radioCardClasses(options)
  const checkedAttr = options.checked ? " checked" : ""
  const disabledAttr = options.disabled ? " disabled" : ""
  return `<label class="${classes}"><input type="radio" class="pm-radio-card__input"${checkedAttr}${disabledAttr}${attrs ? " " + attrs : ""} /><div class="pm-radio-card__content">${content}</div></label>`
}

describe("radio card accessibility", () => {
  it("renders as a label wrapping a radio input", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createRadioCardHTML("Plan A")}</body>`)
    const label = dom.window.document.querySelector("label")
    expect(label).not.toBeNull()
    const input = label?.querySelector('input[type="radio"]')
    expect(input).not.toBeNull()
  })

  it("has card content", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createRadioCardHTML("Premium Plan")}</body>`)
    const content = dom.window.document.querySelector(".pm-radio-card__content")
    expect(content?.textContent).toBe("Premium Plan")
  })

  it("hidden input is present", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createRadioCardHTML("Option")}</body>`)
    const input = dom.window.document.querySelector(".pm-radio-card__input")
    expect(input).not.toBeNull()
    expect(input?.tagName).toBe("INPUT")
  })

  it("supports checked state", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createRadioCardHTML("Selected", { checked: true })}</body>`,
    )
    const input = dom.window.document.querySelector("input") as HTMLInputElement
    expect(input.checked).toBe(true)
    const label = dom.window.document.querySelector("label")
    expect(label?.className).toContain("pm-radio-card--checked")
  })

  it("supports disabled state", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createRadioCardHTML("Disabled", { disabled: true })}</body>`,
    )
    const input = dom.window.document.querySelector("input") as HTMLInputElement
    expect(input.disabled).toBe(true)
    const label = dom.window.document.querySelector("label")
    expect(label?.className).toContain("pm-radio-card--disabled")
  })

  it("supports name attribute for grouping", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createRadioCardHTML("A", {}, 'name="plan"')}</body>`,
    )
    const input = dom.window.document.querySelector("input")
    expect(input?.getAttribute("name")).toBe("plan")
  })
})
