import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { toggleGroupClasses, toggleGroupItemClasses } from "./toggle-group.classes.js"

function createToggleGroupHTML(
  items: { label: string; pressed?: boolean; disabled?: boolean }[],
  groupOptions: Parameters<typeof toggleGroupClasses>[0] = {},
  attrs: string = "",
): string {
  const groupClassStr = toggleGroupClasses(groupOptions)
  const itemsHtml = items
    .map((item) => {
      const itemClassStr = toggleGroupItemClasses({
        size: groupOptions?.size,
        pressed: item.pressed,
        disabled: item.disabled,
      })
      const pressedAttr = item.pressed ? ' aria-pressed="true"' : ' aria-pressed="false"'
      const disabledAttr = item.disabled ? ' aria-disabled="true"' : ""
      return `<button class="${itemClassStr}"${pressedAttr}${disabledAttr}>${item.label}</button>`
    })
    .join("")
  return `<div class="${groupClassStr}" role="group"${attrs ? " " + attrs : ""}>${itemsHtml}</div>`
}

describe("toggle group accessibility", () => {
  it("renders with role=group", () => {
    const html = createToggleGroupHTML([{ label: "Bold" }, { label: "Italic" }])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const group = dom.window.document.querySelector('[role="group"]')
    expect(group).not.toBeNull()
  })

  it("supports aria-label for group description", () => {
    const html = createToggleGroupHTML(
      [{ label: "Bold" }, { label: "Italic" }],
      {},
      'aria-label="Text formatting"',
    )
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const group = dom.window.document.querySelector('[role="group"]')
    expect(group?.getAttribute("aria-label")).toBe("Text formatting")
  })

  it("contains focusable button elements", () => {
    const html = createToggleGroupHTML([{ label: "Bold" }, { label: "Italic" }])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const buttons = dom.window.document.querySelectorAll("button")
    expect(buttons.length).toBe(2)
    expect(buttons[0].textContent).toBe("Bold")
    expect(buttons[1].textContent).toBe("Italic")
  })

  it("items have aria-pressed attribute", () => {
    const html = createToggleGroupHTML([
      { label: "Bold", pressed: true },
      { label: "Italic", pressed: false },
    ])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const buttons = dom.window.document.querySelectorAll("button")
    expect(buttons[0].getAttribute("aria-pressed")).toBe("true")
    expect(buttons[1].getAttribute("aria-pressed")).toBe("false")
  })

  it("disabled items have aria-disabled", () => {
    const html = createToggleGroupHTML([{ label: "Bold", disabled: true }])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const button = dom.window.document.querySelector("button")
    expect(button?.getAttribute("aria-disabled")).toBe("true")
  })

  it("renders as a div container (non-interactive)", () => {
    const html = createToggleGroupHTML([{ label: "A" }])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const group = dom.window.document.querySelector('[role="group"]')
    expect(group?.tagName).toBe("DIV")
  })
})
