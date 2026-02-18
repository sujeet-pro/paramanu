import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./focus-trap.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("FocusTrap Stories", () => {
  it("Playground renders with buttons", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelectorAll("button").length).toBeGreaterThanOrEqual(3)
  })
})
