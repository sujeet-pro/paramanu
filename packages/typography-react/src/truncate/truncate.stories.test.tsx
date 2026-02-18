import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./truncate.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Truncate Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-truncate")).toBeTruthy()
  })

  it("SingleLine applies lines-1 class", () => {
    const { container } = render(<composed.SingleLine />)
    expect(container.querySelector(".pm-truncate--lines-1")).toBeTruthy()
  })

  it("MultiLine applies lines-3 class", () => {
    const { container } = render(<composed.MultiLine />)
    expect(container.querySelector(".pm-truncate--lines-3")).toBeTruthy()
  })

  it("StartPosition applies start class", () => {
    const { container } = render(<composed.StartPosition />)
    expect(container.querySelector(".pm-truncate--start")).toBeTruthy()
  })

  it("MiddlePosition applies middle class", () => {
    const { container } = render(<composed.MiddlePosition />)
    expect(container.querySelector(".pm-truncate--middle")).toBeTruthy()
  })
})
