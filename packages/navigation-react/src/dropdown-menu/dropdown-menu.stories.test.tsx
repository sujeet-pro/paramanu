import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./dropdown-menu.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Dropdown Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("button", { name: "Options" })).toBeTruthy()
  })

  it("Open story shows content", () => {
    render(<composed.Open />)
    expect(screen.getByRole("menu")).toBeTruthy()
  })

  it("TriggerAccessibility has correct ARIA", () => {
    render(<composed.TriggerAccessibility />)
    const trigger = screen.getByRole("button", { name: "Menu" })
    expect(trigger.getAttribute("aria-haspopup")).toBe("true")
  })
})
