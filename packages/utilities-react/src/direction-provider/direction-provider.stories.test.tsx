import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./direction-provider.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("DirectionProvider Stories", () => {
  it("Playground renders direction controls", () => {
    const { container } = render(<composed.Playground />)
    expect(container.textContent).toContain("Current direction")
  })

  it("RTL renders", () => {
    const { container } = render(<composed.RTL />)
    expect(container.textContent).toContain("Current direction")
  })
})
