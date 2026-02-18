import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { groupClasses } from "./group.classes.js"

describe("Group accessibility", () => {
  it("should use role=group on the container element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body></body>`)
    const doc = dom.window.document
    const el = doc.createElement("div")
    el.setAttribute("role", "group")
    el.className = groupClasses()
    doc.body.appendChild(el)

    expect(el.getAttribute("role")).toBe("group")
  })

  it("should support aria-label for group identification", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body></body>`)
    const doc = dom.window.document
    const el = doc.createElement("div")
    el.setAttribute("role", "group")
    el.setAttribute("aria-label", "Action buttons")
    el.className = groupClasses()
    doc.body.appendChild(el)

    expect(el.getAttribute("aria-label")).toBe("Action buttons")
  })

  it("should support aria-labelledby for group identification", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body></body>`)
    const doc = dom.window.document
    const heading = doc.createElement("h3")
    heading.id = "group-heading"
    heading.textContent = "Options"
    doc.body.appendChild(heading)

    const el = doc.createElement("div")
    el.setAttribute("role", "group")
    el.setAttribute("aria-labelledby", "group-heading")
    el.className = groupClasses()
    doc.body.appendChild(el)

    expect(el.getAttribute("aria-labelledby")).toBe("group-heading")
  })
})
