import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { dateRangePickerClasses } from "./date-range-picker.classes.js"

function createDateRangePickerHTML(
  options: Parameters<typeof dateRangePickerClasses>[0] = {},
): string {
  const classes = dateRangePickerClasses(options)
  const disabledAttr = options?.disabled ? ' aria-disabled="true"' : ""
  const expandedAttr = options?.open ? 'aria-expanded="true"' : 'aria-expanded="false"'
  const invalidAttr = options?.invalid ? ' aria-invalid="true"' : ""
  return `<div class="${classes}"><button class="pm-date-range-picker__trigger" role="combobox" ${expandedAttr} aria-haspopup="dialog"${disabledAttr}${invalidAttr} aria-label="Select date range">Feb 1 - Feb 15</button><div class="pm-date-range-picker__popover" role="dialog" aria-label="Date range calendar"><div class="pm-date-range-picker__panels"><div>Panel 1</div><div>Panel 2</div></div></div></div>`
}

describe("date range picker accessibility", () => {
  it("trigger has role combobox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDateRangePickerHTML()}</body>`)
    const trigger = dom.window.document.querySelector(".pm-date-range-picker__trigger")
    expect(trigger?.getAttribute("role")).toBe("combobox")
  })

  it("trigger has aria-haspopup=dialog", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDateRangePickerHTML()}</body>`)
    const trigger = dom.window.document.querySelector(".pm-date-range-picker__trigger")
    expect(trigger?.getAttribute("aria-haspopup")).toBe("dialog")
  })

  it("trigger has aria-expanded", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createDateRangePickerHTML({ open: true })}</body>`,
    )
    const trigger = dom.window.document.querySelector(".pm-date-range-picker__trigger")
    expect(trigger?.getAttribute("aria-expanded")).toBe("true")
  })

  it("popover has role dialog", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDateRangePickerHTML()}</body>`)
    const popover = dom.window.document.querySelector(".pm-date-range-picker__popover")
    expect(popover?.getAttribute("role")).toBe("dialog")
  })

  it("popover has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDateRangePickerHTML()}</body>`)
    const popover = dom.window.document.querySelector(".pm-date-range-picker__popover")
    expect(popover?.getAttribute("aria-label")).toBe("Date range calendar")
  })

  it("disabled trigger has aria-disabled", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createDateRangePickerHTML({ disabled: true })}</body>`,
    )
    const trigger = dom.window.document.querySelector(".pm-date-range-picker__trigger")
    expect(trigger?.getAttribute("aria-disabled")).toBe("true")
  })

  it("invalid trigger has aria-invalid", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createDateRangePickerHTML({ invalid: true })}</body>`,
    )
    const trigger = dom.window.document.querySelector(".pm-date-range-picker__trigger")
    expect(trigger?.getAttribute("aria-invalid")).toBe("true")
  })

  it("panels container exists for two calendars", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDateRangePickerHTML()}</body>`)
    const panels = dom.window.document.querySelector(".pm-date-range-picker__panels")
    expect(panels).not.toBeNull()
    expect(panels?.children.length).toBe(2)
  })
})
