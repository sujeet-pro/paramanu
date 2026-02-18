import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./steps.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Steps Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("list", { name: "Progress" })).toBeTruthy()
  })

  it("ActiveStepAccessibility renders progress list", () => {
    render(<composed.ActiveStepAccessibility />)
    expect(screen.getByText("Current")).toBeTruthy()
  })

  it("AllComplete renders completed steps", () => {
    render(<composed.AllComplete />)
    expect(screen.getByText("Step 1")).toBeTruthy()
    expect(screen.getByText("Step 3")).toBeTruthy()
  })
})
