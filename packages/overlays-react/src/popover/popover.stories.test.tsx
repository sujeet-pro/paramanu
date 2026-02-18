import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./popover.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Popover Stories", () => {
  it("Playground renders when open", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-popover")).toBeTruthy()
  })

  it("WithArrow applies arrow element", () => {
    const { container } = render(<composed.WithArrow />)
    expect(container.querySelector(".pm-popover")).toBeTruthy()
  })
})
