import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./checkbox.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Checkbox Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("checkbox")).toBeTruthy()
    expect(screen.getByText("Accept terms")).toBeTruthy()
  })

  it("Disabled checkbox is disabled", () => {
    render(<composed.Disabled />)
    expect(screen.getByRole("checkbox")).toBeDisabled()
  })

  it("Invalid checkbox has aria-invalid", () => {
    render(<composed.Invalid />)
    expect(screen.getByRole("checkbox").getAttribute("aria-invalid")).toBe("true")
  })
})
