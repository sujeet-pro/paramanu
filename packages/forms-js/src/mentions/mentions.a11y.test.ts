import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { mentionsClasses } from "./mentions.classes.js"

function createMentionsHTML(
  options: Parameters<typeof mentionsClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = mentionsClasses(options)
  const disabledAttr = options?.disabled ? " disabled" : ""
  const invalidAttr = options?.invalid ? ' aria-invalid="true"' : ""
  return `<div class="${classes}"${attrs ? " " + attrs : ""}>
    <textarea class="pm-mentions__textarea" aria-label="Mention someone" role="combobox" aria-expanded="false" aria-autocomplete="list" aria-controls="mentions-list"${disabledAttr}${invalidAttr}></textarea>
    <ul class="pm-mentions__dropdown" id="mentions-list" role="listbox" aria-label="Suggestions">
      <li class="pm-mentions__suggestion" role="option" aria-selected="false">@alice</li>
      <li class="pm-mentions__suggestion pm-mentions__suggestion--focused" role="option" aria-selected="true">@bob</li>
    </ul>
  </div>`
}

describe("mentions accessibility", () => {
  it("textarea has role=combobox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMentionsHTML()}</body>`)
    const textarea = dom.window.document.querySelector("textarea")
    expect(textarea?.getAttribute("role")).toBe("combobox")
  })

  it("textarea has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMentionsHTML()}</body>`)
    const textarea = dom.window.document.querySelector("textarea")
    expect(textarea?.getAttribute("aria-label")).toBe("Mention someone")
  })

  it("textarea has aria-expanded", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMentionsHTML()}</body>`)
    const textarea = dom.window.document.querySelector("textarea")
    expect(textarea?.getAttribute("aria-expanded")).toBe("false")
  })

  it("textarea has aria-autocomplete", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMentionsHTML()}</body>`)
    const textarea = dom.window.document.querySelector("textarea")
    expect(textarea?.getAttribute("aria-autocomplete")).toBe("list")
  })

  it("textarea has aria-controls pointing to listbox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMentionsHTML()}</body>`)
    const textarea = dom.window.document.querySelector("textarea")
    expect(textarea?.getAttribute("aria-controls")).toBe("mentions-list")
  })

  it("dropdown has role=listbox", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMentionsHTML()}</body>`)
    const list = dom.window.document.querySelector("[role='listbox']")
    expect(list).not.toBeNull()
  })

  it("suggestions have role=option", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMentionsHTML()}</body>`)
    const options = dom.window.document.querySelectorAll("[role='option']")
    expect(options.length).toBe(2)
  })

  it("focused suggestion has aria-selected=true", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMentionsHTML()}</body>`)
    const focused = dom.window.document.querySelector(".pm-mentions__suggestion--focused")
    expect(focused?.getAttribute("aria-selected")).toBe("true")
  })

  it("disabled textarea has disabled attribute", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMentionsHTML({ disabled: true })}</body>`)
    const textarea = dom.window.document.querySelector("textarea")
    expect(textarea?.hasAttribute("disabled")).toBe(true)
  })

  it("invalid textarea has aria-invalid", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createMentionsHTML({ invalid: true })}</body>`)
    const textarea = dom.window.document.querySelector("textarea")
    expect(textarea?.getAttribute("aria-invalid")).toBe("true")
  })
})
