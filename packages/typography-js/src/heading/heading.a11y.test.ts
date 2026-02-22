import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { headingClasses } from "./heading.classes.js"
import type { HeadingLevel } from "./heading.types.js"

function createHeadingHTML(
  text: string,
  options: Parameters<typeof headingClasses>[0] = {},
): string {
  const level = options?.level ?? 2
  const classes = headingClasses(options)
  return `<h${level} class="${classes}">${text}</h${level}>`
}

describe("heading accessibility", () => {
  it("renders as a semantic heading element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createHeadingHTML("Title")}</body>`)
    const el = dom.window.document.querySelector("h2")
    expect(el).not.toBeNull()
    expect(el?.tagName).toBe("H2")
  })

  it("uses correct heading level tag", () => {
    const levels: HeadingLevel[] = [1, 2, 3, 4, 5, 6]
    for (const level of levels) {
      const dom = new JSDOM(`<!DOCTYPE html><body>${createHeadingHTML("Title", { level })}</body>`)
      const el = dom.window.document.querySelector(`h${level}`)
      expect(el).not.toBeNull()
      expect(el?.tagName).toBe(`H${level}`)
    }
  })

  it("has readable text content", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createHeadingHTML("Page Title")}</body>`)
    const el = dom.window.document.querySelector("h2")
    expect(el?.textContent).toBe("Page Title")
  })

  it("maintains heading hierarchy", () => {
    const html = `
      ${createHeadingHTML("Main Title", { level: 1 })}
      ${createHeadingHTML("Section", { level: 2 })}
      ${createHeadingHTML("Subsection", { level: 3 })}
    `
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const headings = dom.window.document.querySelectorAll("h1, h2, h3")
    expect(headings).toHaveLength(3)
    expect(headings[0].tagName).toBe("H1")
    expect(headings[1].tagName).toBe("H2")
    expect(headings[2].tagName).toBe("H3")
  })
})
