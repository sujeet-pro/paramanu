import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./tour.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Tour Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("dialog")).toBeTruthy()
  })

  it("Default renders step content", () => {
    render(<composed.Default />)
    expect(screen.getByText("Introduction to the feature.")).toBeTruthy()
  })

  it("WithOverlay renders dialog", () => {
    render(<composed.WithOverlay />)
    expect(screen.getByRole("dialog")).toBeTruthy()
  })
})
