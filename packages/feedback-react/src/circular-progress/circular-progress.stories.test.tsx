import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./circular-progress.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("RingProgress Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })

  it("AllVariants renders all four", () => {
    render(<composed.AllVariants />)
    expect(screen.getAllByRole("progressbar").length).toBe(4)
  })

  it("AllSizes renders all four", () => {
    render(<composed.AllSizes />)
    expect(screen.getAllByRole("progressbar").length).toBe(4)
  })

  it("Indeterminate has no aria-valuenow", () => {
    render(<composed.Indeterminate />)
    expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow")
  })

  it("Accessibility has correct ARIA", () => {
    render(<composed.Accessibility />)
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "42")
  })
})
