import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./masonry.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Masonry Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-masonry")).toBeTruthy()
  })

  it("TwoColumns applies 2 column class", () => {
    const { container } = render(<composed.TwoColumns />)
    expect(container.querySelector(".pm-masonry--cols-2")).toBeTruthy()
  })

  it("FourColumns applies 4 column class", () => {
    const { container } = render(<composed.FourColumns />)
    expect(container.querySelector(".pm-masonry--cols-4")).toBeTruthy()
  })
})
