import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import {
  breadcrumbsClasses,
  breadcrumbsItemClasses,
  breadcrumbsLinkClasses,
} from "./breadcrumbs.classes.js"

function createBreadcrumbsHTML(
  items: Array<{ label: string; href?: string; active?: boolean }>,
  separator?: "slash" | "chevron" | "dot",
): string {
  const rootClasses = breadcrumbsClasses({ separator })
  const listItems = items
    .map((item) => {
      const itemClasses = breadcrumbsItemClasses({ active: item.active })
      if (item.active) {
        return `<li class="${itemClasses}"><span aria-current="page">${item.label}</span></li>`
      }
      const linkClasses = breadcrumbsLinkClasses()
      return `<li class="${itemClasses}"><a href="${item.href}" class="${linkClasses}">${item.label}</a></li>`
    })
    .join("")
  return `<nav aria-label="Breadcrumb" class="${rootClasses}"><ol>${listItems}</ol></nav>`
}

describe("breadcrumbs accessibility", () => {
  it("uses nav element with aria-label", () => {
    const html = createBreadcrumbsHTML([{ label: "Home", href: "/" }])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const nav = dom.window.document.querySelector("nav")
    expect(nav).not.toBeNull()
    expect(nav?.getAttribute("aria-label")).toBe("Breadcrumb")
  })

  it("uses ordered list for breadcrumb items", () => {
    const html = createBreadcrumbsHTML([
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
    ])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const ol = dom.window.document.querySelector("ol")
    expect(ol).not.toBeNull()
    const items = dom.window.document.querySelectorAll("li")
    expect(items.length).toBe(2)
  })

  it("uses anchor elements for links", () => {
    const html = createBreadcrumbsHTML([{ label: "Home", href: "/" }])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const link = dom.window.document.querySelector("a")
    expect(link).not.toBeNull()
    expect(link?.getAttribute("href")).toBe("/")
    expect(link?.textContent).toBe("Home")
  })

  it("marks current page with aria-current", () => {
    const html = createBreadcrumbsHTML([
      { label: "Home", href: "/" },
      { label: "Current", active: true },
    ])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const current = dom.window.document.querySelector("[aria-current='page']")
    expect(current).not.toBeNull()
    expect(current?.textContent).toBe("Current")
  })

  it("active item uses span instead of link", () => {
    const html = createBreadcrumbsHTML([
      { label: "Home", href: "/" },
      { label: "Current", active: true },
    ])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const current = dom.window.document.querySelector("[aria-current='page']")
    expect(current?.tagName).toBe("SPAN")
  })
})
