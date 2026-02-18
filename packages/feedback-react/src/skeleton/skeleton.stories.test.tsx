import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./skeleton.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Skeleton Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("[aria-hidden='true']")).toBeInTheDocument()
  })

  it("Text renders a text skeleton", () => {
    const { container } = render(<composed.Text />)
    expect(container.querySelector("[aria-hidden='true']")).toBeInTheDocument()
  })

  it("Circular renders a circular skeleton", () => {
    const { container } = render(<composed.Circular />)
    expect(container.querySelector("[aria-hidden='true']")).toBeInTheDocument()
  })

  it("Rectangular renders with custom dimensions", () => {
    const { container } = render(<composed.Rectangular />)
    const el = container.querySelector("[aria-hidden='true']") as HTMLElement
    expect(el).toBeInTheDocument()
  })

  it("AllVariants renders three skeletons", () => {
    const { container } = render(<composed.AllVariants />)
    expect(container.querySelectorAll("[aria-hidden='true']").length).toBe(3)
  })

  it("CardPlaceholder renders composition", () => {
    const { container } = render(<composed.CardPlaceholder />)
    expect(container.querySelectorAll("[aria-hidden='true']").length).toBeGreaterThan(1)
  })
})
