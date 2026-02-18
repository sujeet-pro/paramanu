import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { paginationClasses, paginationItemClasses } from "./pagination.classes.js"

function createPaginationHTML(
  items: Array<{
    type: "page" | "prev" | "next" | "ellipsis"
    label: string
    active?: boolean
    disabled?: boolean
  }>,
  options?: Parameters<typeof paginationClasses>[0],
): string {
  const rootClasses = paginationClasses(options)
  const listItems = items
    .map((item) => {
      const cls = paginationItemClasses({
        type: item.type,
        active: item.active,
        disabled: item.disabled,
      })
      const ariaCurrent = item.active ? ' aria-current="page"' : ""
      const ariaDisabled = item.disabled ? ' aria-disabled="true"' : ""
      if (item.type === "ellipsis") {
        return `<li><span class="${cls}" aria-hidden="true">${item.label}</span></li>`
      }
      return `<li><button class="${cls}"${ariaCurrent}${ariaDisabled}>${item.label}</button></li>`
    })
    .join("")
  return `<nav aria-label="Pagination" class="${rootClasses}"><ul>${listItems}</ul></nav>`
}

describe("pagination accessibility", () => {
  it("uses nav element with aria-label", () => {
    const html = createPaginationHTML([{ type: "page", label: "1", active: true }])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const nav = dom.window.document.querySelector("nav")
    expect(nav).not.toBeNull()
    expect(nav?.getAttribute("aria-label")).toBe("Pagination")
  })

  it("uses unordered list for items", () => {
    const html = createPaginationHTML([
      { type: "page", label: "1", active: true },
      { type: "page", label: "2" },
    ])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const ul = dom.window.document.querySelector("ul")
    expect(ul).not.toBeNull()
    const items = dom.window.document.querySelectorAll("li")
    expect(items.length).toBe(2)
  })

  it("active page has aria-current", () => {
    const html = createPaginationHTML([
      { type: "page", label: "1", active: true },
      { type: "page", label: "2" },
    ])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const active = dom.window.document.querySelector("[aria-current='page']")
    expect(active).not.toBeNull()
    expect(active?.textContent).toBe("1")
  })

  it("disabled items have aria-disabled", () => {
    const html = createPaginationHTML([{ type: "prev", label: "Previous", disabled: true }])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button?.getAttribute("aria-disabled")).toBe("true")
  })

  it("ellipsis items are hidden from screen readers", () => {
    const html = createPaginationHTML([{ type: "ellipsis", label: "..." }])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const ellipsis = dom.window.document.querySelector("[aria-hidden='true']")
    expect(ellipsis).not.toBeNull()
    expect(ellipsis?.textContent).toBe("...")
  })

  it("page items use button elements", () => {
    const html = createPaginationHTML([{ type: "page", label: "1" }])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button).not.toBeNull()
    expect(button?.tagName).toBe("BUTTON")
  })
})
