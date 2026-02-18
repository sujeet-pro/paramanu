import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./blockquote.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Blockquote Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-blockquote")).toBeTruthy()
  })

  it("WithCitation renders cite element", () => {
    const { container } = render(<composed.WithCitation />)
    expect(container.querySelector("cite")).toBeTruthy()
  })

  it("Accent applies accent variant class", () => {
    const { container } = render(<composed.Accent />)
    expect(container.querySelector(".pm-blockquote--accent")).toBeTruthy()
  })

  it("Filled applies filled variant class", () => {
    const { container } = render(<composed.Filled />)
    expect(container.querySelector(".pm-blockquote--filled")).toBeTruthy()
  })

  it("WithIcon applies with-icon class", () => {
    const { container } = render(<composed.WithIcon />)
    expect(container.querySelector(".pm-blockquote--with-icon")).toBeTruthy()
  })
})
