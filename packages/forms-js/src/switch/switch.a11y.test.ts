import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { switchClasses } from "./switch.classes.js"

function createSwitchHTML(
  label: string,
  options: Parameters<typeof switchClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = switchClasses(options)
  const checkedAttr = options.checked ? " checked" : ""
  const disabledAttr = options.disabled ? " disabled" : ""
  const ariaChecked = options.checked ? ' aria-checked="true"' : ' aria-checked="false"'
  return `<label class="${classes}"><input type="checkbox" role="switch" class="pm-switch__input"${checkedAttr}${disabledAttr}${ariaChecked}${attrs ? " " + attrs : ""} /><span class="pm-switch__track"><span class="pm-switch__thumb"></span></span><span class="pm-switch__label">${label}</span></label>`
}

describe("switch accessibility", () => {
  it("renders as a label wrapping a switch input", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSwitchHTML("Notifs")}</body>`)
    const label = dom.window.document.querySelector("label")
    expect(label).not.toBeNull()
    const input = label?.querySelector('input[role="switch"]')
    expect(input).not.toBeNull()
  })

  it("uses role=switch on the input", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSwitchHTML("Dark mode")}</body>`)
    const input = dom.window.document.querySelector("input")
    expect(input?.getAttribute("role")).toBe("switch")
  })

  it("has accessible text content", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSwitchHTML("Enable feature")}</body>`)
    const labelSpan = dom.window.document.querySelector(".pm-switch__label")
    expect(labelSpan?.textContent).toBe("Enable feature")
  })

  it("supports checked state with aria-checked", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createSwitchHTML("Active", { checked: true })}</body>`,
    )
    const input = dom.window.document.querySelector("input") as HTMLInputElement
    expect(input.checked).toBe(true)
    expect(input.getAttribute("aria-checked")).toBe("true")
  })

  it("supports unchecked state with aria-checked=false", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createSwitchHTML("Inactive", { checked: false })}</body>`,
    )
    const input = dom.window.document.querySelector("input")
    expect(input?.getAttribute("aria-checked")).toBe("false")
  })

  it("supports disabled state", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createSwitchHTML("Disabled", { disabled: true })}</body>`,
    )
    const input = dom.window.document.querySelector("input") as HTMLInputElement
    expect(input.disabled).toBe(true)
    const label = dom.window.document.querySelector("label")
    expect(label?.className).toContain("pm-switch--disabled")
  })

  it("has track and thumb elements", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSwitchHTML("Test")}</body>`)
    const track = dom.window.document.querySelector(".pm-switch__track")
    const thumb = dom.window.document.querySelector(".pm-switch__thumb")
    expect(track).not.toBeNull()
    expect(thumb).not.toBeNull()
  })
})
