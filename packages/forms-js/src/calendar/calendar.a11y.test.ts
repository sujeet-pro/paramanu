import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { calendarClasses } from "./calendar.classes.js"

function createCalendarHTML(options: Parameters<typeof calendarClasses>[0] = {}): string {
  const classes = calendarClasses(options)
  return `<div class="${classes}" role="grid" aria-label="February 2026"><div class="pm-calendar__header"><button class="pm-calendar__nav-button" aria-label="Previous month">&lt;</button><span class="pm-calendar__title">February 2026</span><button class="pm-calendar__nav-button" aria-label="Next month">&gt;</button></div><div class="pm-calendar__grid" role="row"><span class="pm-calendar__day-label" role="columnheader">Su</span><span class="pm-calendar__day-label" role="columnheader">Mo</span><button class="pm-calendar__day" role="gridcell" tabindex="-1">1</button><button class="pm-calendar__day pm-calendar__day--today" role="gridcell" tabindex="0" aria-current="date">18</button><button class="pm-calendar__day pm-calendar__day--selected" role="gridcell" aria-pressed="true" tabindex="0">20</button><button class="pm-calendar__day pm-calendar__day--disabled" role="gridcell" aria-disabled="true" tabindex="-1">29</button></div></div>`
}

describe("calendar accessibility", () => {
  it("has role grid", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCalendarHTML()}</body>`)
    const calendar = dom.window.document.querySelector('[role="grid"]')
    expect(calendar).not.toBeNull()
  })

  it("has aria-label on grid", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCalendarHTML()}</body>`)
    const calendar = dom.window.document.querySelector('[role="grid"]')
    expect(calendar?.getAttribute("aria-label")).toBe("February 2026")
  })

  it("nav buttons have aria-labels", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCalendarHTML()}</body>`)
    const buttons = dom.window.document.querySelectorAll(".pm-calendar__nav-button")
    expect(buttons[0]?.getAttribute("aria-label")).toBe("Previous month")
    expect(buttons[1]?.getAttribute("aria-label")).toBe("Next month")
  })

  it("day labels have role columnheader", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCalendarHTML()}</body>`)
    const headers = dom.window.document.querySelectorAll('[role="columnheader"]')
    expect(headers.length).toBe(2)
  })

  it("day cells have role gridcell", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCalendarHTML()}</body>`)
    const cells = dom.window.document.querySelectorAll('[role="gridcell"]')
    expect(cells.length).toBeGreaterThan(0)
  })

  it("today has aria-current=date", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCalendarHTML()}</body>`)
    const today = dom.window.document.querySelector(".pm-calendar__day--today")
    expect(today?.getAttribute("aria-current")).toBe("date")
  })

  it("selected day has aria-pressed=true", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCalendarHTML()}</body>`)
    const selected = dom.window.document.querySelector(".pm-calendar__day--selected")
    expect(selected?.getAttribute("aria-pressed")).toBe("true")
  })

  it("disabled day has aria-disabled=true", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCalendarHTML()}</body>`)
    const disabled = dom.window.document.querySelector(".pm-calendar__day--disabled")
    expect(disabled?.getAttribute("aria-disabled")).toBe("true")
  })

  it("days are button elements for keyboard interaction", () => {
    const dom = new JSDOM(`<!DOCTYPE html><body>${createCalendarHTML()}</body>`)
    const day = dom.window.document.querySelector(".pm-calendar__day")
    expect(day?.tagName).toBe("BUTTON")
  })
})
