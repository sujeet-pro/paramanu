import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./aspect-ratio.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Aspect Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-aspect")).toBeTruthy()
  })

  it("Square applies 1-1 ratio class", () => {
    const { container } = render(<composed.Square />)
    expect(container.querySelector(".pm-aspect--1-1")).toBeTruthy()
  })

  it("Widescreen applies 16-9 ratio class", () => {
    const { container } = render(<composed.Widescreen />)
    expect(container.querySelector(".pm-aspect--16-9")).toBeTruthy()
  })
})
