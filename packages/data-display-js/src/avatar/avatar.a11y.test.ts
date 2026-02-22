import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { avatarClasses } from "./avatar.classes.js"

function createAvatarWithImgHTML(
  name: string,
  options: Parameters<typeof avatarClasses>[0] = {},
): string {
  const classes = avatarClasses(options)
  return `<span class="${classes.root}" role="img" aria-label="${name}"><img class="${classes.image}" src="avatar.jpg" alt="${name}" /></span>`
}

function createAvatarWithFallbackHTML(
  name: string,
  initials: string,
  options: Parameters<typeof avatarClasses>[0] = {},
): string {
  const classes = avatarClasses(options)
  return `<span class="${classes.root}" role="img" aria-label="${name}"><span class="${classes.fallback}">${initials}</span></span>`
}

describe("avatar accessibility", () => {
  it("has role=img on the root element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createAvatarWithImgHTML("John Doe")}</body>`)
    const avatar = dom.window.document.querySelector(".pm-avatar")
    expect(avatar?.getAttribute("role")).toBe("img")
  })

  it("has aria-label with the user name", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createAvatarWithImgHTML("Jane Smith")}</body>`)
    const avatar = dom.window.document.querySelector(".pm-avatar")
    expect(avatar?.getAttribute("aria-label")).toBe("Jane Smith")
  })

  it("image has alt text", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createAvatarWithImgHTML("John Doe")}</body>`)
    const img = dom.window.document.querySelector(".pm-avatar__image")
    expect(img?.getAttribute("alt")).toBe("John Doe")
  })

  it("fallback displays initials as text content", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createAvatarWithFallbackHTML("John Doe", "JD")}</body>`,
    )
    const fallback = dom.window.document.querySelector(".pm-avatar__fallback")
    expect(fallback?.textContent).toBe("JD")
  })

  it("fallback avatar still has aria-label", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createAvatarWithFallbackHTML("Jane Smith", "JS")}</body>`,
    )
    const avatar = dom.window.document.querySelector(".pm-avatar")
    expect(avatar?.getAttribute("aria-label")).toBe("Jane Smith")
  })
})
