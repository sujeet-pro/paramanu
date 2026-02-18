import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { structuredListClasses } from "./structured-list.classes.js"
import type { StructuredListClassesOptions } from "./structured-list.types.js"

function createStructuredListHTML(options: StructuredListClassesOptions = {}): string {
  const classes = structuredListClasses(options)
  const selectableRowAttrs = options.selectable ? ' tabindex="0"' : ""
  return `
    <div class="${classes.root}" role="table" aria-label="Structured list">
      <div class="${classes.head}" role="rowgroup">
        <div class="${classes.row}" role="row">
          <div class="${classes.headerCell}" role="columnheader">Name</div>
          <div class="${classes.headerCell}" role="columnheader">Value</div>
        </div>
      </div>
      <div class="${classes.body}" role="rowgroup">
        <div class="${classes.row}" role="row"${selectableRowAttrs}>
          <div class="${classes.cell}" role="cell">Item A</div>
          <div class="${classes.cell}" role="cell">100</div>
        </div>
        <div class="${classes.row}" role="row"${selectableRowAttrs}>
          <div class="${classes.cell}" role="cell">Item B</div>
          <div class="${classes.cell}" role="cell">200</div>
        </div>
      </div>
    </div>
  `
}

describe("structured list accessibility", () => {
  it("has role=table on root element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createStructuredListHTML()}</body>`)
    const root = dom.window.document.querySelector("[role='table']")
    expect(root).not.toBeNull()
  })

  it("has aria-label on the root for accessible name", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createStructuredListHTML()}</body>`)
    const root = dom.window.document.querySelector("[role='table']")
    expect(root?.getAttribute("aria-label")).toBe("Structured list")
  })

  it("has role=row on row elements", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createStructuredListHTML()}</body>`)
    const rows = dom.window.document.querySelectorAll("[role='row']")
    expect(rows.length).toBe(3)
  })

  it("has role=columnheader on header cells", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createStructuredListHTML()}</body>`)
    const headers = dom.window.document.querySelectorAll("[role='columnheader']")
    expect(headers.length).toBe(2)
    expect(headers[0].textContent).toBe("Name")
    expect(headers[1].textContent).toBe("Value")
  })

  it("has role=cell on data cells", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createStructuredListHTML()}</body>`)
    const cells = dom.window.document.querySelectorAll("[role='cell']")
    expect(cells.length).toBe(4)
  })

  it("has role=rowgroup on head and body", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createStructuredListHTML()}</body>`)
    const rowgroups = dom.window.document.querySelectorAll("[role='rowgroup']")
    expect(rowgroups.length).toBe(2)
  })

  it("selectable rows have tabindex for keyboard access", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createStructuredListHTML({ selectable: true })}</body>`,
    )
    const bodyRows = dom.window.document.querySelectorAll(
      ".pm-structured-list__body [role='row']",
    )
    bodyRows.forEach((row) => {
      expect(row.getAttribute("tabindex")).toBe("0")
    })
  })

  it("non-selectable rows do not have tabindex", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createStructuredListHTML({ selectable: false })}</body>`,
    )
    const bodyRows = dom.window.document.querySelectorAll(
      ".pm-structured-list__body [role='row']",
    )
    bodyRows.forEach((row) => {
      expect(row.hasAttribute("tabindex")).toBe(false)
    })
  })
})
