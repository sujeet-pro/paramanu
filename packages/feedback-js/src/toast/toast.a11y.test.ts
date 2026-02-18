import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { toastClasses } from "./toast.classes.js"
import type { ToastClassesOptions } from "./toast.types.js"

function createToastHTML(message: string, options: ToastClassesOptions = {}): string {
  const classes = toastClasses(options)
  const variant = options?.variant ?? "info"
  const role = variant === "warning" || variant === "danger" ? "alert" : "status"
  const closeButton = options?.dismissible
    ? `<div class="${classes.close}"><button class="pm-close-button pm-close-button--sm" aria-label="Dismiss">\u00d7</button></div>`
    : ""

  return `<div class="${classes.root}" role="${role}">
    <div class="${classes.icon}">i</div>
    <div class="${classes.content}">
      <div class="${classes.message}">${message}</div>
    </div>
    ${closeButton}
  </div>`
}

describe("toast accessibility", () => {
  it("has role=status for info variant", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createToastHTML("File uploaded")}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-toast")
    expect(el?.getAttribute("role")).toBe("status")
  })

  it("has role=status for success variant", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createToastHTML("Saved successfully", { variant: "success" })}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-toast")
    expect(el?.getAttribute("role")).toBe("status")
  })

  it("has role=alert for warning variant", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createToastHTML("Disk space low", { variant: "warning" })}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-toast")
    expect(el?.getAttribute("role")).toBe("alert")
  })

  it("has role=alert for danger variant", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createToastHTML("Connection lost", { variant: "danger" })}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-toast")
    expect(el?.getAttribute("role")).toBe("alert")
  })

  it("has message content", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createToastHTML("Operation completed")}</body>`,
    )
    const message = dom.window.document.querySelector(".pm-toast__message")
    expect(message?.textContent).toBe("Operation completed")
  })

  it("dismissible toast has close button with aria-label", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createToastHTML("Message", { dismissible: true })}</body>`,
    )
    const closeBtn = dom.window.document.querySelector(".pm-close-button")
    expect(closeBtn).not.toBeNull()
    expect(closeBtn?.getAttribute("aria-label")).toBe("Dismiss")
  })

  it("non-dismissible toast does not have close button", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createToastHTML("Message", { dismissible: false })}</body>`,
    )
    const closeBtn = dom.window.document.querySelector(".pm-close-button")
    expect(closeBtn).toBeNull()
  })
})
