import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./date-picker.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("DatePicker Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("combobox")).toBeTruthy()
  })

  it("Disabled date picker is disabled", () => {
    render(<composed.Disabled />)
    expect(screen.getByRole("combobox")).toBeDisabled()
  })

  it("Has dialog popup", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("combobox").getAttribute("aria-haspopup")).toBe("dialog")
  })
})
