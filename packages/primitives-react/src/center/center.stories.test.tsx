import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./center.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Center Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-center")).toBeTruthy()
  })

  it("Inline applies inline class", () => {
    const { container } = render(<composed.Inline />)
    expect(container.querySelector(".pm-center--inline")).toBeTruthy()
  })

  it("WithTextCenter applies text class", () => {
    const { container } = render(<composed.WithTextCenter />)
    expect(container.querySelector(".pm-center--text")).toBeTruthy()
  })
})
