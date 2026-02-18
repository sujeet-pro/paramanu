import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./presence.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Presence Stories", () => {
  it("Playground renders when present", () => {
    const { container } = render(<composed.Playground />)
    expect(container.textContent).toContain("Animated content")
  })
})
