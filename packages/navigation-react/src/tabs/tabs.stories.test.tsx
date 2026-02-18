import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./tabs.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Tabs Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("tablist")).toBeTruthy()
  })

  it("WithDisabled has disabled tab", () => {
    render(<composed.WithDisabled />)
    const disabledTab = screen.getByRole("tab", { name: "Disabled" })
    expect(disabledTab).toBeDisabled()
  })

  it("Active tab has aria-selected", () => {
    render(<composed.Line />)
    const activeTab = screen.getByRole("tab", { name: "Active" })
    expect(activeTab.getAttribute("aria-selected")).toBe("true")
  })
})
