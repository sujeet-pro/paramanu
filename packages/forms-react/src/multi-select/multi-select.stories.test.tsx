import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./multi-select.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("MultiSel Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("combobox")).toBeTruthy()
  })

  it("Listbox has multiselectable", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("listbox").getAttribute("aria-multiselectable")).toBe("true")
  })
})
