import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { tableClasses } from "./table.classes.js"
import type { TableClassesOptions } from "./table.types.js"

function createTableHTML(options: TableClassesOptions = {}): string {
  const classes = tableClasses(options)
  return `
    <div class="${classes.container}">
      <table class="${classes.root}">
        <caption class="${classes.caption}">Sample table caption</caption>
        <thead class="${classes.head}">
          <tr class="${classes.row}">
            <th class="${classes.headerCell}" scope="col">Name</th>
            <th class="${classes.headerCell}" scope="col">Value</th>
          </tr>
        </thead>
        <tbody class="${classes.body}">
          <tr class="${classes.row}">
            <td class="${classes.cell}">Item 1</td>
            <td class="${classes.cell}">100</td>
          </tr>
          <tr class="${classes.row}">
            <td class="${classes.cell}">Item 2</td>
            <td class="${classes.cell}">200</td>
          </tr>
        </tbody>
        <tfoot class="${classes.foot}">
          <tr class="${classes.row}">
            <td class="${classes.cell}">Total</td>
            <td class="${classes.cell}">300</td>
          </tr>
        </tfoot>
      </table>
    </div>
  `
}

describe("table accessibility", () => {
  it("renders as a semantic table element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTableHTML()}</body>`)
    const table = dom.window.document.querySelector("table")
    expect(table).not.toBeNull()
    expect(table?.tagName).toBe("TABLE")
  })

  it("has a caption for accessible table description", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTableHTML()}</body>`)
    const caption = dom.window.document.querySelector("caption")
    expect(caption).not.toBeNull()
    expect(caption?.textContent).toBe("Sample table caption")
  })

  it("uses thead, tbody, and tfoot for semantic grouping", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTableHTML()}</body>`)
    const thead = dom.window.document.querySelector("thead")
    const tbody = dom.window.document.querySelector("tbody")
    const tfoot = dom.window.document.querySelector("tfoot")
    expect(thead).not.toBeNull()
    expect(tbody).not.toBeNull()
    expect(tfoot).not.toBeNull()
  })

  it("uses th elements with scope for header cells", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTableHTML()}</body>`)
    const headers = dom.window.document.querySelectorAll("th")
    expect(headers.length).toBeGreaterThan(0)
    headers.forEach((th) => {
      expect(th.getAttribute("scope")).toBe("col")
    })
  })

  it("uses td elements for data cells", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTableHTML()}</body>`)
    const cells = dom.window.document.querySelectorAll("tbody td")
    expect(cells.length).toBeGreaterThan(0)
  })

  it("wraps table in a container for overflow handling", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTableHTML()}</body>`)
    const container = dom.window.document.querySelector(".pm-table__container")
    expect(container).not.toBeNull()
    const table = container?.querySelector("table")
    expect(table).not.toBeNull()
  })
})
