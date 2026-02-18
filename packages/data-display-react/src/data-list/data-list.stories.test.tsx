import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./data-list.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("DataList Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-data-list")).toBeTruthy()
  })

  it("Horizontal applies correct class", () => {
    const { container } = render(<composed.Horizontal />)
    expect(container.querySelector(".pm-data-list--horizontal")).toBeTruthy()
  })
})
