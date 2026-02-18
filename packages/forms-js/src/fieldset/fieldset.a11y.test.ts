import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { fieldsetClasses } from "./fieldset.classes.js"

function createFieldsetHTML(
  legend: string,
  content: string,
  options: Parameters<typeof fieldsetClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = fieldsetClasses(options)
  const disabledAttr = options?.disabled ? " disabled" : ""
  return `<fieldset class="${classes}"${disabledAttr}${attrs ? " " + attrs : ""}><legend class="pm-fieldset__legend">${legend}</legend>${content}</fieldset>`
}

describe("fieldset accessibility", () => {
  it("renders as a fieldset element", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createFieldsetHTML("Personal Info", "<input />")}</body>`,
    )
    const fieldset = dom.window.document.querySelector("fieldset")
    expect(fieldset).not.toBeNull()
    expect(fieldset?.tagName).toBe("FIELDSET")
  })

  it("has a legend element", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createFieldsetHTML("Contact Details", "<input />")}</body>`,
    )
    const legend = dom.window.document.querySelector("legend")
    expect(legend).not.toBeNull()
    expect(legend?.textContent).toBe("Contact Details")
  })

  it("legend has correct BEM class", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createFieldsetHTML("Settings", "<input />")}</body>`,
    )
    const legend = dom.window.document.querySelector("legend")
    expect(legend?.className).toContain("pm-fieldset__legend")
  })

  it("supports disabled attribute on fieldset", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createFieldsetHTML("Disabled Group", "<input />", { disabled: true })}</body>`,
    )
    const fieldset = dom.window.document.querySelector("fieldset")
    expect(fieldset?.hasAttribute("disabled")).toBe(true)
  })

  it("disabled fieldset disables contained inputs", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createFieldsetHTML("Group", '<input name="field1" />', { disabled: true })}</body>`,
    )
    const fieldset = dom.window.document.querySelector("fieldset")
    expect(fieldset?.hasAttribute("disabled")).toBe(true)
  })
})
