import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./sheet.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Sheet Stories", () => {
  it("Playground renders when open", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-sheet")).toBeTruthy()
  })
})
