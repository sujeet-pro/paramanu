import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { embedClasses } from "./embed.classes.js"

function createEmbedHTML(
  options: Parameters<typeof embedClasses>[0] = {},
  iframeAttrs: string = 'title="Video player"',
): string {
  const cls = embedClasses(options)
  return `<div class="${cls.root}"><iframe class="${cls.iframe}" ${iframeAttrs} src="https://example.com"></iframe></div>`
}

describe("embed accessibility", () => {
  it("renders iframe inside a container div", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createEmbedHTML()}</body>`)
    const container = dom.window.document.querySelector(".pm-embed")
    const iframe = container?.querySelector("iframe")
    expect(container).not.toBeNull()
    expect(iframe).not.toBeNull()
  })

  it("iframe has a title attribute for screen readers", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createEmbedHTML()}</body>`)
    const iframe = dom.window.document.querySelector("iframe")
    expect(iframe?.getAttribute("title")).toBe("Video player")
  })

  it("iframe without title is detectable (anti-pattern)", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createEmbedHTML({}, 'src="https://example.com"')}</body>`,
    )
    const iframe = dom.window.document.querySelector("iframe")
    expect(iframe?.getAttribute("title")).toBeNull()
  })

  it("supports aria-label on container for additional context", () => {
    const cls = embedClasses()
    const html = `<div class="${cls.root}" aria-label="YouTube video"><iframe class="${cls.iframe}" title="Video" src="https://example.com"></iframe></div>`
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const container = dom.window.document.querySelector(".pm-embed")
    expect(container?.getAttribute("aria-label")).toBe("YouTube video")
  })
})
