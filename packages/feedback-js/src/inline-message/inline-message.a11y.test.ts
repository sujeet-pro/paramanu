import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { inlineMessageClasses } from "./inline-message.classes.js"

function createInlineMessageHTML(
  text: string,
  options: Parameters<typeof inlineMessageClasses>[0] = {},
): string {
  const classes = inlineMessageClasses(options)
  const variant = options?.variant ?? "info"
  const role = variant === "warning" || variant === "danger" ? "alert" : "status"
  return `<div class="${classes}" role="${role}">${text}</div>`
}

describe("inline message accessibility", () => {
  it("has role=status for info variant", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createInlineMessageHTML("Info message")}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-inline-message")
    expect(el?.getAttribute("role")).toBe("status")
  })

  it("has role=status for success variant", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createInlineMessageHTML("Success", { variant: "success" })}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-inline-message")
    expect(el?.getAttribute("role")).toBe("status")
  })

  it("has role=alert for warning variant", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createInlineMessageHTML("Warning", { variant: "warning" })}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-inline-message")
    expect(el?.getAttribute("role")).toBe("alert")
  })

  it("has role=alert for danger variant", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createInlineMessageHTML("Error", { variant: "danger" })}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-inline-message")
    expect(el?.getAttribute("role")).toBe("alert")
  })

  it("has accessible text content", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createInlineMessageHTML("Something happened")}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-inline-message")
    expect(el?.textContent).toBe("Something happened")
  })
})
