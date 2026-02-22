import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { inlineMsgClasses } from "./inline-message.classes.js"

function createInlineMsgHTML(
  text: string,
  options: Parameters<typeof inlineMsgClasses>[0] = {},
): string {
  const classes = inlineMsgClasses(options)
  const variant = options?.variant ?? "info"
  const role = variant === "warning" || variant === "danger" ? "alert" : "status"
  return `<div class="${classes}" role="${role}">${text}</div>`
}

describe("inline message accessibility", () => {
  it("has role=status for info variant", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createInlineMsgHTML("Info message")}</body>`)
    const el = dom.window.document.querySelector(".pm-inline-msg")
    expect(el?.getAttribute("role")).toBe("status")
  })

  it("has role=status for success variant", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createInlineMsgHTML("Success", { variant: "success" })}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-inline-msg")
    expect(el?.getAttribute("role")).toBe("status")
  })

  it("has role=alert for warning variant", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createInlineMsgHTML("Warning", { variant: "warning" })}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-inline-msg")
    expect(el?.getAttribute("role")).toBe("alert")
  })

  it("has role=alert for danger variant", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createInlineMsgHTML("Error", { variant: "danger" })}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-inline-msg")
    expect(el?.getAttribute("role")).toBe("alert")
  })

  it("has accessible text content", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createInlineMsgHTML("Something happened")}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-inline-msg")
    expect(el?.textContent).toBe("Something happened")
  })
})
