import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./data-table.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("DataTable Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-data-table")).toBeTruthy()
  })

  it("Striped applies correct class", () => {
    const { container } = render(<composed.Striped />)
    expect(container.querySelector(".pm-data-table--striped")).toBeTruthy()
  })
})
