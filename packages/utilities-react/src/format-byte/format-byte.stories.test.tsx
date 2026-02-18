import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./format-byte.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("FormatByte Stories", () => {
  it("Playground renders formatted bytes", () => {
    const { container } = render(<composed.Playground />)
    expect(container.textContent).toBeTruthy()
  })

  it("LargeFile renders GB", () => {
    const { container } = render(<composed.LargeFile />)
    expect(container.textContent).toContain("GB")
  })
})
