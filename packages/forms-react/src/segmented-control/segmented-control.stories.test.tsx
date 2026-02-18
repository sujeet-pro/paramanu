import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./segmented-control.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("SegmentedControl Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("radiogroup")).toBeTruthy()
  })

  it("Playground renders segment buttons", () => {
    render(<composed.Playground />)
    expect(screen.getByText("Day")).toBeTruthy()
    expect(screen.getByText("Week")).toBeTruthy()
    expect(screen.getByText("Month")).toBeTruthy()
  })

  it("FullWidth renders with radiogroup role", () => {
    render(<composed.FullWidth />)
    expect(screen.getByRole("radiogroup")).toBeTruthy()
  })
})
