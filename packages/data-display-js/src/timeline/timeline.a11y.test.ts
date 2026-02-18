import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { timelineClasses, timelineDotClasses } from "./timeline.classes.js"

function createTimelineHTML(
  options: Parameters<typeof timelineClasses>[0] = {},
  activeIndex?: number,
): string {
  const cls = timelineClasses(options)
  const items = [0, 1, 2].map((i) => {
    const dotCls = timelineDotClasses({ variant: "filled", color: "primary" })
    const currentAttr = i === activeIndex ? ' aria-current="step"' : ""
    return `<li class="${cls.item}"${currentAttr}>
      <span class="${cls.connector}"></span>
      <span class="${dotCls}"></span>
      <div class="${cls.content}">Step ${i + 1}</div>
      <div class="${cls.opposite}">2024</div>
    </li>`
  })
  return `<ol class="${cls.root}">${items.join("")}</ol>`
}

describe("timeline accessibility", () => {
  it("renders as an ordered list", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTimelineHTML()}</body>`)
    const timeline = dom.window.document.querySelector("ol")
    expect(timeline).not.toBeNull()
    expect(timeline?.tagName).toBe("OL")
  })

  it("items render as list items", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTimelineHTML()}</body>`)
    const items = dom.window.document.querySelectorAll("li")
    expect(items.length).toBe(3)
  })

  it("active item has aria-current=step", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTimelineHTML({}, 1)}</body>`)
    const items = dom.window.document.querySelectorAll("li")
    expect(items[0].getAttribute("aria-current")).toBeNull()
    expect(items[1].getAttribute("aria-current")).toBe("step")
    expect(items[2].getAttribute("aria-current")).toBeNull()
  })

  it("has accessible content text", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createTimelineHTML()}</body>`)
    const contents = dom.window.document.querySelectorAll(".pm-timeline__content")
    expect(contents[0].textContent).toBe("Step 1")
    expect(contents[1].textContent).toBe("Step 2")
  })

  it("supports aria-label on the list for additional context", () => {
    const cls = timelineClasses()
    const html = `<ol class="${cls.root}" aria-label="Project milestones"><li class="${cls.item}"><div class="${cls.content}">Start</div></li></ol>`
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const timeline = dom.window.document.querySelector("ol")
    expect(timeline?.getAttribute("aria-label")).toBe("Project milestones")
  })
})
