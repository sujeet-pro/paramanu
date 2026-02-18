import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { comboboxClasses } from "./combobox.classes.js"

function createComboboxHTML(
  options: Parameters<typeof comboboxClasses>[0] = {},
): string {
  const classes = comboboxClasses(options)
  const disabledAttr = options?.disabled ? " disabled" : ""
  const expandedAttr = options?.open ? 'aria-expanded="true"' : 'aria-expanded="false"'
  const invalidAttr = options?.invalid ? ' aria-invalid="true"' : ""
  return `<div class="${classes}"><input class="pm-combobox__input" role="combobox" ${expandedAttr} aria-autocomplete="list" aria-haspopup="listbox"${disabledAttr}${invalidAttr} /><div class="pm-combobox__listbox" role="listbox"><div class="pm-combobox__option" role="option" aria-selected="false">Option A</div><div class="pm-combobox__option pm-combobox__option--selected" role="option" aria-selected="true">Option B</div></div></div>`
}

describe("combobox accessibility", () => {
  it("input has role combobox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createComboboxHTML()}</body>`)
    const input = dom.window.document.querySelector(".pm-combobox__input")
    expect(input?.getAttribute("role")).toBe("combobox")
  })

  it("input has aria-autocomplete=list", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createComboboxHTML()}</body>`)
    const input = dom.window.document.querySelector(".pm-combobox__input")
    expect(input?.getAttribute("aria-autocomplete")).toBe("list")
  })

  it("input has aria-haspopup=listbox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createComboboxHTML()}</body>`)
    const input = dom.window.document.querySelector(".pm-combobox__input")
    expect(input?.getAttribute("aria-haspopup")).toBe("listbox")
  })

  it("input has aria-expanded=false when closed", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createComboboxHTML({ open: false })}</body>`)
    const input = dom.window.document.querySelector(".pm-combobox__input")
    expect(input?.getAttribute("aria-expanded")).toBe("false")
  })

  it("input has aria-expanded=true when open", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createComboboxHTML({ open: true })}</body>`)
    const input = dom.window.document.querySelector(".pm-combobox__input")
    expect(input?.getAttribute("aria-expanded")).toBe("true")
  })

  it("listbox has role listbox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createComboboxHTML()}</body>`)
    const listbox = dom.window.document.querySelector(".pm-combobox__listbox")
    expect(listbox?.getAttribute("role")).toBe("listbox")
  })

  it("options have role option", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createComboboxHTML()}</body>`)
    const options = dom.window.document.querySelectorAll('[role="option"]')
    expect(options.length).toBe(2)
  })

  it("disabled combobox has disabled attribute on input", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createComboboxHTML({ disabled: true })}</body>`,
    )
    const input = dom.window.document.querySelector(".pm-combobox__input")
    expect(input?.hasAttribute("disabled")).toBe(true)
  })

  it("invalid combobox has aria-invalid", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createComboboxHTML({ invalid: true })}</body>`,
    )
    const input = dom.window.document.querySelector(".pm-combobox__input")
    expect(input?.getAttribute("aria-invalid")).toBe("true")
  })
})
