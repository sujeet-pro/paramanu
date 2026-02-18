import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./float.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Float Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-float")).toBeTruthy()
  })

  it("TopEnd applies top-end placement", () => {
    const { container } = render(<composed.TopEnd />)
    expect(container.querySelector(".pm-float--top-end")).toBeTruthy()
  })

  it("BottomStart applies bottom-start placement", () => {
    const { container } = render(<composed.BottomStart />)
    expect(container.querySelector(".pm-float--bottom-start")).toBeTruthy()
  })

  it("WithOffset applies offset class", () => {
    const { container } = render(<composed.WithOffset />)
    expect(container.querySelector(".pm-float--offset-2")).toBeTruthy()
  })
})
