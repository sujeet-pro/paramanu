import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./locale-provider.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("LocaleProvider Stories", () => {
  it("Playground renders locale controls", () => {
    const { container } = render(<composed.Playground />)
    expect(container.textContent).toContain("Current locale")
  })

  it("German renders", () => {
    const { container } = render(<composed.German />)
    expect(container.textContent).toContain("Current locale")
  })
})
