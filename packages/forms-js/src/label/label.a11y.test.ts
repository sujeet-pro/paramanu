import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { labelClasses } from "./label.classes.js"

function createLabelHTML(
  text: string,
  options: Parameters<typeof labelClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = labelClasses(options)
  return `<label class="${classes}"${attrs ? " " + attrs : ""}>${text}</label>`
}

describe("label accessibility", () => {
  it("renders as a label element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createLabelHTML("Name")}</body>`)
    const label = dom.window.document.querySelector("label")
    expect(label).not.toBeNull()
    expect(label?.tagName).toBe("LABEL")
  })

  it("has accessible text content", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createLabelHTML("Email address")}</body>`)
    const label = dom.window.document.querySelector("label")
    expect(label?.textContent).toBe("Email address")
  })

  it("supports htmlFor attribute", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createLabelHTML("Username", {}, 'for="username-input"')}</body>`,
    )
    const label = dom.window.document.querySelector("label")
    expect(label?.getAttribute("for")).toBe("username-input")
  })

  it("has required indicator via CSS class", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createLabelHTML("Password", { required: true })}</body>`,
    )
    const label = dom.window.document.querySelector("label")
    expect(label?.className).toContain("pm-label--required")
  })

  it("disabled label has disabled class", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createLabelHTML("Disabled field", { disabled: true })}</body>`,
    )
    const label = dom.window.document.querySelector("label")
    expect(label?.className).toContain("pm-label--disabled")
  })
})
