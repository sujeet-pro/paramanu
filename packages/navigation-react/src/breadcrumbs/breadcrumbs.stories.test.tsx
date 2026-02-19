import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./breadcrumbs.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Breadcrumb Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeTruthy()
  })

  it("LongPath renders all items", () => {
    render(<composed.LongPath />)
    expect(screen.getByText("Details")).toBeTruthy()
    expect(screen.getByText("Home")).toBeTruthy()
  })

  it("Active item has aria-current", () => {
    render(<composed.Slash />)
    const current = screen.getByText("Page")
    expect(current.closest("[aria-current]")).toBeTruthy()
  })
})
