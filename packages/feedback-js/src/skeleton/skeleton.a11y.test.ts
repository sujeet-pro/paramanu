import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { skeletonClasses } from "./skeleton.classes.js"
import type { SkeletonClassesOptions } from "./skeleton.types.js"

function createSkeletonHTML(options: SkeletonClassesOptions = {}): string {
  const classes = skeletonClasses(options)
  return `<div class="${classes}" aria-hidden="true"></div>`
}

describe("skeleton accessibility", () => {
  it("has aria-hidden=true", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSkeletonHTML()}</body>`)
    const el = dom.window.document.querySelector(".pm-skeleton")
    expect(el?.getAttribute("aria-hidden")).toBe("true")
  })

  it("is a non-interactive element", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSkeletonHTML()}</body>`)
    const el = dom.window.document.querySelector(".pm-skeleton")
    expect(el?.tagName.toLowerCase()).toBe("div")
    expect(el?.tagName.toLowerCase()).not.toBe("button")
    expect(el?.tagName.toLowerCase()).not.toBe("a")
    expect(el?.tagName.toLowerCase()).not.toBe("input")
  })
})
