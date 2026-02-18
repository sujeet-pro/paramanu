import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./inline-message.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("InlineMessage Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("Danger renders with alert role", () => {
    render(<composed.Danger />)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("AllVariantsAndSizes renders all combinations", () => {
    render(<composed.AllVariantsAndSizes />)
    // 4 variants x 2 sizes = 8
    expect(screen.getAllByText(/\//).length).toBe(8)
  })

  it("FormFieldHint renders as form validation", () => {
    render(<composed.FormFieldHint />)
    expect(screen.getByText("Please enter a valid email address.")).toBeInTheDocument()
  })
})
