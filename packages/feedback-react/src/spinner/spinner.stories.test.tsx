import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./spinner.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Spinner Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("AllSizes renders all five", () => {
    render(<composed.AllSizes />)
    expect(screen.getAllByRole("status").length).toBe(5)
  })

  it("AllVariantsAndSizes renders all combinations", () => {
    render(<composed.AllVariantsAndSizes />)
    expect(screen.getAllByRole("status").length).toBe(10) // 2 x 5
  })

  it("has visually hidden Loading text", () => {
    render(<composed.Playground />)
    expect(screen.getByText("Loading")).toBeInTheDocument()
  })
})
