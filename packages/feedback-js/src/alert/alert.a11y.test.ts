import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { alertClasses } from "./alert.classes.js"
import type { AlertClassesOptions } from "./alert.types.js"

function createAlertHTML(
  title: string,
  description: string,
  options: AlertClassesOptions = {},
): string {
  const classes = alertClasses(options)
  const variant = options?.variant ?? "info"
  const role = variant === "warning" || variant === "danger" ? "alert" : "status"
  const closeButton = options?.dismissible
    ? `<div class="${classes.close}"><button class="pm-close-button pm-close-button--sm" aria-label="Dismiss">\u00d7</button></div>`
    : ""

  return `<div class="${classes.root}" role="${role}">
    <div class="${classes.icon}">i</div>
    <div class="${classes.content}">
      <div class="${classes.title}">${title}</div>
      <div class="${classes.description}">${description}</div>
    </div>
    ${closeButton}
  </div>`
}

describe("alert accessibility", () => {
  it("has role=status for info variant", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createAlertHTML("Info", "Message")}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-alert")
    expect(el?.getAttribute("role")).toBe("status")
  })

  it("has role=status for success variant", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createAlertHTML("Success", "Message", { variant: "success" })}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-alert")
    expect(el?.getAttribute("role")).toBe("status")
  })

  it("has role=alert for warning variant", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createAlertHTML("Warning", "Message", { variant: "warning" })}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-alert")
    expect(el?.getAttribute("role")).toBe("alert")
  })

  it("has role=alert for danger variant", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createAlertHTML("Error", "Message", { variant: "danger" })}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-alert")
    expect(el?.getAttribute("role")).toBe("alert")
  })

  it("has accessible title and description", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createAlertHTML("Important", "Check this out")}</body>`,
    )
    const title = dom.window.document.querySelector(".pm-alert__title")
    const description = dom.window.document.querySelector(".pm-alert__description")
    expect(title?.textContent).toBe("Important")
    expect(description?.textContent).toBe("Check this out")
  })

  it("dismissible alert has close button with aria-label", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createAlertHTML("Title", "Desc", { dismissible: true })}</body>`,
    )
    const closeBtn = dom.window.document.querySelector(".pm-close-button")
    expect(closeBtn).not.toBeNull()
    expect(closeBtn?.getAttribute("aria-label")).toBe("Dismiss")
  })

  it("non-dismissible alert does not have close button", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createAlertHTML("Title", "Desc", { dismissible: false })}</body>`,
    )
    const closeBtn = dom.window.document.querySelector(".pm-close-button")
    expect(closeBtn).toBeNull()
  })
})
