import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import {
  stepsClasses,
  stepClasses,
  stepIndicatorClasses,
  stepConnectorClasses,
  stepContentClasses,
} from "./steps.classes.js"

function createStepsHTML(
  steps: Array<{
    label: string
    description?: string
    status: "incomplete" | "active" | "complete"
    number: number
  }>,
  options?: Parameters<typeof stepsClasses>[0],
): string {
  const rootClasses = stepsClasses(options)
  const stepElements = steps
    .map((step, index) => {
      const cls = stepClasses({ status: step.status })
      const indicatorCls = stepIndicatorClasses({ status: step.status })
      const contentCls = stepContentClasses()
      const ariaCurrent = step.status === "active" ? ' aria-current="step"' : ""
      const connector =
        index < steps.length - 1
          ? `<div class="${stepConnectorClasses({ status: step.status })}" role="presentation"></div>`
          : ""
      const desc = step.description
        ? `<div class="pm-steps__description">${step.description}</div>`
        : ""
      return `<div class="${cls}"${ariaCurrent}><div class="${indicatorCls}" aria-hidden="true">${step.number}</div>${connector}<div class="${contentCls}"><div class="pm-steps__title">${step.label}</div>${desc}</div></div>`
    })
    .join("")
  return `<div class="${rootClasses}" role="list" aria-label="Progress">${stepElements}</div>`
}

describe("steps accessibility", () => {
  it("has role=list with aria-label", () => {
    const html = createStepsHTML([{ label: "Step 1", status: "active", number: 1 }])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const root = dom.window.document.querySelector("[role='list']")
    expect(root).not.toBeNull()
    expect(root?.getAttribute("aria-label")).toBe("Progress")
  })

  it("marks active step with aria-current", () => {
    const html = createStepsHTML([
      { label: "Step 1", status: "complete", number: 1 },
      { label: "Step 2", status: "active", number: 2 },
      { label: "Step 3", status: "incomplete", number: 3 },
    ])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const current = dom.window.document.querySelector("[aria-current='step']")
    expect(current).not.toBeNull()
    const content = current?.querySelector(".pm-steps__title")
    expect(content?.textContent).toBe("Step 2")
  })

  it("indicator is hidden from screen readers", () => {
    const html = createStepsHTML([{ label: "Step 1", status: "active", number: 1 }])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const indicator = dom.window.document.querySelector(".pm-steps__indicator")
    expect(indicator?.getAttribute("aria-hidden")).toBe("true")
  })

  it("connector is presentational", () => {
    const html = createStepsHTML([
      { label: "Step 1", status: "complete", number: 1 },
      { label: "Step 2", status: "active", number: 2 },
    ])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const connector = dom.window.document.querySelector(".pm-steps__connector")
    expect(connector?.getAttribute("role")).toBe("presentation")
  })

  it("step content contains title text", () => {
    const html = createStepsHTML([
      { label: "Account Setup", status: "active", number: 1, description: "Create your account" },
    ])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const title = dom.window.document.querySelector(".pm-steps__title")
    expect(title?.textContent).toBe("Account Setup")
    const description = dom.window.document.querySelector(".pm-steps__description")
    expect(description?.textContent).toBe("Create your account")
  })

  it("incomplete steps do not have aria-current", () => {
    const html = createStepsHTML([{ label: "Step 1", status: "incomplete", number: 1 }])
    const dom = new JSDOM(`<!DOCTYPE html><body>${html}</body>`)
    const step = dom.window.document.querySelector(".pm-steps__step")
    expect(step?.hasAttribute("aria-current")).toBe(false)
  })
})
