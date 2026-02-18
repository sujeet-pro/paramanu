import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./loading-overlay.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("LoadingOverlay Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("Visible renders with aria-hidden false", () => {
    const { container } = render(<composed.Visible />)
    const overlay = container.querySelector("[aria-hidden='false']")
    expect(overlay).toBeInTheDocument()
  })

  it("Hidden renders with aria-hidden true", () => {
    const { container } = render(<composed.Hidden />)
    const overlay = container.querySelector("[aria-hidden='true']")
    expect(overlay).toBeInTheDocument()
  })

  it("WithBlur renders without crashing", () => {
    const { container } = render(<composed.WithBlur />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("WithCustomContent renders custom text", () => {
    const { container } = render(<composed.WithCustomContent />)
    expect(container.textContent).toContain("Loading data...")
  })
})
