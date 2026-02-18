import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./clipboard.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Clipboard Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-clipboard")).toBeTruthy()
  })
})
