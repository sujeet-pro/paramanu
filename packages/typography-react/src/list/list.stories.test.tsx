import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./list.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("List Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-list")).toBeTruthy()
  })

  it("Playground renders ul element by default", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("ul")).toBeTruthy()
  })

  it("Ordered renders ol element", () => {
    const { container } = render(<composed.Ordered />)
    expect(container.querySelector("ol")).toBeTruthy()
    expect(container.querySelector(".pm-list--ordered")).toBeTruthy()
  })

  it("Square applies square style class", () => {
    const { container } = render(<composed.Square />)
    expect(container.querySelector(".pm-list--style-square")).toBeTruthy()
  })

  it("Unstyled applies unstyled class", () => {
    const { container } = render(<composed.Unstyled />)
    expect(container.querySelector(".pm-list--unstyled")).toBeTruthy()
  })
})
