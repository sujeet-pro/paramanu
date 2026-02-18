import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./combobox.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Combobox Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("combobox")).toBeTruthy()
  })

  it("Disabled combobox is disabled", () => {
    render(<composed.Disabled />)
    expect(screen.getByRole("combobox")).toBeDisabled()
  })

  it("Has autocomplete attribute", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("combobox").getAttribute("aria-autocomplete")).toBe("list")
  })
})
