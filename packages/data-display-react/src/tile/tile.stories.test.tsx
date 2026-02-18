import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./tile.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Tile Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-tile")).toBeTruthy()
  })

  it("Selected tile has aria-selected", () => {
    const { container } = render(<composed.Selected />)
    expect(container.querySelector("[aria-selected='true']")).toBeTruthy()
  })

  it("Disabled tile is disabled", () => {
    const { container } = render(<composed.Disabled />)
    const btn = container.querySelector("button")
    expect(btn?.disabled).toBe(true)
  })
})
