import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./input.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Input Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByPlaceholderText("Enter text...")).toBeTruthy()
  })

  it("Outline variant renders", () => {
    render(<composed.Outline />)
    expect(screen.getByPlaceholderText("Outline input")).toBeTruthy()
  })

  it("Disabled input has disabled attribute", () => {
    render(<composed.Disabled />)
    const input = screen.getByPlaceholderText("Disabled input")
    expect(input).toBeDisabled()
  })

  it("Invalid input has aria-invalid", () => {
    render(<composed.Invalid />)
    const input = screen.getByPlaceholderText("Invalid input")
    expect(input.getAttribute("aria-invalid")).toBe("true")
  })

  it("ReadOnly input has readOnly attribute", () => {
    render(<composed.ReadOnly />)
    const input = screen.getByDisplayValue("Read-only value")
    expect(input).toHaveAttribute("readonly")
  })
})
