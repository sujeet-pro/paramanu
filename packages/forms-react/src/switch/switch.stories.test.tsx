import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./switch.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Switch Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("switch")).toBeTruthy()
    expect(screen.getByText("Dark mode")).toBeTruthy()
  })

  it("Disabled switch is disabled", () => {
    render(<composed.Disabled />)
    expect(screen.getByRole("switch")).toBeDisabled()
  })

  it("Checked switch is checked", () => {
    render(<composed.Checked />)
    expect(screen.getByRole("switch")).toBeChecked()
  })
})
