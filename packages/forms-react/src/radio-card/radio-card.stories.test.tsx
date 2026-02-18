import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./radio-card.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("RadioCard Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("radio")).toBeTruthy()
    expect(screen.getByText("Option A")).toBeTruthy()
  })

  it("Disabled card has disabled radio", () => {
    render(<composed.Disabled />)
    expect(screen.getByRole("radio")).toBeDisabled()
  })

  it("Checked card has checked radio", () => {
    render(<composed.Checked />)
    expect(screen.getByRole("radio")).toBeChecked()
  })

  it("CardGroup renders multiple radio cards", () => {
    render(<composed.CardGroup />)
    expect(screen.getAllByRole("radio").length).toBe(3)
  })
})
