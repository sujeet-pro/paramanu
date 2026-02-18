import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./drawer.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Drawer Stories", () => {
  it("Playground renders when open", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-drawer")).toBeTruthy()
  })

  it("StartPlacement applies correct class", () => {
    const { container } = render(<composed.StartPlacement />)
    expect(container.querySelector(".pm-drawer--start")).toBeTruthy()
  })
})
