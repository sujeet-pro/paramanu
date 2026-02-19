import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { datalistClasses } from "./data-list.classes.js"
import type { DatalistClassesOptions } from "./data-list.types.js"

function createDatalistHTML(options: DatalistClassesOptions = {}): string {
  const classes = datalistClasses(options)
  return `
    <dl class="${classes.root}">
      <div class="${classes.item}">
        <dt class="${classes.term}">Name</dt>
        <dd class="${classes.detail}">John Doe</dd>
      </div>
      <div class="${classes.item}">
        <dt class="${classes.term}">Email</dt>
        <dd class="${classes.detail}">john@example.com</dd>
      </div>
    </dl>
  `
}

describe("data list accessibility", () => {
  it("renders as a semantic dl element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDatalistHTML()}</body>`)
    const dl = dom.window.document.querySelector("dl")
    expect(dl).not.toBeNull()
    expect(dl?.tagName).toBe("DL")
  })

  it("uses dt elements for terms", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDatalistHTML()}</body>`)
    const terms = dom.window.document.querySelectorAll("dt")
    expect(terms.length).toBe(2)
    expect(terms[0].textContent).toBe("Name")
    expect(terms[1].textContent).toBe("Email")
  })

  it("uses dd elements for details", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDatalistHTML()}</body>`)
    const details = dom.window.document.querySelectorAll("dd")
    expect(details.length).toBe(2)
    expect(details[0].textContent).toBe("John Doe")
    expect(details[1].textContent).toBe("john@example.com")
  })

  it("groups dt/dd pairs in items", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createDatalistHTML()}</body>`)
    const items = dom.window.document.querySelectorAll(".pm-datalist__item")
    expect(items.length).toBe(2)
    items.forEach((item) => {
      expect(item.querySelector("dt")).not.toBeNull()
      expect(item.querySelector("dd")).not.toBeNull()
    })
  })

  it("renders correctly in horizontal orientation", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createDatalistHTML({ orientation: "horizontal" })}</body>`,
    )
    const dl = dom.window.document.querySelector("dl")
    expect(dl?.classList.contains("pm-datalist--horizontal")).toBe(true)
  })
})
