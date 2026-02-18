import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { splitterClasses, splitterPanelClasses, splitterHandleClasses } from "./splitter.classes.js"

function createSplitterHTML(orientation: "horizontal" | "vertical" = "horizontal"): string {
  const containerClasses = splitterClasses({ orientation })
  const panelClasses = splitterPanelClasses()
  const handleClasses = splitterHandleClasses({ orientation })

  return `
    <div class="${containerClasses}">
      <div class="${panelClasses}" style="width: 50%;">Panel 1</div>
      <div
        class="${handleClasses}"
        role="separator"
        tabindex="0"
        aria-valuenow="50"
        aria-valuemin="0"
        aria-valuemax="100"
        aria-orientation="${orientation}"
      ></div>
      <div class="${panelClasses}" style="width: 50%;">Panel 2</div>
    </div>
  `
}

describe("splitter accessibility", () => {
  it("handle has role=separator", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSplitterHTML()}</body>`)
    const handle = dom.window.document.querySelector('[role="separator"]')
    expect(handle).not.toBeNull()
  })

  it("handle has tabindex=0 for keyboard access", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSplitterHTML()}</body>`)
    const handle = dom.window.document.querySelector('[role="separator"]')
    expect(handle?.getAttribute("tabindex")).toBe("0")
  })

  it("handle has aria-valuenow", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSplitterHTML()}</body>`)
    const handle = dom.window.document.querySelector('[role="separator"]')
    expect(handle?.getAttribute("aria-valuenow")).toBe("50")
  })

  it("handle has aria-valuemin", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSplitterHTML()}</body>`)
    const handle = dom.window.document.querySelector('[role="separator"]')
    expect(handle?.getAttribute("aria-valuemin")).toBe("0")
  })

  it("handle has aria-valuemax", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSplitterHTML()}</body>`)
    const handle = dom.window.document.querySelector('[role="separator"]')
    expect(handle?.getAttribute("aria-valuemax")).toBe("100")
  })

  it("handle has aria-orientation for horizontal splitter", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSplitterHTML("horizontal")}</body>`)
    const handle = dom.window.document.querySelector('[role="separator"]')
    expect(handle?.getAttribute("aria-orientation")).toBe("horizontal")
  })

  it("handle has aria-orientation for vertical splitter", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSplitterHTML("vertical")}</body>`)
    const handle = dom.window.document.querySelector('[role="separator"]')
    expect(handle?.getAttribute("aria-orientation")).toBe("vertical")
  })

  it("handle is focusable for keyboard navigation", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSplitterHTML()}</body>`)
    const handle = dom.window.document.querySelector('[role="separator"]')
    expect(handle).not.toBeNull()
    expect(handle?.getAttribute("tabindex")).toBe("0")
  })

  it("panels are accessible as generic content regions", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSplitterHTML()}</body>`)
    const panels = dom.window.document.querySelectorAll(".pm-splitter__panel")
    expect(panels.length).toBe(2)
  })

  it("splitter container contains both panels and a handle", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSplitterHTML()}</body>`)
    const container = dom.window.document.querySelector(".pm-splitter")
    expect(container).not.toBeNull()
    const panels = container?.querySelectorAll(".pm-splitter__panel")
    const handles = container?.querySelectorAll('[role="separator"]')
    expect(panels?.length).toBe(2)
    expect(handles?.length).toBe(1)
  })
})
