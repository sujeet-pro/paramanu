import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./splitter.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Splitter Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-splitter")).toBeTruthy()
  })

  it("Playground renders separator role", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("[role='separator']")).toBeTruthy()
  })

  it("Vertical applies vertical class", () => {
    const { container } = render(<composed.Vertical />)
    expect(container.querySelector(".pm-splitter--vertical")).toBeTruthy()
  })

  it("Disabled applies disabled class", () => {
    const { container } = render(<composed.Disabled />)
    expect(container.querySelector(".pm-splitter--disabled")).toBeTruthy()
  })
})
