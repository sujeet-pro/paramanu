import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { datePickerClasses } from "./date-picker.classes.js"

function createDatePickerHTML(
  options: Parameters<typeof datePickerClasses>[0] = {},
): string {
  const classes = datePickerClasses(options)
  const disabledAttr = options?.disabled ? " disabled" : ""
  const invalidAttr = options?.invalid ? ' aria-invalid="true"' : ""
  const expandedAttr = options?.open ? 'aria-expanded="true"' : 'aria-expanded="false"'
  return `<div class="${classes}"><input class="pm-date-picker__input" type="text" role="combobox" ${expandedAttr} aria-haspopup="dialog"${disabledAttr}${invalidAttr} aria-label="Select date" /><span class="pm-date-picker__icon" aria-hidden="true">📅</span><div class="pm-date-picker__popover" role="dialog" aria-label="Calendar"></div></div>`
}

describe("date picker accessibility", () => {
  it("input has role combobox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDatePickerHTML()}</body>`)
    const input = dom.window.document.querySelector(".pm-date-picker__input")
    expect(input?.getAttribute("role")).toBe("combobox")
  })

  it("input has aria-haspopup=dialog", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDatePickerHTML()}</body>`)
    const input = dom.window.document.querySelector(".pm-date-picker__input")
    expect(input?.getAttribute("aria-haspopup")).toBe("dialog")
  })

  it("input has aria-expanded", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDatePickerHTML({ open: true })}</body>`)
    const input = dom.window.document.querySelector(".pm-date-picker__input")
    expect(input?.getAttribute("aria-expanded")).toBe("true")
  })

  it("popover has role dialog", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDatePickerHTML()}</body>`)
    const popover = dom.window.document.querySelector(".pm-date-picker__popover")
    expect(popover?.getAttribute("role")).toBe("dialog")
  })

  it("popover has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDatePickerHTML()}</body>`)
    const popover = dom.window.document.querySelector(".pm-date-picker__popover")
    expect(popover?.getAttribute("aria-label")).toBe("Calendar")
  })

  it("icon is hidden from screen readers", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDatePickerHTML()}</body>`)
    const icon = dom.window.document.querySelector(".pm-date-picker__icon")
    expect(icon?.getAttribute("aria-hidden")).toBe("true")
  })

  it("disabled input has disabled attribute", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createDatePickerHTML({ disabled: true })}</body>`,
    )
    const input = dom.window.document.querySelector(".pm-date-picker__input")
    expect(input?.hasAttribute("disabled")).toBe(true)
  })

  it("invalid input has aria-invalid", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createDatePickerHTML({ invalid: true })}</body>`,
    )
    const input = dom.window.document.querySelector(".pm-date-picker__input")
    expect(input?.getAttribute("aria-invalid")).toBe("true")
  })
})
