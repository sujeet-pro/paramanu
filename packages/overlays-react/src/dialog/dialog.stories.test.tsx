import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./dialog.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Dialog Stories", () => {
  it("Playground renders when open", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("[role='dialog']")).toBeTruthy()
  })

  it("Centered applies correct class", () => {
    const { container } = render(<composed.Centered />)
    expect(container.querySelector(".pm-dialog--centered")).toBeTruthy()
  })

  it("Dialog has aria-modal", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("[aria-modal='true']")).toBeTruthy()
  })
})
