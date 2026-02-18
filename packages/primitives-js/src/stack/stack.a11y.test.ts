import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { stackClasses } from "./stack.classes.js"

describe("stack accessibility", () => {
  it("renders as a generic container element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body><div class="${stackClasses()}">Content</div></body>`)
    const el = dom.window.document.querySelector("div")
    expect(el).not.toBeNull()
    expect(el?.textContent).toBe("Content")
  })

  it("preserves class attribute for styling", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body><div class="${stackClasses()}">Test</div></body>`)
    const el = dom.window.document.querySelector("div")
    expect(el?.classList.contains("pm-stack")).toBe(true)
  })

  it("supports aria-label for identification", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${stackClasses()}" aria-label="Form fields">Test</div></body>`,
    )
    const el = dom.window.document.querySelector("div")
    expect(el?.getAttribute("aria-label")).toBe("Form fields")
  })

  it("supports aria-labelledby for identification", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <h2 id="stack-heading">Stacked items</h2>
      <div class="${stackClasses()}" aria-labelledby="stack-heading">Test</div>
    </body>`)
    const el = dom.window.document.querySelector(`.pm-stack`)
    expect(el?.getAttribute("aria-labelledby")).toBe("stack-heading")
  })

  it("preserves children order for screen readers", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <div class="${stackClasses()}">
        <p>First</p>
        <p>Second</p>
        <p>Third</p>
      </div>
    </body>`)
    const children = dom.window.document.querySelectorAll(".pm-stack > p")
    expect(children.length).toBe(3)
    expect(children[0]?.textContent).toBe("First")
    expect(children[1]?.textContent).toBe("Second")
    expect(children[2]?.textContent).toBe("Third")
  })
})
