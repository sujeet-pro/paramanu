import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./textarea.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Textarea Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByPlaceholderText("Enter text...")).toBeTruthy()
  })

  it("Disabled textarea has disabled attribute", () => {
    render(<composed.Disabled />)
    const textarea = screen.getByPlaceholderText("Disabled textarea")
    expect(textarea).toBeDisabled()
  })

  it("Invalid textarea has aria-invalid", () => {
    render(<composed.Invalid />)
    const textarea = screen.getByPlaceholderText("Invalid textarea")
    expect(textarea.getAttribute("aria-invalid")).toBe("true")
  })

  it("ReadOnly textarea has readonly attribute", () => {
    render(<composed.ReadOnly />)
    const textarea = screen.getByDisplayValue("Read-only content")
    expect(textarea).toHaveAttribute("readonly")
  })
})
