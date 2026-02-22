import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { notifClasses } from "./notification.classes.js"
import type { NotifClassesOptions } from "./notification.types.js"

function createNotifHTML(
  title: string,
  message: string,
  options: NotifClassesOptions = {},
): string {
  const classes = notifClasses(options)
  const closeBtn = options?.dismissible
    ? `<div class="${classes.close}"><button class="pm-close-btn pm-close-btn--sm" aria-label="Dismiss">\u00d7</button></div>`
    : ""

  return `<article class="${classes.root}">
    <div class="${classes.icon}">A</div>
    <div class="${classes.content}">
      <div class="${classes.title}">${title}</div>
      <div class="${classes.message}">${message}</div>
      <div class="${classes.timestamp}">2 minutes ago</div>
    </div>
    ${closeBtn}
  </article>`
}

describe("notification accessibility", () => {
  it("renders as an article element", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createNotifHTML("New message", "You have a new message")}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-notif")
    expect(el).not.toBeNull()
    expect(el?.tagName.toLowerCase()).toBe("article")
  })

  it("has title and message content", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createNotifHTML("Update Available", "A new version is ready")}</body>`,
    )
    const title = dom.window.document.querySelector(".pm-notif__title")
    const message = dom.window.document.querySelector(".pm-notif__message")
    expect(title?.textContent).toBe("Update Available")
    expect(message?.textContent).toBe("A new version is ready")
  })

  it("has timestamp content", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createNotifHTML("Title", "Message")}</body>`)
    const timestamp = dom.window.document.querySelector(".pm-notif__timestamp")
    expect(timestamp?.textContent).toBe("2 minutes ago")
  })

  it("dismissible notification has close button with aria-label", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createNotifHTML("Title", "Message", { dismissible: true })}</body>`,
    )
    const closeBtn = dom.window.document.querySelector(".pm-close-btn")
    expect(closeBtn).not.toBeNull()
    expect(closeBtn?.getAttribute("aria-label")).toBe("Dismiss")
  })

  it("non-dismissible notification does not have close button", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createNotifHTML("Title", "Message", { dismissible: false })}</body>`,
    )
    const closeBtn = dom.window.document.querySelector(".pm-close-btn")
    expect(closeBtn).toBeNull()
  })
})
