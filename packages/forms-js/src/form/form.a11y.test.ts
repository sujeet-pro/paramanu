import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { formClasses } from "./form.classes.js"

function createFormHTML(
  content: string,
  options: Parameters<typeof formClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = formClasses(options)
  return `<form class="${classes}"${attrs ? " " + attrs : ""}>${content}</form>`
}

describe("form accessibility", () => {
  it("renders as a form element", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createFormHTML("<input />")}</body>`,
    )
    const form = dom.window.document.querySelector("form")
    expect(form).not.toBeNull()
    expect(form?.tagName).toBe("FORM")
  })

  it("has implicit form role", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createFormHTML("<input />")}</body>`,
    )
    const form = dom.window.document.querySelector("form")
    expect(form?.tagName).toBe("FORM")
  })

  it("supports aria-label for accessible name", () => {
    const html = createFormHTML("<input />", {}, 'aria-label="Contact form"')
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const form = dom.window.document.querySelector("form")
    expect(form?.getAttribute("aria-label")).toBe("Contact form")
  })

  it("supports aria-labelledby for accessible name", () => {
    const html = `<h2 id="form-title">Registration</h2>${createFormHTML("<input />", {}, 'aria-labelledby="form-title"')}`
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const form = dom.window.document.querySelector("form")
    expect(form?.getAttribute("aria-labelledby")).toBe("form-title")
  })

  it("supports novalidate attribute", () => {
    const html = createFormHTML("<input />", {}, "novalidate")
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const form = dom.window.document.querySelector("form")
    expect(form?.hasAttribute("novalidate")).toBe(true)
  })
})
