import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./banner.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Banner Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("AllVariants renders all four", () => {
    render(<composed.AllVariants />)
    expect(screen.getAllByRole("status").length).toBe(4)
  })

  it("Dismissible has close button", () => {
    render(<composed.Dismissible />)
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument()
  })

  it("WithActions renders action button", () => {
    render(<composed.WithActions />)
    expect(screen.getByRole("button", { name: "Update now" })).toBeInTheDocument()
  })

  it("Accessibility uses status role", () => {
    render(<composed.Accessibility />)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })
})
