import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./highlight.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Highlight Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-highlight")).toBeTruthy()
  })

  it("Playground renders mark element", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("mark")).toBeTruthy()
  })

  it("Colors renders all color variants", () => {
    const { container } = render(<composed.Colors />)
    expect(container.querySelector(".pm-highlight--primary")).toBeTruthy()
    expect(container.querySelector(".pm-highlight--danger")).toBeTruthy()
  })

  it("Outline applies outline variant class", () => {
    const { container } = render(<composed.Outline />)
    expect(container.querySelector(".pm-highlight--outline")).toBeTruthy()
  })

  it("TextVariant applies text variant class", () => {
    const { container } = render(<composed.TextVariant />)
    expect(container.querySelector(".pm-highlight--text")).toBeTruthy()
  })
})
