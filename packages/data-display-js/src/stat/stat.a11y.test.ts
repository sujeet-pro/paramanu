import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { statClasses, statHelpTextClasses, statArrowClasses } from "./stat.classes.js"

describe("stat accessibility", () => {
  it("renders stat with accessible structure", () => {
    const classes = statClasses()
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <div class="${classes.root}">
        <span class="${classes.label}">Total Revenue</span>
        <span class="${classes.value}">$45,231</span>
        <span class="${statHelpTextClasses({ trend: "up" })}">
          <span class="${statArrowClasses({ trend: "up" })}"></span>
          12% increase
        </span>
      </div>
    </body>`)
    const stat = dom.window.document.querySelector(".pm-stat")
    expect(stat).not.toBeNull()
    const label = dom.window.document.querySelector(".pm-stat__label")
    expect(label?.textContent).toBe("Total Revenue")
    const value = dom.window.document.querySelector(".pm-stat__value")
    expect(value?.textContent).toBe("$45,231")
  })

  it("help text communicates trend direction", () => {
    const helpTextUp = statHelpTextClasses({ trend: "up" })
    expect(helpTextUp).toContain("pm-stat__help-text--up")

    const helpTextDown = statHelpTextClasses({ trend: "down" })
    expect(helpTextDown).toContain("pm-stat__help-text--down")
  })

  it("stat can have an aria-describedby for context", () => {
    const classes = statClasses()
    const dom = new JSDOM(`<!DOCTYPE html><body>
      <div class="${classes.root}" aria-describedby="stat-help">
        <span class="${classes.label}">Users</span>
        <span class="${classes.value}">1,234</span>
        <span id="stat-help" class="${classes.helpText}">Last 30 days</span>
      </div>
    </body>`)
    const stat = dom.window.document.querySelector(".pm-stat")
    expect(stat?.getAttribute("aria-describedby")).toBe("stat-help")
  })
})
