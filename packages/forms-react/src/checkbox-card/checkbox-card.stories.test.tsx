import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./checkbox-card.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("ChkCard Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("checkbox")).toBeTruthy()
    expect(screen.getByText("Option A")).toBeTruthy()
  })

  it("Disabled card has disabled checkbox", () => {
    render(<composed.Disabled />)
    expect(screen.getByRole("checkbox")).toBeDisabled()
  })

  it("Checked card has checked checkbox", () => {
    render(<composed.Checked />)
    expect(screen.getByRole("checkbox")).toBeChecked()
  })
})
