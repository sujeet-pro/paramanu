import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./skip-nav.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("SkipNav Stories", () => {
  it("Playground renders skip link", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-skip-nav")).toBeTruthy()
  })

  it("Playground renders skip target", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-skip-nav-target")).toBeTruthy()
  })
})
