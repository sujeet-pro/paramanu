import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./stat.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Stat Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-stat")).toBeTruthy()
  })

  it("Centered stat applies correct class", () => {
    const { container } = render(<composed.Centered />)
    expect(container.querySelector(".pm-stat--center")).toBeTruthy()
  })
})
