import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./menubar.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Menubar Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("menubar")).toBeTruthy()
  })

  it("WithDisabledItem has disabled button", () => {
    render(<composed.WithDisabledItem />)
    const btn = screen.getByRole("menuitem", { name: "Edit" })
    expect(btn).toBeDisabled()
  })
})
