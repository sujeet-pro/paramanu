import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./avatar.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Avatar Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-avatar")).toBeTruthy()
  })

  it("WithInitials shows initials text", () => {
    const { container } = render(<composed.WithInitials />)
    expect(container.querySelector(".pm-avatar__fallback")?.textContent).toBe("JS")
  })

  it("Square variant applies class", () => {
    const { container } = render(<composed.Square />)
    expect(container.querySelector(".pm-avatar--square")).toBeTruthy()
  })
})
