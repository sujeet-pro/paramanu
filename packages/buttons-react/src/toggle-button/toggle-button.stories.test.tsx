import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./toggle-button.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("ToggleButton Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("Pressed has aria-pressed true", () => {
    render(<composed.Pressed />)
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "true")
  })

  it("NotPressed has aria-pressed false", () => {
    render(<composed.NotPressed />)
    expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false")
  })

  it("Disabled renders as disabled", () => {
    render(<composed.Disabled />)
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("AllVariantsAndSizes renders all combinations", () => {
    render(<composed.AllVariantsAndSizes />)
    const buttons = screen.getAllByRole("button")
    expect(buttons.length).toBe(10) // 2 variants x 5 sizes
  })

  it("States renders all state buttons", () => {
    render(<composed.States />)
    const buttons = screen.getAllByRole("button")
    expect(buttons.length).toBe(4)
  })
})
