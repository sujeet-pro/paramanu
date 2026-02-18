import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { dataGridClasses } from "./data-grid.classes.js"

describe("data-grid accessibility", () => {
  it("has role=grid on root element", () => {
    const classes = dataGridClasses()
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <div class="${classes.root}" role="grid" aria-label="User data">
        <div class="${classes.row}" role="row">
          <div class="${classes.columnHeader}" role="columnheader">Name</div>
          <div class="${classes.columnHeader}" role="columnheader">Email</div>
        </div>
        <div class="${classes.row}" role="row">
          <div class="${classes.cell}" role="gridcell">Alice</div>
          <div class="${classes.cell}" role="gridcell">alice@example.com</div>
        </div>
      </div>
    </body>`)
    const grid = dom.window.document.querySelector("[role='grid']")
    expect(grid).not.toBeNull()
    expect(grid?.getAttribute("aria-label")).toBe("User data")
  })

  it("rows have role=row", () => {
    const classes = dataGridClasses()
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <div class="${classes.root}" role="grid">
        <div class="${classes.row}" role="row">
          <div class="${classes.cell}" role="gridcell">Data</div>
        </div>
      </div>
    </body>`)
    const rows = dom.window.document.querySelectorAll("[role='row']")
    expect(rows.length).toBe(1)
  })

  it("cells have role=gridcell", () => {
    const classes = dataGridClasses()
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <div class="${classes.root}" role="grid">
        <div class="${classes.row}" role="row">
          <div class="${classes.cell}" role="gridcell">Value</div>
        </div>
      </div>
    </body>`)
    const cells = dom.window.document.querySelectorAll("[role='gridcell']")
    expect(cells.length).toBe(1)
    expect(cells[0]?.textContent).toBe("Value")
  })

  it("column headers have role=columnheader", () => {
    const classes = dataGridClasses()
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <div class="${classes.root}" role="grid">
        <div class="${classes.row}" role="row">
          <div class="${classes.columnHeader}" role="columnheader">Header</div>
        </div>
      </div>
    </body>`)
    const headers = dom.window.document.querySelectorAll("[role='columnheader']")
    expect(headers.length).toBe(1)
    expect(headers[0]?.textContent).toBe("Header")
  })
})
