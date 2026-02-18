import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./client-only.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("ClientOnly Stories", () => {
  it("Playground renders client content", () => {
    const { container } = render(<composed.Playground />)
    expect(container.textContent).toContain("Client-only content")
  })
})
