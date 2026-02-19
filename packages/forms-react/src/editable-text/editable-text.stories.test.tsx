import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./editable-text.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Editable Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByText("Click to edit")).toBeTruthy()
  })

  it("Editing mode renders an input", () => {
    render(<composed.Editing />)
    expect(screen.getByDisplayValue("Editing mode")).toBeTruthy()
  })

  it("Disabled has aria-disabled", () => {
    render(<composed.Disabled />)
    expect(screen.getByRole("group").getAttribute("aria-disabled")).toBe("true")
  })
})
