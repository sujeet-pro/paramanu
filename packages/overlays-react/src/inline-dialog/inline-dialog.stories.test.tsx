import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./inline-dialog.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("InlineDialog Stories", () => {
  it("Playground renders when visible", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("[role='dialog']")).toBeTruthy()
  })

  it("Hidden applies correct class", () => {
    const { container } = render(<composed.Hidden />)
    const el = container.querySelector(".pm-inline-dialog")
    expect(el).toBeTruthy()
    expect(el?.className).not.toContain("pm-inline-dialog--visible")
  })
})
