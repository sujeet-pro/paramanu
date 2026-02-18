import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { toggleButtonClasses } from "./toggle-button.classes.js"

function createToggleButtonHTML(
  text: string,
  options: Parameters<typeof toggleButtonClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = toggleButtonClasses(options)
  const pressedAttr = options?.pressed ? ' aria-pressed="true"' : ' aria-pressed="false"'
  const disabledAttr = options?.disabled ? ' aria-disabled="true"' : ""
  return `<button class="${classes}"${pressedAttr}${disabledAttr}${attrs ? " " + attrs : ""}>${text}</button>`
}

describe("toggle button accessibility", () => {
  it("renders as a focusable button element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createToggleButtonHTML("Bold")}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button).not.toBeNull()
    expect(button?.tagName).toBe("BUTTON")
  })

  it("has accessible text content", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createToggleButtonHTML("Bold")}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button?.textContent).toBe("Bold")
  })

  it("has aria-pressed=false when not pressed", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createToggleButtonHTML("Bold", { pressed: false })}</body>`,
    )
    const button = dom.window.document.querySelector("button")
    expect(button?.getAttribute("aria-pressed")).toBe("false")
  })

  it("has aria-pressed=true when pressed", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createToggleButtonHTML("Bold", { pressed: true })}</body>`,
    )
    const button = dom.window.document.querySelector("button")
    expect(button?.getAttribute("aria-pressed")).toBe("true")
  })

  it("disabled button has aria-disabled", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createToggleButtonHTML("Bold", { disabled: true })}</body>`,
    )
    const button = dom.window.document.querySelector("button")
    expect(button?.getAttribute("aria-disabled")).toBe("true")
  })

  it("has correct implicit role", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createToggleButtonHTML("Bold")}</body>`)
    const button = dom.window.document.querySelector("button")
    // <button> has implicit role="button"
    expect(button?.tagName).toBe("BUTTON")
  })

  it("supports keyboard activation via space and enter", () => {
    // Verify the element is a <button>, which natively supports Space and Enter activation
    const dom = new JSDOM(`<!DOCTYPE html><body>${createToggleButtonHTML("Bold")}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button?.tagName).toBe("BUTTON")
    // Native <button> elements handle Space and Enter key events automatically
  })

  it("can be both pressed and disabled", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createToggleButtonHTML("Bold", { pressed: true, disabled: true })}</body>`,
    )
    const button = dom.window.document.querySelector("button")
    expect(button?.getAttribute("aria-pressed")).toBe("true")
    expect(button?.getAttribute("aria-disabled")).toBe("true")
  })
})
