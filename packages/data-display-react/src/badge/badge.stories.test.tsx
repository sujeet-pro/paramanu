import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./badge.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Badge Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-badge")).toBeTruthy()
  })

  it("Pill variant applies correct class", () => {
    const { container } = render(<composed.Pill />)
    expect(container.querySelector(".pm-badge--pill")).toBeTruthy()
  })

  it("Danger color applies correct class", () => {
    const { container } = render(<composed.Danger />)
    expect(container.querySelector(".pm-badge--danger")).toBeTruthy()
  })
})
