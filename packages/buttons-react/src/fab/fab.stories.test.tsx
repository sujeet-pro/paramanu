import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./fab.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Fab Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("AllSizes renders all size variants", () => {
    render(<composed.AllSizes />)
    const buttons = screen.getAllByRole("button")
    expect(buttons.length).toBe(3)
  })

  it("Disabled renders as disabled", () => {
    render(<composed.Disabled />)
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("Extended renders with text content", () => {
    render(<composed.Extended />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("Accessibility has correct aria-label", () => {
    render(<composed.Accessibility />)
    expect(screen.getByRole("button", { name: "Create new document" })).toBeInTheDocument()
  })
})
