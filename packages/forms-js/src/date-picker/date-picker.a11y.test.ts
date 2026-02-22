import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { datepickerClasses } from "./date-picker.classes.js"

function createDatepickerHTML(options: Parameters<typeof datepickerClasses>[0] = {}): string {
  const classes = datepickerClasses(options)
  const disabledAttr = options?.disabled ? " disabled" : ""
  const invalidAttr = options?.invalid ? ' aria-invalid="true"' : ""
  const expandedAttr = options?.open ? 'aria-expanded="true"' : 'aria-expanded="false"'
  return `<div class="${classes}"><input class="pm-datepicker__input" type="text" role="combobox" ${expandedAttr} aria-haspopup="dialog"${disabledAttr}${invalidAttr} aria-label="Select date" /><span class="pm-datepicker__icon" aria-hidden="true">📅</span><div class="pm-datepicker__popover" role="dialog" aria-label="Calendar"></div></div>`
}

describe("date picker accessibility", () => {
  it("input has role combobox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDatepickerHTML()}</body>`)
    const input = dom.window.document.querySelector(".pm-datepicker__input")
    expect(input?.getAttribute("role")).toBe("combobox")
  })

  it("input has aria-haspopup=dialog", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDatepickerHTML()}</body>`)
    const input = dom.window.document.querySelector(".pm-datepicker__input")
    expect(input?.getAttribute("aria-haspopup")).toBe("dialog")
  })

  it("input has aria-expanded", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDatepickerHTML({ open: true })}</body>`)
    const input = dom.window.document.querySelector(".pm-datepicker__input")
    expect(input?.getAttribute("aria-expanded")).toBe("true")
  })

  it("popover has role dialog", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDatepickerHTML()}</body>`)
    const popover = dom.window.document.querySelector(".pm-datepicker__popover")
    expect(popover?.getAttribute("role")).toBe("dialog")
  })

  it("popover has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDatepickerHTML()}</body>`)
    const popover = dom.window.document.querySelector(".pm-datepicker__popover")
    expect(popover?.getAttribute("aria-label")).toBe("Calendar")
  })

  it("icon is hidden from screen readers", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDatepickerHTML()}</body>`)
    const icon = dom.window.document.querySelector(".pm-datepicker__icon")
    expect(icon?.getAttribute("aria-hidden")).toBe("true")
  })

  it("disabled input has disabled attribute", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDatepickerHTML({ disabled: true })}</body>`)
    const input = dom.window.document.querySelector(".pm-datepicker__input")
    expect(input?.hasAttribute("disabled")).toBe(true)
  })

  it("invalid input has aria-invalid", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDatepickerHTML({ invalid: true })}</body>`)
    const input = dom.window.document.querySelector(".pm-datepicker__input")
    expect(input?.getAttribute("aria-invalid")).toBe("true")
  })
})
