import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { multiSelClasses } from "./multi-select.classes.js"

function createMultiSelHTML(options: Parameters<typeof multiSelClasses>[0] = {}): string {
  const classes = multiSelClasses(options)
  const disabledAttr = options?.disabled ? ' aria-disabled="true"' : ""
  const expandedAttr = options?.open ? 'aria-expanded="true"' : 'aria-expanded="false"'
  const invalidAttr = options?.invalid ? ' aria-invalid="true"' : ""
  return `<div class="${classes}"><div class="pm-multi-sel__trigger" role="combobox" ${expandedAttr} aria-haspopup="listbox"${disabledAttr}${invalidAttr} tabindex="0"><span class="pm-multi-sel__tag"><span class="pm-multi-sel__tag-label">Item 1</span><button class="pm-multi-sel__tag-remove" aria-label="Remove Item 1">x</button></span></div><div class="pm-multi-sel__listbox" role="listbox" aria-multiselectable="true"><div class="pm-multi-sel__option" role="option" aria-selected="true">Item 1</div><div class="pm-multi-sel__option" role="option" aria-selected="false">Item 2</div></div></div>`
}

describe("multi-select accessibility", () => {
  it("trigger has role combobox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMultiSelHTML()}</body>`)
    const trigger = dom.window.document.querySelector(".pm-multi-sel__trigger")
    expect(trigger?.getAttribute("role")).toBe("combobox")
  })

  it("trigger has aria-haspopup=listbox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMultiSelHTML()}</body>`)
    const trigger = dom.window.document.querySelector(".pm-multi-sel__trigger")
    expect(trigger?.getAttribute("aria-haspopup")).toBe("listbox")
  })

  it("listbox has aria-multiselectable=true", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMultiSelHTML()}</body>`)
    const listbox = dom.window.document.querySelector('[role="listbox"]')
    expect(listbox?.getAttribute("aria-multiselectable")).toBe("true")
  })

  it("options have role option with aria-selected", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMultiSelHTML()}</body>`)
    const options = dom.window.document.querySelectorAll('[role="option"]')
    expect(options.length).toBe(2)
    expect(options[0]?.getAttribute("aria-selected")).toBe("true")
    expect(options[1]?.getAttribute("aria-selected")).toBe("false")
  })

  it("tag remove button has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMultiSelHTML()}</body>`)
    const removeBtn = dom.window.document.querySelector(".pm-multi-sel__tag-remove")
    expect(removeBtn?.getAttribute("aria-label")).toBe("Remove Item 1")
  })

  it("trigger has aria-expanded", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMultiSelHTML({ open: true })}</body>`)
    const trigger = dom.window.document.querySelector(".pm-multi-sel__trigger")
    expect(trigger?.getAttribute("aria-expanded")).toBe("true")
  })

  it("disabled multi-select has aria-disabled", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMultiSelHTML({ disabled: true })}</body>`)
    const trigger = dom.window.document.querySelector(".pm-multi-sel__trigger")
    expect(trigger?.getAttribute("aria-disabled")).toBe("true")
  })
})
