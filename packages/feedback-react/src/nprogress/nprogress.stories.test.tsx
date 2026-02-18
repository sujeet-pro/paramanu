import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./nprogress.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("NProgress Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })

  it("Active renders with aria-valuenow", () => {
    render(<composed.Active />)
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "40")
  })

  it("Complete shows 100%", () => {
    render(<composed.Complete />)
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100")
  })

  it("States renders multiple progress bars", () => {
    render(<composed.States />)
    expect(screen.getAllByRole("progressbar").length).toBe(3)
  })

  it("Accessibility has correct ARIA attributes", () => {
    render(<composed.Accessibility />)
    const bar = screen.getByRole("progressbar")
    expect(bar).toHaveAttribute("aria-valuenow", "42")
    expect(bar).toHaveAttribute("aria-valuemin", "0")
    expect(bar).toHaveAttribute("aria-valuemax", "100")
  })
})
