import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { checkboxCardClasses } from "./checkbox-card.classes.js"

function createCheckboxCardHTML(
  content: string,
  options: Parameters<typeof checkboxCardClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = checkboxCardClasses(options)
  const checkedAttr = options.checked ? " checked" : ""
  const disabledAttr = options.disabled ? " disabled" : ""
  return `<label class="${classes}"><input type="checkbox" class="pm-checkbox-card__input"${checkedAttr}${disabledAttr}${attrs ? " " + attrs : ""} /><div class="pm-checkbox-card__content">${content}</div></label>`
}

describe("checkbox card accessibility", () => {
  it("renders as a label wrapping a checkbox input", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createCheckboxCardHTML("Plan A")}</body>`,
    )
    const label = dom.window.document.querySelector("label")
    expect(label).not.toBeNull()
    const input = label?.querySelector('input[type="checkbox"]')
    expect(input).not.toBeNull()
  })

  it("has card content", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createCheckboxCardHTML("Premium Plan")}</body>`,
    )
    const content = dom.window.document.querySelector(".pm-checkbox-card__content")
    expect(content?.textContent).toBe("Premium Plan")
  })

  it("hidden input is present", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createCheckboxCardHTML("Option")}</body>`,
    )
    const input = dom.window.document.querySelector(".pm-checkbox-card__input")
    expect(input).not.toBeNull()
    expect(input?.tagName).toBe("INPUT")
  })

  it("supports checked state", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createCheckboxCardHTML("Selected", { checked: true })}</body>`,
    )
    const input = dom.window.document.querySelector("input") as HTMLInputElement
    expect(input.checked).toBe(true)
    const label = dom.window.document.querySelector("label")
    expect(label?.className).toContain("pm-checkbox-card--checked")
  })

  it("supports disabled state", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createCheckboxCardHTML("Disabled", { disabled: true })}</body>`,
    )
    const input = dom.window.document.querySelector("input") as HTMLInputElement
    expect(input.disabled).toBe(true)
    const label = dom.window.document.querySelector("label")
    expect(label?.className).toContain("pm-checkbox-card--disabled")
  })
})
