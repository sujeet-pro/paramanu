import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { searchClasses } from "./search-input.classes.js"
import { inputClasses } from "../input/input.classes.js"

function createSearchHTML(
  options: Parameters<typeof searchClasses>[0] = {},
  attrs: string = "",
): string {
  const wrapperClasses = searchClasses(options)
  const innerClasses = inputClasses({
    variant: options?.variant,
    size: options?.size,
    invalid: options?.invalid,
    disabled: options?.disabled,
  })
  const disabledAttr = options?.disabled ? ' disabled aria-disabled="true"' : ""
  const invalidAttr = options?.invalid ? ' aria-invalid="true"' : ""
  return `<div class="${wrapperClasses}" role="search">
    <span class="pm-search__icon" aria-hidden="true">&#128269;</span>
    <input class="${innerClasses}" type="search"${disabledAttr}${invalidAttr}${attrs ? " " + attrs : ""} />
    <button class="pm-search__clear" type="button" aria-label="Clear search">&#10005;</button>
  </div>`
}

describe("search input accessibility", () => {
  it("renders with a wrapper div and search input", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSearchHTML()}</body>`)
    const wrapper = dom.window.document.querySelector(".pm-search")
    const input = dom.window.document.querySelector("input")
    expect(wrapper).not.toBeNull()
    expect(input).not.toBeNull()
    expect(input?.getAttribute("type")).toBe("search")
  })

  it("wrapper has role=search", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSearchHTML()}</body>`)
    const wrapper = dom.window.document.querySelector(".pm-search")
    expect(wrapper?.getAttribute("role")).toBe("search")
  })

  it("search icon is hidden from assistive tech", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSearchHTML()}</body>`)
    const icon = dom.window.document.querySelector(".pm-search__icon")
    expect(icon?.getAttribute("aria-hidden")).toBe("true")
  })

  it("clear button has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSearchHTML()}</body>`)
    const clear = dom.window.document.querySelector(".pm-search__clear")
    expect(clear?.getAttribute("aria-label")).toBe("Clear search")
  })

  it("clear button is type=button", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSearchHTML()}</body>`)
    const clear = dom.window.document.querySelector(".pm-search__clear")
    expect(clear?.getAttribute("type")).toBe("button")
  })

  it("disabled input has disabled attribute and aria-disabled", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSearchHTML({ disabled: true })}</body>`)
    const input = dom.window.document.querySelector("input")
    expect(input?.hasAttribute("disabled")).toBe(true)
    expect(input?.getAttribute("aria-disabled")).toBe("true")
  })

  it("invalid input has aria-invalid", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSearchHTML({ invalid: true })}</body>`)
    const input = dom.window.document.querySelector("input")
    expect(input?.getAttribute("aria-invalid")).toBe("true")
  })

  it("supports aria-label on input", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createSearchHTML({}, 'aria-label="Search products"')}</body>`,
    )
    const input = dom.window.document.querySelector("input")
    expect(input?.getAttribute("aria-label")).toBe("Search products")
  })
})
