import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./heading.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Heading Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-heading")).toBeTruthy()
  })

  it("Playground renders h2 by default", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("h2")).toBeTruthy()
  })

  it("Levels renders all heading levels", () => {
    const { container } = render(<composed.Levels />)
    expect(container.querySelector("h1")).toBeTruthy()
    expect(container.querySelector("h6")).toBeTruthy()
  })

  it("Centered applies align class", () => {
    const { container } = render(<composed.Centered />)
    expect(container.querySelector(".pm-heading--align-center")).toBeTruthy()
  })

  it("Primary applies color class", () => {
    const { container } = render(<composed.Primary />)
    expect(container.querySelector(".pm-heading--color-primary")).toBeTruthy()
  })
})
