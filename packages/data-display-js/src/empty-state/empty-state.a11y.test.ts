import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { emptyStateClasses } from "./empty-state.classes.js"

function createEmptyStateHTML(
  options: Parameters<typeof emptyStateClasses>[0] = {},
  attrs: string = "",
): string {
  const cls = emptyStateClasses(options)
  return `<div class="${cls.root}"${attrs ? " " + attrs : ""}>
    <div class="${cls.icon}">📦</div>
    <h3 class="${cls.heading}">No items found</h3>
    <p class="${cls.description}">Try adjusting your search or filter criteria.</p>
    <div class="${cls.actions}"><button>Add item</button></div>
  </div>`
}

describe("empty-state accessibility", () => {
  it("renders as a div container", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createEmptyStateHTML()}</body>`)
    const emptyState = dom.window.document.querySelector(".pm-empty-state")
    expect(emptyState).not.toBeNull()
    expect(emptyState?.tagName).toBe("DIV")
  })

  it("heading provides accessible context", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createEmptyStateHTML()}</body>`)
    const heading = dom.window.document.querySelector(".pm-empty-state__heading")
    expect(heading?.textContent).toBe("No items found")
    expect(heading?.tagName).toBe("H3")
  })

  it("description provides additional context", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createEmptyStateHTML()}</body>`)
    const description = dom.window.document.querySelector(".pm-empty-state__description")
    expect(description?.textContent).toBe("Try adjusting your search or filter criteria.")
  })

  it("actions contain interactive elements", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createEmptyStateHTML()}</body>`)
    const actions = dom.window.document.querySelector(".pm-empty-state__actions")
    const button = actions?.querySelector("button")
    expect(button).not.toBeNull()
    expect(button?.textContent).toBe("Add item")
  })

  it("supports aria-label for section identification", () => {
    const html = createEmptyStateHTML({}, 'aria-label="Empty results"')
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const emptyState = dom.window.document.querySelector(".pm-empty-state")
    expect(emptyState?.getAttribute("aria-label")).toBe("Empty results")
  })
})
