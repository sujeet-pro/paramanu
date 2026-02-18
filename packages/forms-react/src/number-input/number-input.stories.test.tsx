import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./number-input.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("NumberInput Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("spinbutton")).toBeTruthy()
  })

  it("Increment and decrement buttons are present", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("button", { name: "Increment" })).toBeTruthy()
    expect(screen.getByRole("button", { name: "Decrement" })).toBeTruthy()
  })

  it("Disabled input has disabled attribute", () => {
    render(<composed.Disabled />)
    expect(screen.getByRole("spinbutton")).toBeDisabled()
  })

  it("Invalid input has aria-invalid", () => {
    render(<composed.Invalid />)
    expect(screen.getByRole("spinbutton").getAttribute("aria-invalid")).toBe("true")
  })
})
