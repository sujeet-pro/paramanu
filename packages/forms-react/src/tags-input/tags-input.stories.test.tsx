import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./tags-input.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("TagsInput Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("group")).toBeTruthy()
  })

  it("Playground renders tags", () => {
    render(<composed.Playground />)
    expect(screen.getByText("React")).toBeTruthy()
    expect(screen.getByText("Vue")).toBeTruthy()
  })

  it("Disabled variant renders", () => {
    render(<composed.Disabled />)
    expect(screen.getByRole("group").getAttribute("aria-disabled")).toBe("true")
  })

  it("Invalid variant renders", () => {
    render(<composed.Invalid />)
    expect(screen.getByRole("group").getAttribute("aria-invalid")).toBe("true")
  })
})
