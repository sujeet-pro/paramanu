import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./timeline.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Timeline Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-timeline")).toBeTruthy()
  })

  it("Alternate applies correct class", () => {
    const { container } = render(<composed.Alternate />)
    expect(container.querySelector(".pm-timeline--alternate")).toBeTruthy()
  })
})
