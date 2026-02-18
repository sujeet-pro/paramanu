import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./search-input.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("SearchInput Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByPlaceholderText("Search...")).toBeTruthy()
  })

  it("Search input has role search", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("search")).toBeTruthy()
  })

  it("Disabled search input is disabled", () => {
    render(<composed.Disabled />)
    const input = screen.getByPlaceholderText("Search disabled...")
    expect(input).toBeDisabled()
  })

  it("Input has type search", () => {
    render(<composed.Playground />)
    const input = screen.getByPlaceholderText("Search...")
    expect(input).toHaveAttribute("type", "search")
  })
})
