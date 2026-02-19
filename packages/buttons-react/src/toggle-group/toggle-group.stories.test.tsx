import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./toggle-group.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("ToggleGrp Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("group")).toBeInTheDocument()
  })

  it("Single renders with items", () => {
    render(<composed.Single />)
    const buttons = screen.getAllByRole("button")
    expect(buttons.length).toBe(3)
  })

  it("Multiple renders with items", () => {
    render(<composed.Multiple />)
    const buttons = screen.getAllByRole("button")
    expect(buttons.length).toBe(3)
  })

  it("Vertical renders correctly", () => {
    render(<composed.Vertical />)
    expect(screen.getByRole("group")).toBeInTheDocument()
  })

  it("Attached renders correctly", () => {
    render(<composed.Attached />)
    expect(screen.getByRole("group")).toBeInTheDocument()
  })

  it("AllVariantsAndSizes renders all size groups", () => {
    render(<composed.AllVariantsAndSizes />)
    const groups = screen.getAllByRole("group")
    expect(groups.length).toBe(5) // 5 sizes
  })

  it("WithDisabledItem has a disabled button", () => {
    render(<composed.WithDisabledItem />)
    expect(screen.getByRole("button", { name: "Center" })).toBeDisabled()
  })

  it("GroupRole has accessible name", () => {
    render(<composed.GroupRole />)
    expect(screen.getByRole("group", { name: "Selection group" })).toBeInTheDocument()
  })
})
