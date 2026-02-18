import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./back-to-top.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("BackToTop Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("button", { name: "Back to top" })).toBeTruthy()
  })

  it("Accessibility has correct button type", () => {
    render(<composed.Accessibility />)
    const btn = screen.getByRole("button", { name: "Back to top" })
    expect(btn.getAttribute("type")).toBe("button")
  })

  it("Hidden story renders button", () => {
    render(<composed.Hidden />)
    expect(screen.getByRole("button", { name: "Back to top" })).toBeTruthy()
  })
})
