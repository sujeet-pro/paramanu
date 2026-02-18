import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./kbd.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Kbd Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-kbd")).toBeTruthy()
  })

  it("Playground renders kbd element", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("kbd")).toBeTruthy()
  })

  it("Sizes renders all size variants", () => {
    const { container } = render(<composed.Sizes />)
    expect(container.querySelector(".pm-kbd--xs")).toBeTruthy()
    expect(container.querySelector(".pm-kbd--lg")).toBeTruthy()
  })

  it("Outline applies outline variant class", () => {
    const { container } = render(<composed.Outline />)
    expect(container.querySelector(".pm-kbd--outline")).toBeTruthy()
  })

  it("Subtle applies subtle variant class", () => {
    const { container } = render(<composed.Subtle />)
    expect(container.querySelector(".pm-kbd--subtle")).toBeTruthy()
  })
})
