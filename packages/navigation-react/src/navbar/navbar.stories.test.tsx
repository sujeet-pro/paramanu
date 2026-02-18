import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./navbar.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Navbar Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("navigation")).toBeTruthy()
  })

  it("Default renders brand text", () => {
    render(<composed.Default />)
    expect(screen.getByText("Brand")).toBeTruthy()
  })

  it("WithToggle has toggle button", () => {
    render(<composed.WithToggle />)
    expect(screen.getByRole("button", { name: "Toggle navigation" })).toBeTruthy()
  })
})
