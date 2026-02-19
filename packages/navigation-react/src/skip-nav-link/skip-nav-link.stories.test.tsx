import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./skip-nav-link.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("SkipLink Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByText("Skip to main content")).toBeTruthy()
  })

  it("Default has correct href", () => {
    render(<composed.Default />)
    const link = screen.getByText("Skip to main content")
    expect(link.getAttribute("href")).toBe("#main-content")
  })

  it("CustomText renders custom label", () => {
    render(<composed.CustomText />)
    expect(screen.getByText("Skip to content")).toBeTruthy()
  })
})
