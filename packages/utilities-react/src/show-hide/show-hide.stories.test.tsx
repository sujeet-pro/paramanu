import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./show-hide.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("ShowHide Stories", () => {
  it("Playground renders visible", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-show")).toBeTruthy()
  })

  it("Hidden applies hide class", () => {
    const { container } = render(<composed.Hidden />)
    expect(container.querySelector(".pm-hide")).toBeTruthy()
  })
})
