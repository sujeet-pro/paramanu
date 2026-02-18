import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./simple-grid.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("SimpleGrid Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-simple-grid")).toBeTruthy()
  })

  it("FixedColumns applies column class", () => {
    const { container } = render(<composed.FixedColumns />)
    expect(container.querySelector(".pm-simple-grid--cols-3")).toBeTruthy()
  })

  it("Responsive applies minChildWidth class", () => {
    const { container } = render(<composed.Responsive />)
    expect(container.querySelector(".pm-simple-grid--min-sm")).toBeTruthy()
  })
})
