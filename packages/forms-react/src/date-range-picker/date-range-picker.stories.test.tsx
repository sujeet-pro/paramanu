import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./date-range-picker.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Daterange Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-daterange")).toBeTruthy()
  })

  it("Disabled variant renders", () => {
    const { container } = render(<composed.Disabled />)
    expect(container.querySelector(".pm-daterange--disabled")).toBeTruthy()
  })
})
