import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./wrap.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Wrap Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-wrap")).toBeTruthy()
  })

  it("Reversed applies row-reverse class", () => {
    const { container } = render(<composed.Reversed />)
    expect(container.querySelector(".pm-wrap--row-reverse")).toBeTruthy()
  })
})
