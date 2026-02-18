import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./link.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Link Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("link", { name: "Link Text" })).toBeTruthy()
  })

  it("External link has target blank", () => {
    render(<composed.External />)
    const link = screen.getByRole("link", { name: "External Link" })
    expect(link.getAttribute("target")).toBe("_blank")
  })

  it("Disabled link has aria-disabled", () => {
    render(<composed.Disabled />)
    const link = screen.getByRole("link", { name: "Disabled Link" })
    expect(link.getAttribute("aria-disabled")).toBe("true")
  })
})
