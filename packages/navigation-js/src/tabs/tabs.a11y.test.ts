import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { tabsClasses, tabListClasses, tabClasses, tabPanelClasses } from "./tabs.classes.js"

function createTabsHTML(
  tabs: Array<{ label: string; id: string; active?: boolean; disabled?: boolean }>,
  options?: Parameters<typeof tabsClasses>[0],
): string {
  const rootClasses = tabsClasses(options)
  const listClasses = tabListClasses()
  const tabBtns = tabs
    .map((tab) => {
      const cls = tabClasses({ active: tab.active, disabled: tab.disabled })
      const selected = tab.active ? "true" : "false"
      const disabledAttr = tab.disabled ? ' aria-disabled="true"' : ""
      return `<button role="tab" class="${cls}" aria-selected="${selected}" aria-controls="panel-${tab.id}" id="tab-${tab.id}"${disabledAttr}>${tab.label}</button>`
    })
    .join("")
  const panels = tabs
    .map((tab) => {
      const cls = tabPanelClasses()
      const hidden = tab.active ? "" : ' hidden'
      return `<div role="tabpanel" class="${cls}" id="panel-${tab.id}" aria-labelledby="tab-${tab.id}"${hidden}>Content for ${tab.label}</div>`
    })
    .join("")
  return `<div class="${rootClasses}"><div role="tablist" class="${listClasses}">${tabBtns}</div>${panels}</div>`
}

describe("tabs accessibility", () => {
  it("uses tablist role on the list container", () => {
    const html = createTabsHTML([{ label: "Tab 1", id: "1", active: true }])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const tablist = dom.window.document.querySelector("[role='tablist']")
    expect(tablist).not.toBeNull()
  })

  it("uses tab role on tab buttons", () => {
    const html = createTabsHTML([
      { label: "Tab 1", id: "1", active: true },
      { label: "Tab 2", id: "2" },
    ])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const tabs = dom.window.document.querySelectorAll("[role='tab']")
    expect(tabs.length).toBe(2)
  })

  it("sets aria-selected on active tab", () => {
    const html = createTabsHTML([
      { label: "Tab 1", id: "1", active: true },
      { label: "Tab 2", id: "2" },
    ])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const activeTab = dom.window.document.querySelector("#tab-1")
    const inactiveTab = dom.window.document.querySelector("#tab-2")
    expect(activeTab?.getAttribute("aria-selected")).toBe("true")
    expect(inactiveTab?.getAttribute("aria-selected")).toBe("false")
  })

  it("links tabs to panels with aria-controls", () => {
    const html = createTabsHTML([{ label: "Tab 1", id: "1", active: true }])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const tab = dom.window.document.querySelector("[role='tab']")
    const panelId = tab?.getAttribute("aria-controls")
    expect(panelId).toBe("panel-1")
    const panel = dom.window.document.querySelector(`#${panelId}`)
    expect(panel).not.toBeNull()
  })

  it("uses tabpanel role on panels", () => {
    const html = createTabsHTML([{ label: "Tab 1", id: "1", active: true }])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const panel = dom.window.document.querySelector("[role='tabpanel']")
    expect(panel).not.toBeNull()
  })

  it("links panels back to tabs with aria-labelledby", () => {
    const html = createTabsHTML([{ label: "Tab 1", id: "1", active: true }])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const panel = dom.window.document.querySelector("[role='tabpanel']")
    expect(panel?.getAttribute("aria-labelledby")).toBe("tab-1")
  })

  it("disabled tab has aria-disabled", () => {
    const html = createTabsHTML([{ label: "Tab 1", id: "1", disabled: true }])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const tab = dom.window.document.querySelector("[role='tab']")
    expect(tab?.getAttribute("aria-disabled")).toBe("true")
  })

  it("inactive panels are hidden", () => {
    const html = createTabsHTML([
      { label: "Tab 1", id: "1", active: true },
      { label: "Tab 2", id: "2" },
    ])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const activePanel = dom.window.document.querySelector("#panel-1")
    const inactivePanel = dom.window.document.querySelector("#panel-2")
    expect(activePanel?.hasAttribute("hidden")).toBe(false)
    expect(inactivePanel?.hasAttribute("hidden")).toBe(true)
  })
})
