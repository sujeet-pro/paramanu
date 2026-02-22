import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { tagsInputClasses } from "./tags-input.classes.js"

function createTagsInputHTML(
  options: Parameters<typeof tagsInputClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = tagsInputClasses(options)
  const disabledAttr = options?.disabled ? ' aria-disabled="true"' : ""
  const invalidAttr = options?.invalid ? ' aria-invalid="true"' : ""
  return `<div class="${classes}" role="group" aria-label="Tags"${disabledAttr}${invalidAttr}${attrs ? " " + attrs : ""}>
    <span class="pm-tags-input__tag">
      <span class="pm-tags-input__tag-label">React</span>
      <button class="pm-tags-input__tag-close" aria-label="Remove React"${options?.disabled ? " disabled" : ""}>x</button>
    </span>
    <input class="pm-tags-input__field" type="text" aria-label="Add tag" placeholder="Add tag..."${options?.disabled ? " disabled" : ""} />
  </div>`
}

describe("tags-input accessibility", () => {
  it("has role=group on container", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTagsInputHTML()}</body>`)
    const group = dom.window.document.querySelector("[role='group']")
    expect(group).not.toBeNull()
    expect(group?.getAttribute("role")).toBe("group")
  })

  it("has aria-label on container", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTagsInputHTML()}</body>`)
    const group = dom.window.document.querySelector("[role='group']")
    expect(group?.getAttribute("aria-label")).toBe("Tags")
  })

  it("tag close button has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTagsInputHTML()}</body>`)
    const closeBtn = dom.window.document.querySelector(".pm-tags-input__tag-close")
    expect(closeBtn?.getAttribute("aria-label")).toBe("Remove React")
  })

  it("input field has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTagsInputHTML()}</body>`)
    const input = dom.window.document.querySelector("input")
    expect(input?.getAttribute("aria-label")).toBe("Add tag")
  })

  it("disabled container has aria-disabled", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTagsInputHTML({ disabled: true })}</body>`)
    const group = dom.window.document.querySelector("[role='group']")
    expect(group?.getAttribute("aria-disabled")).toBe("true")
  })

  it("disabled input has disabled attribute", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTagsInputHTML({ disabled: true })}</body>`)
    const input = dom.window.document.querySelector("input")
    expect(input?.hasAttribute("disabled")).toBe(true)
  })

  it("invalid container has aria-invalid", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTagsInputHTML({ invalid: true })}</body>`)
    const group = dom.window.document.querySelector("[role='group']")
    expect(group?.getAttribute("aria-invalid")).toBe("true")
  })
})
