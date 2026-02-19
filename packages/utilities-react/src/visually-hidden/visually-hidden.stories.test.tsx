import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./visually-hidden.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("SrOnly Stories", () => {
  it("Playground renders", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-sr-only")).toBeTruthy()
  })

  it("Focusable applies correct class", () => {
    const { container } = render(<composed.Focusable />)
    expect(container.querySelector(".pm-sr-only--focusable")).toBeTruthy()
  })
})
