import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./alert.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Alert Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("Info renders with status role", () => {
    render(<composed.Info />)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("Danger renders with alert role", () => {
    render(<composed.Danger />)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("Warning renders with alert role", () => {
    render(<composed.Warning />)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("Dismissible renders a close button", () => {
    render(<composed.Dismissible />)
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument()
  })

  it("TitleOnly renders without description", () => {
    render(<composed.TitleOnly />)
    expect(screen.getByText("Title only alert")).toBeInTheDocument()
  })

  it("AllVariantsAndStyles renders all combinations", () => {
    render(<composed.AllVariantsAndStyles />)
    // 4 variants x 3 styles = 12
    const alerts = screen.getAllByText(/Alert description text./)
    expect(alerts.length).toBe(12)
  })
})
