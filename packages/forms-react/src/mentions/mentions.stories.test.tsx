import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./mentions.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Mentions Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByPlaceholderText("Type @ to mention someone...")).toBeTruthy()
  })

  it("Disabled variant is disabled", () => {
    render(<composed.Disabled />)
    const textarea = screen.getByPlaceholderText("Disabled mentions...")
    expect(textarea).toBeDisabled()
  })

  it("Invalid variant renders", () => {
    render(<composed.Invalid />)
    expect(screen.getByPlaceholderText("Invalid mentions...")).toBeTruthy()
  })
})
