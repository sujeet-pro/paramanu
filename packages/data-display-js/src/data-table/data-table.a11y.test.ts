import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { dataTableClasses, dataTableHeaderCellClasses } from "./data-table.classes.js"

describe("data-table accessibility", () => {
  it("renders with table structure inside wrapper", () => {
    const classes = dataTableClasses()
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <div class="${classes.root}">
        <table class="${classes.table}">
          <thead><tr><th class="${classes.headerCell}">Name</th></tr></thead>
          <tbody><tr class="${classes.row}"><td class="${classes.cell}">Alice</td></tr></tbody>
        </table>
      </div>
    </body>`)
    const table = dom.window.document.querySelector("table")
    expect(table).not.toBeNull()
    const th = dom.window.document.querySelector("th")
    expect(th?.textContent).toBe("Name")
  })

  it("sortable header has aria-sort attribute", () => {
    const headerClasses = dataTableHeaderCellClasses({ sortable: true, sortDirection: "asc" })
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <table>
        <thead><tr><th class="${headerClasses}" aria-sort="ascending">Name</th></tr></thead>
      </table>
    </body>`)
    const th = dom.window.document.querySelector("th")
    expect(th?.getAttribute("aria-sort")).toBe("ascending")
  })

  it("unsorted sortable header has aria-sort=none", () => {
    const headerClasses = dataTableHeaderCellClasses({ sortable: true })
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <table>
        <thead><tr><th class="${headerClasses}" aria-sort="none">Name</th></tr></thead>
      </table>
    </body>`)
    const th = dom.window.document.querySelector("th")
    expect(th?.getAttribute("aria-sort")).toBe("none")
  })

  it("data table can have a caption for context", () => {
    const classes = dataTableClasses()
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <div class="${classes.root}">
        <table class="${classes.table}">
          <caption>List of users</caption>
          <thead><tr><th class="${classes.headerCell}">Name</th></tr></thead>
        </table>
      </div>
    </body>`)
    const caption = dom.window.document.querySelector("caption")
    expect(caption?.textContent).toBe("List of users")
  })
})
