import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./aspect-ratio.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("AspectRatio Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-aspect-ratio")).toBeTruthy()
  })

  it("Square applies 1-1 ratio class", () => {
    const { container } = render(<composed.Square />)
    expect(container.querySelector(".pm-aspect-ratio--1-1")).toBeTruthy()
  })

  it("Widescreen applies 16-9 ratio class", () => {
    const { container } = render(<composed.Widescreen />)
    expect(container.querySelector(".pm-aspect-ratio--16-9")).toBeTruthy()
  })
})
