import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./app-shell.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Shell Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-shell")).toBeTruthy()
  })

  it("Playground renders header, sidebar, main, footer", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("header")).toBeTruthy()
    expect(container.querySelector("aside")).toBeTruthy()
    expect(container.querySelector("main")).toBeTruthy()
    expect(container.querySelector("footer")).toBeTruthy()
  })

  it("SidebarEnd applies end position class", () => {
    const { container } = render(<composed.SidebarEnd />)
    expect(container.querySelector(".pm-shell--sidebar-end")).toBeTruthy()
  })

  it("CollapsedSidebar applies collapsed class", () => {
    const { container } = render(<composed.CollapsedSidebar />)
    expect(container.querySelector(".pm-shell--sidebar-collapsed")).toBeTruthy()
  })
})
