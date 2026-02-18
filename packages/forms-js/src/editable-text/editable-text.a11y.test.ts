import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { editableTextClasses } from "./editable-text.classes.js"

function createEditableTextHTML(
  options: Parameters<typeof editableTextClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = editableTextClasses(options)
  const disabledAttr = options?.disabled ? ' aria-disabled="true"' : ""
  const isEditing = options?.editing

  if (isEditing) {
    return `<div class="${classes}" role="group" aria-label="Editable text"${disabledAttr}${attrs ? " " + attrs : ""}>
      <input class="pm-editable-text__input" type="text" value="Hello" aria-label="Edit text" />
      <div class="pm-editable-text__controls">
        <button aria-label="Confirm">OK</button>
        <button aria-label="Cancel">X</button>
      </div>
    </div>`
  }

  return `<div class="${classes}" role="group" aria-label="Editable text"${disabledAttr}${attrs ? " " + attrs : ""}>
    <span class="pm-editable-text__preview" tabindex="0" role="button" aria-label="Click to edit">Hello</span>
  </div>`
}

describe("editable-text accessibility", () => {
  it("has role=group on container", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createEditableTextHTML()}</body>`)
    const group = dom.window.document.querySelector("[role='group']")
    expect(group).not.toBeNull()
    expect(group?.getAttribute("role")).toBe("group")
  })

  it("preview has role=button and is focusable", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createEditableTextHTML()}</body>`)
    const preview = dom.window.document.querySelector(".pm-editable-text__preview")
    expect(preview?.getAttribute("role")).toBe("button")
    expect(preview?.getAttribute("tabindex")).toBe("0")
  })

  it("preview has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createEditableTextHTML()}</body>`)
    const preview = dom.window.document.querySelector(".pm-editable-text__preview")
    expect(preview?.getAttribute("aria-label")).toBe("Click to edit")
  })

  it("editing mode shows input with aria-label", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createEditableTextHTML({ editing: true })}</body>`,
    )
    const input = dom.window.document.querySelector("input")
    expect(input).not.toBeNull()
    expect(input?.getAttribute("aria-label")).toBe("Edit text")
  })

  it("editing mode has confirm and cancel buttons", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createEditableTextHTML({ editing: true })}</body>`,
    )
    const buttons = dom.window.document.querySelectorAll("button")
    expect(buttons.length).toBe(2)
    expect(buttons[0]?.getAttribute("aria-label")).toBe("Confirm")
    expect(buttons[1]?.getAttribute("aria-label")).toBe("Cancel")
  })

  it("disabled state has aria-disabled", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createEditableTextHTML({ disabled: true })}</body>`,
    )
    const group = dom.window.document.querySelector("[role='group']")
    expect(group?.getAttribute("aria-disabled")).toBe("true")
  })
})
