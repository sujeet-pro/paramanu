import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./pin-input.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("PinInput Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("group")).toBeTruthy()
  })

  it("Playground renders 4 input fields", () => {
    render(<composed.Playground />)
    const inputs = screen.getAllByRole("textbox")
    expect(inputs.length).toBe(4)
  })

  it("SixDigits renders 6 input fields", () => {
    render(<composed.SixDigits />)
    const inputs = screen.getAllByRole("textbox")
    expect(inputs.length).toBe(6)
  })

  it("Disabled variant disables all inputs", () => {
    render(<composed.Disabled />)
    const inputs = screen.getAllByRole("textbox")
    inputs.forEach((input) => {
      expect(input).toBeDisabled()
    })
  })
})
