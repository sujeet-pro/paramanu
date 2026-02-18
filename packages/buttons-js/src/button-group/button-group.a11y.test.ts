import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { buttonGroupClasses } from "./button-group.classes.js"

function createButtonGroupHTML(
  buttons: string[],
  options: Parameters<typeof buttonGroupClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = buttonGroupClasses(options)
  const buttonsHtml = buttons.map((label) => `<button class="pm-button">${label}</button>`).join("")
  return `<div class="${classes}" role="group"${attrs ? " " + attrs : ""}>${buttonsHtml}</div>`
}

describe("button group accessibility", () => {
  it("renders with role=group", () => {
    const html = createButtonGroupHTML(["A", "B"])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const group = dom.window.document.querySelector('[role="group"]')
    expect(group).not.toBeNull()
  })

  it("contains focusable button elements", () => {
    const html = createButtonGroupHTML(["Save", "Cancel"])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const buttons = dom.window.document.querySelectorAll("button")
    expect(buttons.length).toBe(2)
    expect(buttons[0].textContent).toBe("Save")
    expect(buttons[1].textContent).toBe("Cancel")
  })

  it("supports aria-label for group description", () => {
    const html = createButtonGroupHTML(["Bold", "Italic"], {}, 'aria-label="Text formatting"')
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const group = dom.window.document.querySelector('[role="group"]')
    expect(group?.getAttribute("aria-label")).toBe("Text formatting")
  })

  it("renders as a div container (non-interactive)", () => {
    const html = createButtonGroupHTML(["A"])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const group = dom.window.document.querySelector('[role="group"]')
    expect(group?.tagName).toBe("DIV")
  })
})
