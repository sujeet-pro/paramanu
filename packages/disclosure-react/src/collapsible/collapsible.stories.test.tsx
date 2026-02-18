import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./collapsible.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Collapsible Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("button", { name: "Toggle Content" })).toBeTruthy()
  })

  it("DefaultOpen starts expanded", () => {
    render(<composed.DefaultOpen />)
    const trigger = screen.getByRole("button", { name: "Open by Default" })
    expect(trigger.getAttribute("aria-expanded")).toBe("true")
  })

  it("Disabled trigger is disabled", () => {
    render(<composed.Disabled />)
    const trigger = screen.getByRole("button", { name: "Cannot Toggle" })
    expect(trigger).toBeDisabled()
  })
})
