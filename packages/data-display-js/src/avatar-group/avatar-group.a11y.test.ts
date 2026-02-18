import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { avatarGroupClasses } from "./avatar-group.classes.js"

describe("avatar-group accessibility", () => {
  it("has role=group", () => {
    const classes = avatarGroupClasses()
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${classes.root}" role="group" aria-label="Team members"></div></body>`,
    )
    const group = dom.window.document.querySelector(".pm-avatar-group")
    expect(group?.getAttribute("role")).toBe("group")
  })

  it("has aria-label describing the group", () => {
    const classes = avatarGroupClasses()
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${classes.root}" role="group" aria-label="Team members"></div></body>`,
    )
    const group = dom.window.document.querySelector(".pm-avatar-group")
    expect(group?.getAttribute("aria-label")).toBe("Team members")
  })

  it("overflow indicator has accessible text", () => {
    const classes = avatarGroupClasses()
    const dom = new JSDOM(
      `<!DOCTYPE html><body><div class="${classes.root}" role="group" aria-label="Users"><span class="${classes.overflow}" aria-label="3 more users">+3</span></div></body>`,
    )
    const overflow = dom.window.document.querySelector(".pm-avatar-group__overflow")
    expect(overflow?.getAttribute("aria-label")).toBe("3 more users")
  })
})
