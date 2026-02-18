import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./radio.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Radio Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("radio")).toBeTruthy()
  })

  it("Disabled radio is disabled", () => {
    render(<composed.Disabled />)
    expect(screen.getByRole("radio")).toBeDisabled()
  })

  it("Group renders multiple radios", () => {
    render(<composed.Group />)
    expect(screen.getByRole("radiogroup")).toBeTruthy()
    expect(screen.getAllByRole("radio").length).toBe(3)
  })

  it("HorizontalGroup renders with radiogroup role", () => {
    render(<composed.HorizontalGroup />)
    expect(screen.getByRole("radiogroup")).toBeTruthy()
  })
})
