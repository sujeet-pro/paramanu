import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./select.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Select Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("combobox")).toBeTruthy()
  })

  it("Disabled select has disabled trigger", () => {
    render(<composed.Disabled />)
    expect(screen.getByRole("combobox")).toBeDisabled()
  })

  it("Open select has aria-expanded true", () => {
    render(<composed.Open />)
    expect(screen.getByRole("combobox").getAttribute("aria-expanded")).toBe("true")
  })
})
