import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./progress-bar.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Progress Stories", () => {
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

  it("WithLabel shows percentage text", () => {
    render(<composed.WithLabel />)
    expect(screen.getByText("65%")).toBeInTheDocument()
  })

  it("Indeterminate has no aria-valuenow", () => {
    render(<composed.Indeterminate />)
    expect(screen.getByRole("progressbar")).not.toHaveAttribute("aria-valuenow")
  })

  it("Complete shows 100%", () => {
    render(<composed.Complete />)
    expect(screen.getByText("100%")).toBeInTheDocument()
  })

  it("Accessibility has correct ARIA attributes", () => {
    render(<composed.Accessibility />)
    const bar = screen.getByRole("progressbar")
    expect(bar).toHaveAttribute("aria-valuenow", "42")
    expect(bar).toHaveAttribute("aria-valuemin", "0")
    expect(bar).toHaveAttribute("aria-valuemax", "100")
  })
})
