import { describe, it, expect } from "vitest"
import { JSDOM } from "jsdom"
import { tourStepClasses, tourOverlayClasses } from "./tour.classes.js"

function createTourHTML(
  steps: Array<{
    title: string
    description: string
    placement?: "top" | "bottom" | "left" | "right"
    active?: boolean
  }>,
  options: { open?: boolean } = {},
): string {
  const overlayClasses = tourOverlayClasses({ visible: options.open })

  const stepsHTML = steps
    .map((step, i) => {
      const stepCls = tourStepClasses({ placement: step.placement, active: step.active })
      const descriptionId = `tour-step-desc-${i}`

      return `
      <div
        class="${stepCls}"
        role="dialog"
        aria-label="${step.title}"
        aria-describedby="${descriptionId}"
      >
        <button class="pm-tour__step-close" aria-label="Close tour">&#215;</button>
        <div class="pm-tour__step-title">${step.title}</div>
        <div class="pm-tour__step-description" id="${descriptionId}">${step.description}</div>
        <div class="pm-tour__step-actions">
          <span class="pm-tour__step-counter">${i + 1} of ${steps.length}</span>
          <div>
            ${i > 0 ? '<button aria-label="Previous step">Back</button>' : ""}
            ${i < steps.length - 1 ? '<button aria-label="Next step">Next</button>' : '<button aria-label="Finish tour">Finish</button>'}
          </div>
        </div>
      </div>
    `
    })
    .join("")

  return `
    <div class="pm-tour${options.open ? " pm-tour--open" : ""}">
      <div class="${overlayClasses}"></div>
      ${stepsHTML}
    </div>
  `
}

describe("tour accessibility", () => {
  const defaultSteps = [
    {
      title: "Welcome",
      description: "Welcome to the tour",
      placement: "bottom" as const,
      active: true,
    },
    { title: "Features", description: "Explore features", placement: "right" as const },
    { title: "Done", description: "You are all set", placement: "top" as const },
  ]

  it("tour steps have role=dialog", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTourHTML(defaultSteps, { open: true })}</body>`,
    )
    const dialogs = dom.window.document.querySelectorAll('[role="dialog"]')
    expect(dialogs.length).toBe(3)
  })

  it("tour steps have aria-label with title", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTourHTML(defaultSteps, { open: true })}</body>`,
    )
    const dialogs = dom.window.document.querySelectorAll('[role="dialog"]')
    expect(dialogs[0]?.getAttribute("aria-label")).toBe("Welcome")
    expect(dialogs[1]?.getAttribute("aria-label")).toBe("Features")
    expect(dialogs[2]?.getAttribute("aria-label")).toBe("Done")
  })

  it("tour steps have aria-describedby pointing to description", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTourHTML(defaultSteps, { open: true })}</body>`,
    )
    const dialogs = dom.window.document.querySelectorAll('[role="dialog"]')

    dialogs.forEach((dialog, i) => {
      const describedBy = dialog.getAttribute("aria-describedby")
      expect(describedBy).toBe(`tour-step-desc-${i}`)

      const description = dom.window.document.getElementById(describedBy!)
      expect(description).not.toBeNull()
      expect(description?.textContent).toBeTruthy()
    })
  })

  it("each tour step has a close button", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTourHTML(defaultSteps, { open: true })}</body>`,
    )
    const closeBtns = dom.window.document.querySelectorAll(".pm-tour__step-close")
    expect(closeBtns.length).toBe(3)
  })

  it("close button has aria-label", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTourHTML(defaultSteps, { open: true })}</body>`,
    )
    const closeBtns = dom.window.document.querySelectorAll(".pm-tour__step-close")
    closeBtns.forEach((btn) => {
      expect(btn.getAttribute("aria-label")).toBe("Close tour")
    })
  })

  it("navigation buttons have aria-labels", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTourHTML(defaultSteps, { open: true })}</body>`,
    )
    const buttons = dom.window.document.querySelectorAll("button")
    const navLabels = Array.from(buttons)
      .map((btn) => btn.getAttribute("aria-label"))
      .filter(Boolean)

    expect(navLabels).toContain("Next step")
    expect(navLabels).toContain("Close tour")
  })

  it("last step has finish button", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTourHTML(defaultSteps, { open: true })}</body>`,
    )
    const buttons = dom.window.document.querySelectorAll("button")
    const finishBtn = Array.from(buttons).find(
      (btn) => btn.getAttribute("aria-label") === "Finish tour",
    )
    expect(finishBtn).not.toBeUndefined()
  })

  it("step counter shows current position", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTourHTML(defaultSteps, { open: true })}</body>`,
    )
    const counters = dom.window.document.querySelectorAll(".pm-tour__step-counter")
    expect(counters[0]?.textContent).toBe("1 of 3")
    expect(counters[1]?.textContent).toBe("2 of 3")
    expect(counters[2]?.textContent).toBe("3 of 3")
  })

  it("description ids are unique", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTourHTML(defaultSteps, { open: true })}</body>`,
    )
    const descriptions = dom.window.document.querySelectorAll(".pm-tour__step-description")
    const ids = Array.from(descriptions).map((d) => d.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("active step has active class", () => {
    const dom = new JSDOM(
      `<!DOCTYPE html><body>${createTourHTML(defaultSteps, { open: true })}</body>`,
    )
    const activeSteps = dom.window.document.querySelectorAll(".pm-tour__step--active")
    expect(activeSteps.length).toBe(1)
  })
})
