import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./text.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Text Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-text")).toBeTruthy()
  })

  it("Sizes renders all size variants", () => {
    const { container } = render(<composed.Sizes />)
    expect(container.querySelector(".pm-text--size-xs")).toBeTruthy()
    expect(container.querySelector(".pm-text--size-3xl")).toBeTruthy()
  })

  it("Truncated applies truncate class", () => {
    const { container } = render(<composed.Truncated />)
    expect(container.querySelector(".pm-text--truncate")).toBeTruthy()
  })

  it("Italic applies italic class", () => {
    const { container } = render(<composed.Italic />)
    expect(container.querySelector(".pm-text--italic")).toBeTruthy()
  })
})
