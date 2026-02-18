import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { timePickerClasses } from "./time-picker.classes.js"

function createTimePickerHTML(
  options: Parameters<typeof timePickerClasses>[0] = {},
): string {
  const classes = timePickerClasses(options)
  const disabledAttr = options?.disabled ? " disabled" : ""
  const expandedAttr = options?.open ? 'aria-expanded="true"' : 'aria-expanded="false"'
  const invalidAttr = options?.invalid ? ' aria-invalid="true"' : ""
  return `<div class="${classes}"><input class="pm-time-picker__input" type="text" role="combobox" ${expandedAttr} aria-haspopup="listbox"${disabledAttr}${invalidAttr} aria-label="Select time" /><div class="pm-time-picker__dropdown" role="listbox"><div class="pm-time-picker__column" role="group" aria-label="Hours"><button class="pm-time-picker__option" role="option" aria-selected="false">01</button><button class="pm-time-picker__option pm-time-picker__option--selected" role="option" aria-selected="true">02</button></div><div class="pm-time-picker__column" role="group" aria-label="Minutes"><button class="pm-time-picker__option" role="option" aria-selected="false">00</button><button class="pm-time-picker__option" role="option" aria-selected="false">15</button></div></div></div>`
}

describe("time picker accessibility", () => {
  it("input has role combobox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTimePickerHTML()}</body>`)
    const input = dom.window.document.querySelector(".pm-time-picker__input")
    expect(input?.getAttribute("role")).toBe("combobox")
  })

  it("input has aria-haspopup=listbox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTimePickerHTML()}</body>`)
    const input = dom.window.document.querySelector(".pm-time-picker__input")
    expect(input?.getAttribute("aria-haspopup")).toBe("listbox")
  })

  it("input has aria-expanded=false when closed", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTimePickerHTML({ open: false })}</body>`)
    const input = dom.window.document.querySelector(".pm-time-picker__input")
    expect(input?.getAttribute("aria-expanded")).toBe("false")
  })

  it("input has aria-expanded=true when open", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTimePickerHTML({ open: true })}</body>`)
    const input = dom.window.document.querySelector(".pm-time-picker__input")
    expect(input?.getAttribute("aria-expanded")).toBe("true")
  })

  it("dropdown has role listbox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTimePickerHTML()}</body>`)
    const dropdown = dom.window.document.querySelector(".pm-time-picker__dropdown")
    expect(dropdown?.getAttribute("role")).toBe("listbox")
  })

  it("columns have role group with aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTimePickerHTML()}</body>`)
    const columns = dom.window.document.querySelectorAll('.pm-time-picker__column')
    expect(columns[0]?.getAttribute("role")).toBe("group")
    expect(columns[0]?.getAttribute("aria-label")).toBe("Hours")
    expect(columns[1]?.getAttribute("aria-label")).toBe("Minutes")
  })

  it("options have role option with aria-selected", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTimePickerHTML()}</body>`)
    const options = dom.window.document.querySelectorAll('[role="option"]')
    expect(options.length).toBe(4)
  })

  it("selected option has aria-selected=true", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTimePickerHTML()}</body>`)
    const selected = dom.window.document.querySelector(".pm-time-picker__option--selected")
    expect(selected?.getAttribute("aria-selected")).toBe("true")
  })

  it("disabled input has disabled attribute", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTimePickerHTML({ disabled: true })}</body>`,
    )
    const input = dom.window.document.querySelector(".pm-time-picker__input")
    expect(input?.hasAttribute("disabled")).toBe(true)
  })

  it("invalid input has aria-invalid", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTimePickerHTML({ invalid: true })}</body>`,
    )
    const input = dom.window.document.querySelector(".pm-time-picker__input")
    expect(input?.getAttribute("aria-invalid")).toBe("true")
  })

  it("options are button elements", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTimePickerHTML()}</body>`)
    const option = dom.window.document.querySelector(".pm-time-picker__option")
    expect(option?.tagName).toBe("BUTTON")
  })
})
