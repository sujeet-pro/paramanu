import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./notification.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Notif Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("article")).toBeInTheDocument()
  })

  it("AllVariants renders all five", () => {
    render(<composed.AllVariants />)
    expect(screen.getAllByRole("article").length).toBe(5)
  })

  it("Dismissible has close button", () => {
    render(<composed.Dismissible />)
    expect(screen.getByRole("button", { name: "Dismiss notification" })).toBeInTheDocument()
  })

  it("WithTimestamp shows timestamp", () => {
    render(<composed.WithTimestamp />)
    expect(screen.getByText("5 min ago")).toBeInTheDocument()
  })

  it("Accessibility uses article role", () => {
    render(<composed.Accessibility />)
    expect(screen.getByRole("article")).toBeInTheDocument()
  })
})
