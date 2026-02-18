import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./theme-provider.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("ThemeProvider Stories", () => {
  it("Playground renders theme controls", () => {
    const { container } = render(<composed.Playground />)
    expect(container.textContent).toContain("Current theme")
  })

  it("DarkDefault renders", () => {
    const { container } = render(<composed.DarkDefault />)
    expect(container.textContent).toContain("Current theme")
  })
})
