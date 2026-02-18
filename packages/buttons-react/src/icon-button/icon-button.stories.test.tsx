import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./icon-button.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("IconButton Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("Primary renders with aria-label", () => {
    render(<composed.Primary />)
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument()
  })

  it("Disabled renders as disabled", () => {
    render(<composed.Disabled />)
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("Loading renders with aria-busy", () => {
    render(<composed.Loading />)
    expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true")
  })

  it("AllVariantsAndSizes renders all combinations", () => {
    render(<composed.AllVariantsAndSizes />)
    const buttons = screen.getAllByRole("button")
    expect(buttons.length).toBe(25) // 5 variants x 5 sizes
  })

  it("Accessibility has correct aria-label", () => {
    render(<composed.Accessibility />)
    expect(screen.getByRole("button", { name: "Favorite item" })).toBeInTheDocument()
  })
})
