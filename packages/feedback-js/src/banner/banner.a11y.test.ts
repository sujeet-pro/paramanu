import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { bannerClasses } from "./banner.classes.js"
import type { BannerClassesOptions } from "./banner.types.js"

function createBannerHTML(
  text: string,
  options: BannerClassesOptions = {},
): string {
  const classes = bannerClasses(options)
  const closeBtn = options?.dismissible
    ? `<div class="${classes.close}"><button class="pm-close-btn pm-close-btn--sm" aria-label="Dismiss">\u00d7</button></div>`
    : ""

  return `<div class="${classes.root}" role="status">
    <div class="${classes.content}">${text}</div>
    ${closeBtn}
  </div>`
}

describe("banner accessibility", () => {
  it("has role=status", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createBannerHTML("System update available")}</body>`,
    )
    const el = dom.window.document.querySelector(".pm-banner")
    expect(el?.getAttribute("role")).toBe("status")
  })

  it("has accessible text content", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createBannerHTML("Maintenance scheduled")}</body>`,
    )
    const content = dom.window.document.querySelector(".pm-banner__content")
    expect(content?.textContent).toBe("Maintenance scheduled")
  })

  it("dismissible banner has close button with aria-label", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createBannerHTML("Notice", { dismissible: true })}</body>`,
    )
    const closeBtn = dom.window.document.querySelector(".pm-close-btn")
    expect(closeBtn).not.toBeNull()
    expect(closeBtn?.getAttribute("aria-label")).toBe("Dismiss")
  })

  it("non-dismissible banner does not have close button", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createBannerHTML("Notice", { dismissible: false })}</body>`,
    )
    const closeBtn = dom.window.document.querySelector(".pm-close-btn")
    expect(closeBtn).toBeNull()
  })

  it("all variants have role=status", () => {
    const variants = ["info", "success", "warning", "danger"] as const
    for (const variant of variants) {
      const dom = new JSDOM(
        `<!DOCTYPE html><body>${createBannerHTML("Text", { variant })}</body>`,
      )
      const el = dom.window.document.querySelector(".pm-banner")
      expect(el?.getAttribute("role")).toBe("status")
    }
  })
})
