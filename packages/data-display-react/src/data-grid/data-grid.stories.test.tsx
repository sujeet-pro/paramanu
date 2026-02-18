import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./data-grid.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("DataGrid Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-data-grid")).toBeTruthy()
  })

  it("Bordered applies correct class", () => {
    const { container } = render(<composed.Bordered />)
    expect(container.querySelector(".pm-data-grid--bordered")).toBeTruthy()
  })
})
