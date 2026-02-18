import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./affix.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Affix Stories", () => {
  it("Playground renders with top position", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-affix--top")).toBeTruthy()
  })

  it("BottomPosition applies correct class", () => {
    const { container } = render(<composed.BottomPosition />)
    expect(container.querySelector(".pm-affix--bottom")).toBeTruthy()
  })

  it("WithOffset applies offset class", () => {
    const { container } = render(<composed.WithOffset />)
    expect(container.querySelector(".pm-affix--offset-4")).toBeTruthy()
  })
})
