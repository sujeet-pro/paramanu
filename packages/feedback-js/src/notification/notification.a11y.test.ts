import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { notificationClasses } from "./notification.classes.js"
import type { NotificationClassesOptions } from "./notification.types.js"

function createNotificationHTML(
  title: string,
  message: string,
  options: NotificationClassesOptions = {},
): string {
  const classes = notificationClasses(options)
  const closeButton = options?.dismissible
    ? `<div class="${classes.close}"><button class="pm-close-button pm-close-button--sm" aria-label="Dismiss">\u00d7</button></div>`
    : ""

  return `<article class="${classes.root}">
    <div class="${classes.icon}">A</div>
    <div class="${classes.content}">
      <div class="${classes.title}">${title}</div>
      <div class="${classes.message}">${message}</div>
      <div class="${classes.timestamp}">2 minutes ago</div>
    </div>
    ${closeButton}
  </article>`
}

describe("notification accessibility", () => {
  it("renders as an article element", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createNotificationHTML("New message", "You have a new message")}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-notification")
    expect(el).not.toBeNull()
    expect(el?.tagName.toLowerCase()).toBe("article")
  })

  it("has title and message content", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createNotificationHTML("Update Available", "A new version is ready")}</body>`,
    )
    const title = dom.window.document.querySelector(".pm-notification__title")
    const message = dom.window.document.querySelector(".pm-notification__message")
    expect(title?.textContent).toBe("Update Available")
    expect(message?.textContent).toBe("A new version is ready")
  })

  it("has timestamp content", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createNotificationHTML("Title", "Message")}</body>`,
    )
    const timestamp = dom.window.document.querySelector(".pm-notification__timestamp")
    expect(timestamp?.textContent).toBe("2 minutes ago")
  })

  it("dismissible notification has close button with aria-label", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createNotificationHTML("Title", "Message", { dismissible: true })}</body>`,
    )
    const closeBtn = dom.window.document.querySelector(".pm-close-button")
    expect(closeBtn).not.toBeNull()
    expect(closeBtn?.getAttribute("aria-label")).toBe("Dismiss")
  })

  it("non-dismissible notification does not have close button", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createNotificationHTML("Title", "Message", { dismissible: false })}</body>`,
    )
    const closeBtn = dom.window.document.querySelector(".pm-close-button")
    expect(closeBtn).toBeNull()
  })
})
