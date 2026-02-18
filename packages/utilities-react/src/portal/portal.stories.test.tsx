import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./portal.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Portal Stories", () => {
  it("Playground renders", () => {
    const { container } = render(<composed.Playground />)
    expect(container).toBeTruthy()
  })

  it("Disabled renders in-place", () => {
    const { container } = render(<composed.Disabled />)
    expect(container.textContent).toContain("Portalled content")
  })
})
