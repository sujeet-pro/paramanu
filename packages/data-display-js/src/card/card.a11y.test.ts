import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { cardClasses } from "./card.classes.js"

function createCardHTML(
  content: string,
  options: Parameters<typeof cardClasses>[0] = {},
  tag: string = "div",
  attrs: string = "",
): string {
  const classes = cardClasses(options)
  return `<${tag} class="${classes.root}"${attrs ? " " + attrs : ""}>${content}</${tag}>`
}

function createInteractiveCardHTML(
  content: string,
  options: Parameters<typeof cardClasses>[0] = {},
): string {
  const classes = cardClasses({ ...options, interactive: true })
  return `<article class="${classes.root}" tabindex="0" role="link" aria-label="View details">${content}</article>`
}

describe("card accessibility", () => {
  it("renders as a div by default", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createCardHTML("Card content")}</body>`,
    )
    const card = dom.window.document.querySelector(".pm-card")
    expect(card).not.toBeNull()
    expect(card?.tagName).toBe("DIV")
  })

  it("can render as an article element", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createCardHTML("Article card", {}, "article")}</body>`,
    )
    const card = dom.window.document.querySelector(".pm-card")
    expect(card?.tagName).toBe("ARTICLE")
  })

  it("interactive card is focusable", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createInteractiveCardHTML("Click me")}</body>`,
    )
    const card = dom.window.document.querySelector(".pm-card")
    expect(card?.getAttribute("tabindex")).toBe("0")
  })

  it("interactive card has accessible role and label", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createInteractiveCardHTML("Click me")}</body>`,
    )
    const card = dom.window.document.querySelector(".pm-card")
    expect(card?.getAttribute("role")).toBe("link")
    expect(card?.getAttribute("aria-label")).toBe("View details")
  })

  it("card sub-parts are present", () => {
    const classes = cardClasses()
    const html = `
      <div class="${classes.root}">
        <div class="${classes.header}">Header</div>
        <div class="${classes.body}">Body</div>
        <div class="${classes.footer}">Footer</div>
      </div>
    `
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    expect(dom.window.document.querySelector(".pm-card__header")?.textContent).toBe("Header")
    expect(dom.window.document.querySelector(".pm-card__body")?.textContent).toBe("Body")
    expect(dom.window.document.querySelector(".pm-card__footer")?.textContent).toBe("Footer")
  })
})
