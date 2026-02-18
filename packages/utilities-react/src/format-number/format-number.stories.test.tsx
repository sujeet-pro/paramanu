import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./format-number.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("FormatNumber Stories", () => {
  it("Playground renders formatted number", () => {
    const { container } = render(<composed.Playground />)
    expect(container.textContent).toContain("1,234,567.89")
  })

  it("Percent renders", () => {
    const { container } = render(<composed.Percent />)
    expect(container.textContent).toContain("%")
  })
})
