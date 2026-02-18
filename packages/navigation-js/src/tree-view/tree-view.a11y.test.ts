import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import {
  treeViewClasses,
  treeViewBranchClasses,
  treeViewItemClasses,
  treeViewItemContentClasses,
  treeViewIndicatorClasses,
  treeViewGroupClasses,
} from "./tree-view.classes.js"

function createTreeViewHTML(): string {
  const rootClasses = treeViewClasses()
  const branchClasses = treeViewBranchClasses({ expanded: true })
  const itemClasses = treeViewItemClasses()
  const selectedClasses = treeViewItemClasses({ selected: true })
  const disabledClasses = treeViewItemClasses({ disabled: true })
  const contentClasses = treeViewItemContentClasses()
  const indicatorClasses = treeViewIndicatorClasses({ expanded: true })
  const groupClasses = treeViewGroupClasses()

  return `<ul role="tree" aria-label="File explorer" class="${rootClasses}">
    <li role="treeitem" aria-expanded="true" class="${branchClasses}">
      <div class="${contentClasses}" tabindex="0">
        <span class="${indicatorClasses}" aria-hidden="true"></span>
        <span>Documents</span>
      </div>
      <ul role="group" class="${groupClasses}">
        <li role="treeitem" class="${selectedClasses}">
          <div class="${contentClasses}" tabindex="0" aria-selected="true">
            <span>Resume.pdf</span>
          </div>
        </li>
        <li role="treeitem" class="${itemClasses}">
          <div class="${contentClasses}" tabindex="-1">
            <span>Cover.pdf</span>
          </div>
        </li>
        <li role="treeitem" class="${disabledClasses}">
          <div class="${contentClasses}" aria-disabled="true" tabindex="-1">
            <span>Locked.pdf</span>
          </div>
        </li>
      </ul>
    </li>
  </ul>`
}

describe("tree-view accessibility", () => {
  it("uses ul with role=tree", () => {
    const html = createTreeViewHTML()
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const tree = dom.window.document.querySelector("[role='tree']")
    expect(tree).not.toBeNull()
    expect(tree?.tagName).toBe("UL")
  })

  it("has aria-label on tree root", () => {
    const html = createTreeViewHTML()
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const tree = dom.window.document.querySelector("[role='tree']")
    expect(tree?.getAttribute("aria-label")).toBe("File explorer")
  })

  it("uses role=treeitem on items", () => {
    const html = createTreeViewHTML()
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const items = dom.window.document.querySelectorAll("[role='treeitem']")
    expect(items.length).toBe(4)
  })

  it("branch has aria-expanded", () => {
    const html = createTreeViewHTML()
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const branch = dom.window.document.querySelector("[aria-expanded]")
    expect(branch).not.toBeNull()
    expect(branch?.getAttribute("aria-expanded")).toBe("true")
  })

  it("uses role=group for nested lists", () => {
    const html = createTreeViewHTML()
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const group = dom.window.document.querySelector("[role='group']")
    expect(group).not.toBeNull()
    expect(group?.tagName).toBe("UL")
  })

  it("selected item has aria-selected", () => {
    const html = createTreeViewHTML()
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const selected = dom.window.document.querySelector("[aria-selected='true']")
    expect(selected).not.toBeNull()
  })

  it("disabled item has aria-disabled", () => {
    const html = createTreeViewHTML()
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const disabled = dom.window.document.querySelector("[aria-disabled='true']")
    expect(disabled).not.toBeNull()
  })

  it("indicator is hidden from assistive technology", () => {
    const html = createTreeViewHTML()
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const indicator = dom.window.document.querySelector("[aria-hidden='true']")
    expect(indicator).not.toBeNull()
  })
})
