import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./button-group.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("ButtonGroup Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("group")).toBeInTheDocument()
  })

  it("Horizontal renders with group role", () => {
    render(<composed.Horizontal />)
    expect(screen.getByRole("group")).toBeInTheDocument()
  })

  it("Vertical renders with buttons", () => {
    render(<composed.Vertical />)
    expect(screen.getAllByRole("button").length).toBe(3)
  })

  it("Attached renders without crashing", () => {
    render(<composed.Attached />)
    expect(screen.getByRole("group")).toBeInTheDocument()
  })

  it("MixedVariants renders different button texts", () => {
    render(<composed.MixedVariants />)
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument()
  })

  it("WithDisabledButton has a disabled button", () => {
    render(<composed.WithDisabledButton />)
    expect(screen.getByRole("button", { name: "Share" })).toBeDisabled()
  })

  it("GroupRole has accessible name", () => {
    render(<composed.GroupRole />)
    expect(screen.getByRole("group", { name: "Formatting options" })).toBeInTheDocument()
  })
})
