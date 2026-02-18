import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./context-menu.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("ContextMenu Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("menu")).toBeTruthy()
  })

  it("Default renders items", () => {
    render(<composed.Default />)
    expect(screen.getByText("Inspect")).toBeTruthy()
  })

  it("Closed story still renders the menu element", () => {
    render(<composed.Closed />)
    expect(screen.getByRole("menu")).toBeTruthy()
  })
})
