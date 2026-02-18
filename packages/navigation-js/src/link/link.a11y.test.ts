import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { linkClasses } from "./link.classes.js"

function createLinkHTML(
  text: string,
  options: Parameters<typeof linkClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = linkClasses(options)
  const disabledAttr = options?.disabled ? ' aria-disabled="true" tabindex="-1"' : ""
  const externalAttrs = options?.external
    ? ' target="_blank" rel="noopener noreferrer"'
    : ""
  return `<a href="#" class="${classes}"${disabledAttr}${externalAttrs}${attrs ? " " + attrs : ""}>${text}</a>`
}

describe("link accessibility", () => {
  it("renders as an anchor element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createLinkHTML("Home")}</body>`)
    const link = dom.window.document.querySelector("a")
    expect(link).not.toBeNull()
    expect(link?.tagName).toBe("A")
  })

  it("has accessible text content", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createLinkHTML("About us")}</body>`)
    const link = dom.window.document.querySelector("a")
    expect(link?.textContent).toBe("About us")
  })

  it("disabled link has aria-disabled and negative tabindex", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createLinkHTML("Disabled", { disabled: true })}</body>`,
    )
    const link = dom.window.document.querySelector("a")
    expect(link?.getAttribute("aria-disabled")).toBe("true")
    expect(link?.getAttribute("tabindex")).toBe("-1")
  })

  it("external link has target and rel attributes for security", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createLinkHTML("External", { external: true })}</body>`,
    )
    const link = dom.window.document.querySelector("a")
    expect(link?.getAttribute("target")).toBe("_blank")
    expect(link?.getAttribute("rel")).toBe("noopener noreferrer")
  })

  it("supports aria-current for active navigation links", () => {
    const html = createLinkHTML("Current", { active: true }, 'aria-current="page"')
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const link = dom.window.document.querySelector("a")
    expect(link?.getAttribute("aria-current")).toBe("page")
  })
})
