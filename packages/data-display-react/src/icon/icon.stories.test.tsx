import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./icon.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Icon Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-icon")).toBeTruthy()
  })

  it("Decorative icon has aria-hidden", () => {
    const { container } = render(<composed.Decorative />)
    expect(container.querySelector("[aria-hidden='true']")).toBeTruthy()
  })
})
