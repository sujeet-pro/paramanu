import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./spacer.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Spacer Stories", () => {
  it("Playground renders with aria-hidden", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("[aria-hidden='true']")).toBeTruthy()
  })

  it("FixedSize applies size class", () => {
    const { container } = render(<composed.FixedSize />)
    expect(container.querySelector(".pm-spacer--size-8")).toBeTruthy()
  })
})
