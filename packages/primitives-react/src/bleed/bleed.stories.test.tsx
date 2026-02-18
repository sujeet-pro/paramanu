import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./bleed.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Bleed Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-bleed")).toBeTruthy()
  })

  it("InlineBleed applies inline class", () => {
    const { container } = render(<composed.InlineBleed />)
    expect(container.querySelector(".pm-bleed--inline-4")).toBeTruthy()
  })

  it("BlockBleed applies block class", () => {
    const { container } = render(<composed.BlockBleed />)
    expect(container.querySelector(".pm-bleed--block-4")).toBeTruthy()
  })
})
