import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./grid.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Grid Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-grid")).toBeTruthy()
  })

  it("ThreeColumns applies 3 column class", () => {
    const { container } = render(<composed.ThreeColumns />)
    expect(container.querySelector(".pm-grid--cols-3")).toBeTruthy()
  })

  it("FourColumns applies 4 column class", () => {
    const { container } = render(<composed.FourColumns />)
    expect(container.querySelector(".pm-grid--cols-4")).toBeTruthy()
  })

  it("MixedGap applies row and column gap classes", () => {
    const { container } = render(<composed.MixedGap />)
    expect(container.querySelector(".pm-grid--row-gap-6")).toBeTruthy()
    expect(container.querySelector(".pm-grid--col-gap-2")).toBeTruthy()
  })
})
