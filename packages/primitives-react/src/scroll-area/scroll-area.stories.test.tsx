import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./scroll-area.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Scroll Stories", () => {
  it("Playground renders with role=region", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("[role='region']")).toBeTruthy()
  })

  it("Bordered applies bordered class", () => {
    const { container } = render(<composed.Bordered />)
    expect(container.querySelector(".pm-scroll--bordered")).toBeTruthy()
  })

  it("Horizontal applies horizontal class", () => {
    const { container } = render(<composed.Horizontal />)
    expect(container.querySelector(".pm-scroll--horizontal")).toBeTruthy()
  })
})
