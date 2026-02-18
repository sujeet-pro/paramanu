import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./table.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Table Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("table")).toBeTruthy()
  })

  it("Striped variant applies correct class", () => {
    const { container } = render(<composed.Striped />)
    expect(container.querySelector(".pm-table--striped")).toBeTruthy()
  })

  it("Bordered applies correct class", () => {
    const { container } = render(<composed.Bordered />)
    expect(container.querySelector(".pm-table--bordered")).toBeTruthy()
  })
})
