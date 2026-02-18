import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./divider.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Divider Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-divider")).toBeTruthy()
  })

  it("Dashed applies dashed variant class", () => {
    const { container } = render(<composed.Dashed />)
    expect(container.querySelector(".pm-divider--dashed")).toBeTruthy()
  })

  it("WithLabel renders with label class", () => {
    const { container } = render(<composed.WithLabel />)
    expect(container.querySelector(".pm-divider--with-label")).toBeTruthy()
  })

  it("Vertical applies vertical orientation", () => {
    const { container } = render(<composed.Vertical />)
    expect(container.querySelector(".pm-divider--vertical")).toBeTruthy()
  })
})
