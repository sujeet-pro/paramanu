import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { chkCardClasses } from "./checkbox-card.classes.js"

function createChkCardHTML(
  content: string,
  options: Parameters<typeof chkCardClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = chkCardClasses(options)
  const checkedAttr = options.checked ? " checked" : ""
  const disabledAttr = options.disabled ? " disabled" : ""
  return `<label class="${classes}"><input type="checkbox" class="pm-chk-card__input"${checkedAttr}${disabledAttr}${attrs ? " " + attrs : ""} /><div class="pm-chk-card__content">${content}</div></label>`
}

describe("checkbox card accessibility", () => {
  it("renders as a label wrapping a checkbox input", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createChkCardHTML("Plan A")}</body>`,
    )
    const label = dom.window.document.querySelector("label")
    expect(label).not.toBeNull()
    const input = label?.querySelector('input[type="checkbox"]')
    expect(input).not.toBeNull()
  })

  it("has card content", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createChkCardHTML("Premium Plan")}</body>`,
    )
    const content = dom.window.document.querySelector(".pm-chk-card__content")
    expect(content?.textContent).toBe("Premium Plan")
  })

  it("hidden input is present", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createChkCardHTML("Option")}</body>`,
    )
    const input = dom.window.document.querySelector(".pm-chk-card__input")
    expect(input).not.toBeNull()
    expect(input?.tagName).toBe("INPUT")
  })

  it("supports checked state", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createChkCardHTML("Selected", { checked: true })}</body>`,
    )
    const input = dom.window.document.querySelector("input") as HTMLInputElement
    expect(input.checked).toBe(true)
    const label = dom.window.document.querySelector("label")
    expect(label?.className).toContain("pm-chk-card--checked")
  })

  it("supports disabled state", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createChkCardHTML("Disabled", { disabled: true })}</body>`,
    )
    const input = dom.window.document.querySelector("input") as HTMLInputElement
    expect(input.disabled).toBe(true)
    const label = dom.window.document.querySelector("label")
    expect(label?.className).toContain("pm-chk-card--disabled")
  })
})
