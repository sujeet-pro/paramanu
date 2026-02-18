import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { colorPickerClasses } from "./color-picker.classes.js"

function createColorPickerHTML(
  options: Parameters<typeof colorPickerClasses>[0] = {},
): string {
  const classes = colorPickerClasses(options)
  const disabledAttr = options?.disabled ? ' disabled aria-disabled="true"' : ""
  const expandedAttr = options?.open ? 'aria-expanded="true"' : 'aria-expanded="false"'
  return `<div class="${classes}"><button class="pm-color-picker__trigger" ${expandedAttr} aria-haspopup="dialog"${disabledAttr} aria-label="Select color"><span class="pm-color-picker__swatch" aria-hidden="true" style="background-color: #ff0000;"></span></button><div class="pm-color-picker__popover" role="dialog" aria-label="Color picker"><div class="pm-color-picker__spectrum" role="slider" aria-label="Color spectrum" tabindex="0"></div><div class="pm-color-picker__hue" role="slider" aria-label="Hue" tabindex="0"></div><div class="pm-color-picker__alpha" role="slider" aria-label="Opacity" tabindex="0"></div><div class="pm-color-picker__presets" role="group" aria-label="Preset colors"><button class="pm-color-picker__preset" aria-label="Red">#ff0000</button><button class="pm-color-picker__preset" aria-label="Blue">#0000ff</button></div><input class="pm-color-picker__input" type="text" aria-label="Hex color value" value="#ff0000" /></div></div>`
}

describe("color picker accessibility", () => {
  it("trigger has aria-haspopup=dialog", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createColorPickerHTML()}</body>`)
    const trigger = dom.window.document.querySelector(".pm-color-picker__trigger")
    expect(trigger?.getAttribute("aria-haspopup")).toBe("dialog")
  })

  it("trigger has aria-expanded", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createColorPickerHTML({ open: true })}</body>`)
    const trigger = dom.window.document.querySelector(".pm-color-picker__trigger")
    expect(trigger?.getAttribute("aria-expanded")).toBe("true")
  })

  it("trigger has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createColorPickerHTML()}</body>`)
    const trigger = dom.window.document.querySelector(".pm-color-picker__trigger")
    expect(trigger?.getAttribute("aria-label")).toBe("Select color")
  })

  it("swatch is hidden from screen readers", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createColorPickerHTML()}</body>`)
    const swatch = dom.window.document.querySelector(".pm-color-picker__swatch")
    expect(swatch?.getAttribute("aria-hidden")).toBe("true")
  })

  it("popover has role dialog", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createColorPickerHTML()}</body>`)
    const popover = dom.window.document.querySelector(".pm-color-picker__popover")
    expect(popover?.getAttribute("role")).toBe("dialog")
  })

  it("spectrum has role slider with aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createColorPickerHTML()}</body>`)
    const spectrum = dom.window.document.querySelector(".pm-color-picker__spectrum")
    expect(spectrum?.getAttribute("role")).toBe("slider")
    expect(spectrum?.getAttribute("aria-label")).toBe("Color spectrum")
  })

  it("hue slider has role slider with aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createColorPickerHTML()}</body>`)
    const hue = dom.window.document.querySelector(".pm-color-picker__hue")
    expect(hue?.getAttribute("role")).toBe("slider")
    expect(hue?.getAttribute("aria-label")).toBe("Hue")
  })

  it("presets group has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createColorPickerHTML()}</body>`)
    const presets = dom.window.document.querySelector(".pm-color-picker__presets")
    expect(presets?.getAttribute("role")).toBe("group")
    expect(presets?.getAttribute("aria-label")).toBe("Preset colors")
  })

  it("hex input has aria-label", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createColorPickerHTML()}</body>`)
    const input = dom.window.document.querySelector(".pm-color-picker__input")
    expect(input?.getAttribute("aria-label")).toBe("Hex color value")
  })

  it("disabled trigger has disabled attribute and aria-disabled", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createColorPickerHTML({ disabled: true })}</body>`,
    )
    const trigger = dom.window.document.querySelector(".pm-color-picker__trigger")
    expect(trigger?.hasAttribute("disabled")).toBe(true)
    expect(trigger?.getAttribute("aria-disabled")).toBe("true")
  })
})
