import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./carousel.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Carousel Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("region", { name: "Example carousel" })).toBeTruthy()
  })

  it("WithControls has disabled prev button", () => {
    render(<composed.WithControls />)
    const prevBtn = screen.getByRole("button", { name: "Previous slide" })
    expect(prevBtn).toBeDisabled()
  })

  it("WithIndicators renders tab indicators", () => {
    render(<composed.WithIndicators />)
    const tabs = screen.getAllByRole("tab")
    expect(tabs.length).toBe(3)
  })
})
