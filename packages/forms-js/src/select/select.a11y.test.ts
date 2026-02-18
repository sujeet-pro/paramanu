import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { selectClasses } from "./select.classes.js"

function createSelectHTML(
  options: Parameters<typeof selectClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = selectClasses(options)
  const disabledAttr = options?.disabled ? ' aria-disabled="true" tabindex="-1"' : ""
  const expandedAttr = options?.open ? 'aria-expanded="true"' : 'aria-expanded="false"'
  const invalidAttr = options?.invalid ? ' aria-invalid="true"' : ""
  return `<div class="${classes}"><button class="pm-select__trigger" role="combobox" ${expandedAttr} aria-haspopup="listbox"${disabledAttr}${invalidAttr}${attrs ? " " + attrs : ""}>Select...</button><div class="pm-select__listbox" role="listbox"><div class="pm-select__option" role="option" aria-selected="false">Option A</div><div class="pm-select__option pm-select__option--selected" role="option" aria-selected="true">Option B</div></div></div>`
}

describe("select accessibility", () => {
  it("trigger has role combobox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSelectHTML()}</body>`)
    const trigger = dom.window.document.querySelector(".pm-select__trigger")
    expect(trigger?.getAttribute("role")).toBe("combobox")
  })

  it("trigger has aria-haspopup=listbox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSelectHTML()}</body>`)
    const trigger = dom.window.document.querySelector(".pm-select__trigger")
    expect(trigger?.getAttribute("aria-haspopup")).toBe("listbox")
  })

  it("trigger has aria-expanded=false when closed", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSelectHTML({ open: false })}</body>`)
    const trigger = dom.window.document.querySelector(".pm-select__trigger")
    expect(trigger?.getAttribute("aria-expanded")).toBe("false")
  })

  it("trigger has aria-expanded=true when open", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSelectHTML({ open: true })}</body>`)
    const trigger = dom.window.document.querySelector(".pm-select__trigger")
    expect(trigger?.getAttribute("aria-expanded")).toBe("true")
  })

  it("listbox has role listbox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSelectHTML()}</body>`)
    const listbox = dom.window.document.querySelector(".pm-select__listbox")
    expect(listbox?.getAttribute("role")).toBe("listbox")
  })

  it("options have role option", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSelectHTML()}</body>`)
    const options = dom.window.document.querySelectorAll('[role="option"]')
    expect(options.length).toBe(2)
  })

  it("selected option has aria-selected=true", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSelectHTML()}</body>`)
    const selected = dom.window.document.querySelector(".pm-select__option--selected")
    expect(selected?.getAttribute("aria-selected")).toBe("true")
  })

  it("disabled select has aria-disabled", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSelectHTML({ disabled: true })}</body>`)
    const trigger = dom.window.document.querySelector(".pm-select__trigger")
    expect(trigger?.getAttribute("aria-disabled")).toBe("true")
  })

  it("invalid select has aria-invalid on trigger", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSelectHTML({ invalid: true })}</body>`)
    const trigger = dom.window.document.querySelector(".pm-select__trigger")
    expect(trigger?.getAttribute("aria-invalid")).toBe("true")
  })
})
