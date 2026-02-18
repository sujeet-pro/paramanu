import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./backdrop.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Backdrop Stories", () => {
  it("Playground renders", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-backdrop")).toBeTruthy()
  })

  it("Blur variant applies correct class", () => {
    const { container } = render(<composed.Blur />)
    expect(container.querySelector(".pm-backdrop--blur")).toBeTruthy()
  })
})
