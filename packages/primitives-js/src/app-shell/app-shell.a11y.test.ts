import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import {
  shellClasses,
  appShellHeaderClasses,
  appShellSidebarClasses,
  appShellMainClasses,
  appShellFooterClasses,
} from "./app-shell.classes.js"

function createShellHTML(options: {
  sidebarPosition?: "start" | "end"
  sticky?: boolean
  sidebarWidth?: "sm" | "md" | "lg"
} = {}): string {
  const containerClasses = shellClasses({ sidebarPosition: options.sidebarPosition })
  const headerClasses = appShellHeaderClasses({ sticky: options.sticky })
  const sidebarClasses = appShellSidebarClasses({ width: options.sidebarWidth })
  const mainClasses = appShellMainClasses()
  const footerClasses = appShellFooterClasses()

  return `
    <div class="${containerClasses}">
      <header class="${headerClasses}">Header</header>
      <aside class="${sidebarClasses}">Sidebar Navigation</aside>
      <main class="${mainClasses}">Main Content</main>
      <footer class="${footerClasses}">Footer</footer>
    </div>
  `
}

describe("app-shell accessibility", () => {
  it("header renders in a semantic header element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createShellHTML()}</body>`)
    const header = dom.window.document.querySelector("header")
    expect(header).not.toBeNull()
    expect(header?.tagName).toBe("HEADER")
    expect(header?.className).toContain("pm-shell__header")
  })

  it("sidebar renders in a semantic aside element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createShellHTML()}</body>`)
    const aside = dom.window.document.querySelector("aside")
    expect(aside).not.toBeNull()
    expect(aside?.tagName).toBe("ASIDE")
    expect(aside?.className).toContain("pm-shell__sidebar")
  })

  it("main content renders in a semantic main element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createShellHTML()}</body>`)
    const main = dom.window.document.querySelector("main")
    expect(main).not.toBeNull()
    expect(main?.tagName).toBe("MAIN")
    expect(main?.className).toContain("pm-shell__main")
  })

  it("footer renders in a semantic footer element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createShellHTML()}</body>`)
    const footer = dom.window.document.querySelector("footer")
    expect(footer).not.toBeNull()
    expect(footer?.tagName).toBe("FOOTER")
    expect(footer?.className).toContain("pm-shell__footer")
  })

  it("all landmark elements are present in the shell", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createShellHTML()}</body>`)
    const doc = dom.window.document
    expect(doc.querySelector("header")).not.toBeNull()
    expect(doc.querySelector("aside")).not.toBeNull()
    expect(doc.querySelector("main")).not.toBeNull()
    expect(doc.querySelector("footer")).not.toBeNull()
  })

  it("landmarks are direct children of the app shell container", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createShellHTML()}</body>`)
    const container = dom.window.document.querySelector(".pm-shell")
    expect(container).not.toBeNull()
    const header = container?.querySelector(":scope > header")
    const aside = container?.querySelector(":scope > aside")
    const main = container?.querySelector(":scope > main")
    const footer = container?.querySelector(":scope > footer")
    expect(header).not.toBeNull()
    expect(aside).not.toBeNull()
    expect(main).not.toBeNull()
    expect(footer).not.toBeNull()
  })

  it("only one main element exists", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createShellHTML()}</body>`)
    const mains = dom.window.document.querySelectorAll("main")
    expect(mains.length).toBe(1)
  })
})
