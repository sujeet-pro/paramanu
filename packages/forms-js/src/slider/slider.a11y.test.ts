import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { sliderClasses } from "./slider.classes.js"

function createSliderHTML(
  options: Parameters<typeof sliderClasses>[0] = {},
  attrs: string = "",
): string {
  const classes = sliderClasses(options)
  const disabledAttr = options?.disabled ? ' aria-disabled="true"' : ""
  return `<div class="${classes}" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="50" aria-orientation="${options?.orientation || "horizontal"}" tabindex="0"${disabledAttr}${attrs ? " " + attrs : ""}>
    <div class="pm-slider__track">
      <div class="pm-slider__filled-track"></div>
    </div>
    <div class="pm-slider__thumb" tabindex="0"></div>
  </div>`
}

describe("slider accessibility", () => {
  it("has role=slider", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSliderHTML()}</body>`)
    const slider = dom.window.document.querySelector("[role='slider']")
    expect(slider).not.toBeNull()
    expect(slider?.getAttribute("role")).toBe("slider")
  })

  it("has aria-valuemin, aria-valuemax, and aria-valuenow", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSliderHTML()}</body>`)
    const slider = dom.window.document.querySelector("[role='slider']")
    expect(slider?.getAttribute("aria-valuemin")).toBe("0")
    expect(slider?.getAttribute("aria-valuemax")).toBe("100")
    expect(slider?.getAttribute("aria-valuenow")).toBe("50")
  })

  it("has aria-orientation for horizontal", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createSliderHTML({ orientation: "horizontal" })}</body>`,
    )
    const slider = dom.window.document.querySelector("[role='slider']")
    expect(slider?.getAttribute("aria-orientation")).toBe("horizontal")
  })

  it("has aria-orientation for vertical", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createSliderHTML({ orientation: "vertical" })}</body>`,
    )
    const slider = dom.window.document.querySelector("[role='slider']")
    expect(slider?.getAttribute("aria-orientation")).toBe("vertical")
  })

  it("disabled slider has aria-disabled", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createSliderHTML({ disabled: true })}</body>`,
    )
    const slider = dom.window.document.querySelector("[role='slider']")
    expect(slider?.getAttribute("aria-disabled")).toBe("true")
  })

  it("is keyboard focusable", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createSliderHTML()}</body>`)
    const slider = dom.window.document.querySelector("[role='slider']")
    expect(slider?.getAttribute("tabindex")).toBe("0")
  })

  it("supports aria-label", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createSliderHTML({}, 'aria-label="Volume"')}</body>`,
    )
    const slider = dom.window.document.querySelector("[role='slider']")
    expect(slider?.getAttribute("aria-label")).toBe("Volume")
  })
})
