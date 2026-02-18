import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./avatar-group.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("AvatarGroup Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-avatar-group")).toBeTruthy()
  })

  it("WithMax shows overflow indicator", () => {
    const { container } = render(<composed.WithMax />)
    expect(container.querySelector(".pm-avatar-group__overflow")).toBeTruthy()
    expect(container.querySelector(".pm-avatar-group__overflow")?.textContent).toBe("+2")
  })
})
