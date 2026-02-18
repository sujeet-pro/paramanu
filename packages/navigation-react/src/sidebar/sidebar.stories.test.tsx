import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./sidebar.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Sidebar Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("navigation")).toBeTruthy()
  })

  it("Default renders active item", () => {
    render(<composed.Default />)
    expect(screen.getByText("Home")).toBeTruthy()
  })

  it("WithIndentation renders nested items", () => {
    render(<composed.WithIndentation />)
    expect(screen.getByText("Level 3")).toBeTruthy()
  })
})
