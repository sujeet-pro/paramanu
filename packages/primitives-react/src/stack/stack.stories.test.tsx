import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./stack.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Stack Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-stack")).toBeTruthy()
  })

  it("Vertical applies vertical direction class", () => {
    const { container } = render(<composed.Vertical />)
    expect(container.querySelector(".pm-stack--vertical")).toBeTruthy()
  })

  it("Horizontal applies horizontal direction class", () => {
    const { container } = render(<composed.Horizontal />)
    expect(container.querySelector(".pm-stack--horizontal")).toBeTruthy()
  })

  it("WithSeparator applies separator class", () => {
    const { container } = render(<composed.WithSeparator />)
    expect(container.querySelector(".pm-stack--separator")).toBeTruthy()
  })

  it("HStackExample renders with horizontal direction", () => {
    const { container } = render(<composed.HStackExample />)
    expect(container.querySelector(".pm-stack--horizontal")).toBeTruthy()
  })

  it("VStackExample renders with vertical direction", () => {
    const { container } = render(<composed.VStackExample />)
    expect(container.querySelector(".pm-stack--vertical")).toBeTruthy()
  })
})
