import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./toast.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Toast Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("Danger renders with alert role", () => {
    render(<composed.Danger />)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("Dismissible has close button", () => {
    render(<composed.Dismissible />)
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument()
  })

  it("AllVariants renders all four", () => {
    render(<composed.AllVariants />)
    expect(screen.getAllByText(/toast message/).length).toBe(4)
  })

  it("InContainer renders toasts within container", () => {
    render(<composed.InContainer />)
    expect(screen.getByText("Saved")).toBeInTheDocument()
    expect(screen.getByText("Update")).toBeInTheDocument()
  })
})
