import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { ratingClasses } from "./rating.classes.js"

function createRatingHTML(
  options: Parameters<typeof ratingClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = ratingClasses(options)
  const disabledAttr = options?.disabled ? ' aria-disabled="true"' : ""
  const readOnlyAttr = options?.readOnly ? ' aria-readonly="true"' : ""
  return `<div class="${classes}" role="radiogroup" aria-label="Rating"${disabledAttr}${readOnlyAttr}${attrs ? " " + attrs : ""}>
    <button class="pm-rating__item pm-rating__item--filled" role="radio" aria-checked="true" aria-label="1 star"${options?.disabled ? " disabled" : ""}>&#9733;</button>
    <button class="pm-rating__item" role="radio" aria-checked="false" aria-label="2 stars"${options?.disabled ? " disabled" : ""}>&#9733;</button>
    <button class="pm-rating__item" role="radio" aria-checked="false" aria-label="3 stars"${options?.disabled ? " disabled" : ""}>&#9733;</button>
  </div>`
}

describe("rating accessibility", () => {
  it("has role=radiogroup", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createRatingHTML()}</body>`)
    const rating = dom.window.document.querySelector("[role='radiogroup']")
    expect(rating).not.toBeNull()
    expect(rating?.getAttribute("role")).toBe("radiogroup")
  })

  it("has aria-label on container", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createRatingHTML()}</body>`)
    const rating = dom.window.document.querySelector("[role='radiogroup']")
    expect(rating?.getAttribute("aria-label")).toBe("Rating")
  })

  it("each star has role=radio", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createRatingHTML()}</body>`)
    const radios = dom.window.document.querySelectorAll("[role='radio']")
    expect(radios.length).toBe(3)
  })

  it("each star has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createRatingHTML()}</body>`)
    const radios = dom.window.document.querySelectorAll("[role='radio']")
    expect(radios[0]?.getAttribute("aria-label")).toBe("1 star")
    expect(radios[1]?.getAttribute("aria-label")).toBe("2 stars")
  })

  it("selected star has aria-checked=true", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createRatingHTML()}</body>`)
    const radios = dom.window.document.querySelectorAll("[role='radio']")
    expect(radios[0]?.getAttribute("aria-checked")).toBe("true")
    expect(radios[1]?.getAttribute("aria-checked")).toBe("false")
  })

  it("disabled rating has aria-disabled on container", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createRatingHTML({ disabled: true })}</body>`,
    )
    const rating = dom.window.document.querySelector("[role='radiogroup']")
    expect(rating?.getAttribute("aria-disabled")).toBe("true")
  })

  it("disabled stars have disabled attribute", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createRatingHTML({ disabled: true })}</body>`,
    )
    const buttons = dom.window.document.querySelectorAll("button")
    buttons.forEach((btn) => {
      expect(btn.hasAttribute("disabled")).toBe(true)
    })
  })
})
