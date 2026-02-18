import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./pagination.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Pagination Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("navigation", { name: "Pagination" })).toBeTruthy()
  })

  it("WithEllipsis renders active page", () => {
    render(<composed.WithEllipsis />)
    const activePage = screen.getByRole("button", { name: "5" })
    expect(activePage.getAttribute("aria-current")).toBe("page")
  })

  it("Prev button is disabled on first page", () => {
    render(<composed.Playground />)
    const prev = screen.getByRole("button", { name: "Prev" })
    expect(prev).toBeDisabled()
  })
})
