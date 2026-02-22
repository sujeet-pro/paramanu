import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { markClasses } from "./mark.classes.js"

function createMarkHTML(text: string, options: Parameters<typeof markClasses>[0] = {}): string {
  const classes = markClasses(options)
  return `<mark class="${classes}">${text}</mark>`
}

describe("mark accessibility", () => {
  it("renders as a semantic mark element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMarkHTML("important")}</body>`)
    const el = dom.window.document.querySelector("mark")
    expect(el).not.toBeNull()
    expect(el?.tagName).toBe("MARK")
  })

  it("has readable text content", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMarkHTML("marked text")}</body>`)
    const el = dom.window.document.querySelector("mark")
    expect(el?.textContent).toBe("marked text")
  })

  it("preserves surrounding text context", () => {
    const classes = markClasses()
    const html = `<p>This is <mark class="${classes}">marked</mark> text</p>`
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const p = dom.window.document.querySelector("p")
    expect(p?.textContent).toBe("This is marked text")
  })

  it("preserves class attribute for styling", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createMarkHTML("Styled", { variant: "default" })}</body>`,
    )
    const el = dom.window.document.querySelector("mark")
    expect(el?.classList.contains("pm-mark")).toBe(true)
    expect(el?.classList.contains("pm-mark--default")).toBe(true)
  })
})
