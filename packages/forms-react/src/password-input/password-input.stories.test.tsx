import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./password-input.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("PwdInput Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByPlaceholderText("Enter password...")).toBeTruthy()
  })

  it("Input starts with type password", () => {
    render(<composed.Playground />)
    const input = screen.getByPlaceholderText("Enter password...")
    expect(input).toHaveAttribute("type", "password")
  })

  it("Disabled password input is disabled", () => {
    render(<composed.Disabled />)
    const input = screen.getByPlaceholderText("Disabled password")
    expect(input).toBeDisabled()
  })

  it("Toggle button is present", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("button", { name: /password/i })).toBeTruthy()
  })
})
