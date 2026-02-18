import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./close-button.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("CloseButton Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("AllSizes renders all size variants", () => {
    render(<composed.AllSizes />)
    const buttons = screen.getAllByRole("button")
    expect(buttons.length).toBe(4)
  })

  it("Disabled renders as disabled", () => {
    render(<composed.Disabled />)
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("default aria-label is Close", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument()
  })

  it("Accessibility has custom aria-label", () => {
    render(<composed.Accessibility />)
    expect(screen.getByRole("button", { name: "Close dialog" })).toBeInTheDocument()
  })
})
