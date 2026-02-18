import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { nativeSelectClasses } from "./native-select.classes.js"

function createNativeSelectHTML(
  options: Parameters<typeof nativeSelectClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = nativeSelectClasses(options)
  const disabledAttr = options?.disabled ? ' disabled aria-disabled="true"' : ""
  const invalidAttr = options?.invalid ? ' aria-invalid="true"' : ""
  return `<div class="${classes}"><select class="pm-native-select__field"${disabledAttr}${invalidAttr}${attrs ? " " + attrs : ""}><option value="a">A</option><option value="b">B</option></select><span class="pm-native-select__arrow" aria-hidden="true">&#9662;</span></div>`
}

describe("native select accessibility", () => {
  it("renders as a select element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createNativeSelectHTML()}</body>`)
    const select = dom.window.document.querySelector("select")
    expect(select).not.toBeNull()
    expect(select?.tagName).toBe("SELECT")
  })

  it("contains option elements", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createNativeSelectHTML()}</body>`)
    const options = dom.window.document.querySelectorAll("option")
    expect(options.length).toBe(2)
  })

  it("disabled select has disabled attribute and aria-disabled", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createNativeSelectHTML({ disabled: true })}</body>`,
    )
    const select = dom.window.document.querySelector("select")
    expect(select?.hasAttribute("disabled")).toBe(true)
    expect(select?.getAttribute("aria-disabled")).toBe("true")
  })

  it("invalid select has aria-invalid", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createNativeSelectHTML({ invalid: true })}</body>`,
    )
    const select = dom.window.document.querySelector("select")
    expect(select?.getAttribute("aria-invalid")).toBe("true")
  })

  it("arrow icon is hidden from screen readers", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createNativeSelectHTML()}</body>`)
    const arrow = dom.window.document.querySelector(".pm-native-select__arrow")
    expect(arrow?.getAttribute("aria-hidden")).toBe("true")
  })

  it("supports aria-label", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createNativeSelectHTML({}, 'aria-label="Country"')}</body>`,
    )
    const select = dom.window.document.querySelector("select")
    expect(select?.getAttribute("aria-label")).toBe("Country")
  })

  it("supports aria-required", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createNativeSelectHTML({}, 'aria-required="true"')}</body>`,
    )
    const select = dom.window.document.querySelector("select")
    expect(select?.getAttribute("aria-required")).toBe("true")
  })
})
