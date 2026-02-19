import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./command-palette.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("CmdPalette Stories", () => {
  it("Playground renders when open", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-cmd-palette")).toBeTruthy()
  })

  it("Empty state renders", () => {
    const { container } = render(<composed.Empty />)
    expect(container.querySelector(".pm-cmd-palette__empty")).toBeTruthy()
  })
})
