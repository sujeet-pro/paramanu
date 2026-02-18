import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./button.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Button Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("Primary renders with correct text", () => {
    render(<composed.Primary />)
    expect(screen.getByRole("button", { name: "Primary" })).toBeInTheDocument()
  })

  it("Secondary renders with correct text", () => {
    render(<composed.Secondary />)
    expect(screen.getByRole("button", { name: "Secondary" })).toBeInTheDocument()
  })

  it("Danger renders with correct text", () => {
    render(<composed.Danger />)
    expect(screen.getByRole("button", { name: "Danger" })).toBeInTheDocument()
  })

  it("Ghost renders with correct text", () => {
    render(<composed.Ghost />)
    expect(screen.getByRole("button", { name: "Ghost" })).toBeInTheDocument()
  })

  it("Disabled renders as disabled", () => {
    render(<composed.Disabled />)
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("Loading renders with aria-busy", () => {
    render(<composed.Loading />)
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true")
  })

  it("FullWidth renders without crashing", () => {
    render(<composed.FullWidth />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("AllVariantsAndSizes renders all combinations", () => {
    render(<composed.AllVariantsAndSizes />)
    const buttons = screen.getAllByRole("button")
    expect(buttons.length).toBe(30) // 6 variants x 5 sizes
  })

  it("States renders all state buttons", () => {
    render(<composed.States />)
    const buttons = screen.getAllByRole("button")
    expect(buttons.length).toBeGreaterThanOrEqual(4)
  })

  it("Accessibility story has correct aria-label", () => {
    render(<composed.Accessibility />)
    expect(screen.getByRole("button", { name: "Perform action" })).toBeInTheDocument()
  })
})
