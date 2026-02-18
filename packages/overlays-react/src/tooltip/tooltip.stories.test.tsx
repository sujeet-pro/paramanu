import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./tooltip.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Tooltip Stories", () => {
  it("Playground renders", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("[role='tooltip']")).toBeTruthy()
  })

  it("BottomPlacement applies correct class", () => {
    const { container } = render(<composed.BottomPlacement />)
    expect(container.querySelector(".pm-tooltip--bottom")).toBeTruthy()
  })
})
