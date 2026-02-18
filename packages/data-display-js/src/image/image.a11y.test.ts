import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { imageClasses } from "./image.classes.js"

function createImageHTML(
  src: string,
  alt: string,
  options: Parameters<typeof imageClasses>[0] = {},
  caption?: string,
): string {
  const classes = imageClasses(options)
  const captionHTML = caption
    ? `<figcaption class="${classes.caption}">${caption}</figcaption>`
    : ""
  return `<figure class="${classes.root}"><img class="${classes.img}" src="${src}" alt="${alt}" />${captionHTML}</figure>`
}

function createImageFallbackHTML(
  alt: string,
  options: Parameters<typeof imageClasses>[0] = {},
): string {
  const classes = imageClasses({ ...options, fallback: true })
  return `<figure class="${classes.root}"><div class="${classes.fallback}" role="img" aria-label="${alt}">Image not available</div></figure>`
}

describe("image accessibility", () => {
  it("renders as a figure element", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createImageHTML("photo.jpg", "A landscape")}</body>`,
    )
    const figure = dom.window.document.querySelector("figure")
    expect(figure).not.toBeNull()
    expect(figure?.tagName).toBe("FIGURE")
  })

  it("img has alt text", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createImageHTML("photo.jpg", "A sunset over mountains")}</body>`,
    )
    const img = dom.window.document.querySelector("img")
    expect(img?.getAttribute("alt")).toBe("A sunset over mountains")
  })

  it("supports empty alt for decorative images", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createImageHTML("bg.jpg", "")}</body>`,
    )
    const img = dom.window.document.querySelector("img")
    expect(img?.getAttribute("alt")).toBe("")
  })

  it("caption is rendered as figcaption", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createImageHTML("photo.jpg", "Photo", {}, "Photo credit: John")}</body>`,
    )
    const figcaption = dom.window.document.querySelector("figcaption")
    expect(figcaption).not.toBeNull()
    expect(figcaption?.textContent).toBe("Photo credit: John")
  })

  it("fallback has role=img and aria-label", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createImageFallbackHTML("Profile picture")}</body>`,
    )
    const fallback = dom.window.document.querySelector("[role='img']")
    expect(fallback).not.toBeNull()
    expect(fallback?.getAttribute("aria-label")).toBe("Profile picture")
  })
})
