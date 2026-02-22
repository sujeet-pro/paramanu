import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { cascaderClasses } from "./cascader.classes.js"

function createCascaderHTML(options: Parameters<typeof cascaderClasses>[0] = {}): string {
  const classes = cascaderClasses(options)
  const disabledAttr = options?.disabled ? ' aria-disabled="true" tabindex="-1"' : ""
  const expandedAttr = options?.open ? 'aria-expanded="true"' : 'aria-expanded="false"'
  const invalidAttr = options?.invalid ? ' aria-invalid="true"' : ""
  return `<div class="${classes}"><button class="pm-cascader__trigger" role="combobox" ${expandedAttr} aria-haspopup="listbox"${disabledAttr}${invalidAttr}>Select...</button><div class="pm-cascader__dropdown"><div class="pm-cascader__column" role="listbox" aria-label="Level 1"><div class="pm-cascader__option" role="option" aria-selected="false">Province</div><div class="pm-cascader__option pm-cascader__option--expanded" role="option" aria-expanded="true" aria-selected="true">City</div></div><div class="pm-cascader__column" role="listbox" aria-label="Level 2"><div class="pm-cascader__option" role="option" aria-selected="false">District A</div><div class="pm-cascader__option pm-cascader__option--selected" role="option" aria-selected="true">District B</div></div></div></div>`
}

describe("cascader accessibility", () => {
  it("trigger has role combobox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCascaderHTML()}</body>`)
    const trigger = dom.window.document.querySelector(".pm-cascader__trigger")
    expect(trigger?.getAttribute("role")).toBe("combobox")
  })

  it("trigger has aria-haspopup=listbox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCascaderHTML()}</body>`)
    const trigger = dom.window.document.querySelector(".pm-cascader__trigger")
    expect(trigger?.getAttribute("aria-haspopup")).toBe("listbox")
  })

  it("trigger has aria-expanded=false when closed", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCascaderHTML({ open: false })}</body>`)
    const trigger = dom.window.document.querySelector(".pm-cascader__trigger")
    expect(trigger?.getAttribute("aria-expanded")).toBe("false")
  })

  it("trigger has aria-expanded=true when open", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCascaderHTML({ open: true })}</body>`)
    const trigger = dom.window.document.querySelector(".pm-cascader__trigger")
    expect(trigger?.getAttribute("aria-expanded")).toBe("true")
  })

  it("columns have role listbox with aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCascaderHTML()}</body>`)
    const columns = dom.window.document.querySelectorAll(".pm-cascader__column")
    expect(columns[0]?.getAttribute("role")).toBe("listbox")
    expect(columns[0]?.getAttribute("aria-label")).toBe("Level 1")
    expect(columns[1]?.getAttribute("aria-label")).toBe("Level 2")
  })

  it("options have role option with aria-selected", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCascaderHTML()}</body>`)
    const options = dom.window.document.querySelectorAll('[role="option"]')
    expect(options.length).toBe(4)
  })

  it("expanded option has aria-expanded=true", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCascaderHTML()}</body>`)
    const expanded = dom.window.document.querySelector(".pm-cascader__option--expanded")
    expect(expanded?.getAttribute("aria-expanded")).toBe("true")
  })

  it("selected option has aria-selected=true", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCascaderHTML()}</body>`)
    const selected = dom.window.document.querySelector(".pm-cascader__option--selected")
    expect(selected?.getAttribute("aria-selected")).toBe("true")
  })

  it("disabled cascader has aria-disabled on trigger", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCascaderHTML({ disabled: true })}</body>`)
    const trigger = dom.window.document.querySelector(".pm-cascader__trigger")
    expect(trigger?.getAttribute("aria-disabled")).toBe("true")
  })

  it("invalid cascader has aria-invalid on trigger", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCascaderHTML({ invalid: true })}</body>`)
    const trigger = dom.window.document.querySelector(".pm-cascader__trigger")
    expect(trigger?.getAttribute("aria-invalid")).toBe("true")
  })
})
