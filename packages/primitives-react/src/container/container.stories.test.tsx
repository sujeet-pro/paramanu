import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./container.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Container Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-container")).toBeTruthy()
  })

  it("Small applies sm size class", () => {
    const { container } = render(<composed.Small />)
    expect(container.querySelector(".pm-container--sm")).toBeTruthy()
  })

  it("Fluid applies fluid class", () => {
    const { container } = render(<composed.Fluid />)
    expect(container.querySelector(".pm-container--fluid")).toBeTruthy()
  })

  it("Centered applies center class", () => {
    const { container } = render(<composed.Centered />)
    expect(container.querySelector(".pm-container--center")).toBeTruthy()
  })
})
