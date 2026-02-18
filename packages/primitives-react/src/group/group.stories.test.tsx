import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./group.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Group Stories", () => {
  it("Playground renders with role=group", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("[role='group']")).toBeTruthy()
  })

  it("Vertical applies vertical orientation", () => {
    const { container } = render(<composed.Vertical />)
    expect(container.querySelector(".pm-group--vertical")).toBeTruthy()
  })

  it("Attached applies attached class", () => {
    const { container } = render(<composed.Attached />)
    expect(container.querySelector(".pm-group--attached")).toBeTruthy()
  })

  it("Grow applies grow class", () => {
    const { container } = render(<composed.Grow />)
    expect(container.querySelector(".pm-group--grow")).toBeTruthy()
  })
})
