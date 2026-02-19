import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { carouselSlideClasses, carouselControlClasses } from "./carousel.classes.js"

function createCarouselHTML(
  slides: Array<{ content: string; active?: boolean }>,
  options: { loop?: boolean } = {},
): string {
  const activeIndex = slides.findIndex((s) => s.active)
  const isFirst = activeIndex === 0
  const isLast = activeIndex === slides.length - 1

  const slidesHTML = slides
    .map((slide, i) => {
      const slideClasses = carouselSlideClasses({ active: slide.active })

      return `
      <div
        class="${slideClasses}"
        role="group"
        aria-roledescription="slide"
        aria-label="Slide ${i + 1} of ${slides.length}"
      >
        ${slide.content}
      </div>
    `
    })
    .join("")

  const prevClasses = carouselControlClasses({
    direction: "prev",
    disabled: isFirst && !options.loop,
  })
  const nextClasses = carouselControlClasses({
    direction: "next",
    disabled: isLast && !options.loop,
  })

  return `
    <div
      class="pm-carousel pm-carousel--horizontal pm-carousel--md"
      role="region"
      aria-roledescription="carousel"
      aria-label="Img carousel"
    >
      <button
        class="${prevClasses}"
        aria-label="Previous slide"
        ${isFirst && !options.loop ? 'aria-disabled="true" disabled' : ""}
      >&#8249;</button>
      <div class="pm-carousel__track">
        ${slidesHTML}
      </div>
      <button
        class="${nextClasses}"
        aria-label="Next slide"
        ${isLast && !options.loop ? 'aria-disabled="true" disabled' : ""}
      >&#8250;</button>
      <div class="pm-carousel__indicators" role="tablist" aria-label="Slide indicators">
        ${slides.map((slide, i) => `<button role="tab" aria-selected="${slide.active || false}" aria-label="Go to slide ${i + 1}">${i + 1}</button>`).join("")}
      </div>
    </div>
  `
}

describe("carousel accessibility", () => {
  const defaultSlides = [
    { content: "Slide 1 content", active: true },
    { content: "Slide 2 content" },
    { content: "Slide 3 content" },
  ]

  it("carousel container has role=region", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCarouselHTML(defaultSlides)}</body>`)
    const carousel = dom.window.document.querySelector('[role="region"]')
    expect(carousel).not.toBeNull()
  })

  it("carousel container has aria-roledescription=carousel", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCarouselHTML(defaultSlides)}</body>`)
    const carousel = dom.window.document.querySelector('[role="region"]')
    expect(carousel?.getAttribute("aria-roledescription")).toBe("carousel")
  })

  it("carousel container has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCarouselHTML(defaultSlides)}</body>`)
    const carousel = dom.window.document.querySelector('[role="region"]')
    expect(carousel?.getAttribute("aria-label")).toBeTruthy()
  })

  it("slides have role=group", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCarouselHTML(defaultSlides)}</body>`)
    const slides = dom.window.document.querySelectorAll('[role="group"]')
    expect(slides.length).toBe(3)
  })

  it("slides have aria-roledescription=slide", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCarouselHTML(defaultSlides)}</body>`)
    const slides = dom.window.document.querySelectorAll('[role="group"]')
    slides.forEach((slide) => {
      expect(slide.getAttribute("aria-roledescription")).toBe("slide")
    })
  })

  it("slides have aria-label indicating position", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCarouselHTML(defaultSlides)}</body>`)
    const slides = dom.window.document.querySelectorAll('[role="group"]')
    expect(slides[0]?.getAttribute("aria-label")).toBe("Slide 1 of 3")
    expect(slides[1]?.getAttribute("aria-label")).toBe("Slide 2 of 3")
    expect(slides[2]?.getAttribute("aria-label")).toBe("Slide 3 of 3")
  })

  it("prev control has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCarouselHTML(defaultSlides)}</body>`)
    const buttons = dom.window.document.querySelectorAll("button")
    const prevBtn = Array.from(buttons).find(
      (btn) => btn.getAttribute("aria-label") === "Previous slide",
    )
    expect(prevBtn).not.toBeUndefined()
  })

  it("next control has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCarouselHTML(defaultSlides)}</body>`)
    const buttons = dom.window.document.querySelectorAll("button")
    const nextBtn = Array.from(buttons).find(
      (btn) => btn.getAttribute("aria-label") === "Next slide",
    )
    expect(nextBtn).not.toBeUndefined()
  })

  it("first slide active disables prev control", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCarouselHTML(defaultSlides)}</body>`)
    const buttons = dom.window.document.querySelectorAll("button")
    const prevBtn = Array.from(buttons).find(
      (btn) => btn.getAttribute("aria-label") === "Previous slide",
    )
    expect(prevBtn?.getAttribute("aria-disabled")).toBe("true")
  })

  it("last slide active disables next control", () => {
    const slides = [
      { content: "Slide 1 content" },
      { content: "Slide 2 content" },
      { content: "Slide 3 content", active: true },
    ]
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCarouselHTML(slides)}</body>`)
    const buttons = dom.window.document.querySelectorAll("button")
    const nextBtn = Array.from(buttons).find(
      (btn) => btn.getAttribute("aria-label") === "Next slide",
    )
    expect(nextBtn?.getAttribute("aria-disabled")).toBe("true")
  })

  it("indicators have role=tablist", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCarouselHTML(defaultSlides)}</body>`)
    const tablist = dom.window.document.querySelector('[role="tablist"]')
    expect(tablist).not.toBeNull()
  })

  it("indicator buttons have role=tab", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCarouselHTML(defaultSlides)}</body>`)
    const tabs = dom.window.document.querySelectorAll('[role="tab"]')
    expect(tabs.length).toBe(3)
  })

  it("active indicator has aria-selected=true", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCarouselHTML(defaultSlides)}</body>`)
    const tabs = dom.window.document.querySelectorAll('[role="tab"]')
    expect(tabs[0]?.getAttribute("aria-selected")).toBe("true")
    expect(tabs[1]?.getAttribute("aria-selected")).toBe("false")
  })
})
