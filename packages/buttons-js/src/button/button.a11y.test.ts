import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { buttonClasses } from "./button.classes.js"

function createButtonHTML(
  text: string,
  options: Parameters<typeof buttonClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = buttonClasses(options)
  const disabledAttr = options?.disabled ? ' aria-disabled="true"' : ""
  return `<button class="${classes}"${disabledAttr}${attrs ? " " + attrs : ""}>${text}</button>`
}

describe("button accessibility", () => {
  it("renders as a focusable button element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createButtonHTML("Click me")}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button).not.toBeNull()
    expect(button?.tagName).toBe("BUTTON")
  })

  it("has accessible text content", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createButtonHTML("Submit")}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button?.textContent).toBe("Submit")
  })

  it("disabled button has aria-disabled", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createButtonHTML("Disabled", { disabled: true })}</body>`,
    )
    const button = dom.window.document.querySelector("button")
    expect(button?.getAttribute("aria-disabled")).toBe("true")
  })

  it("has correct implicit role", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createButtonHTML("Click")}</body>`)
    const button = dom.window.document.querySelector("button")
    // <button> has implicit role="button"
    expect(button?.tagName).toBe("BUTTON")
  })

  it("supports aria-label for icon buttons", () => {
    const html = createButtonHTML("X", {}, 'aria-label="Close dialog"')
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button?.getAttribute("aria-label")).toBe("Close dialog")
  })
})
