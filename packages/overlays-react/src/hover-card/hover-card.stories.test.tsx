import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./hover-card.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("HoverCard Stories", () => {
  it("Playground renders when open", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-hover-card")).toBeTruthy()
  })

  it("TopPlacement applies correct class", () => {
    const { container } = render(<composed.TopPlacement />)
    expect(container.querySelector(".pm-hover-card--top")).toBeTruthy()
  })
})
