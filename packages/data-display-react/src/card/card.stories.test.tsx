import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./card.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Card Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-card")).toBeTruthy()
  })

  it("Outline variant applies correct class", () => {
    const { container } = render(<composed.Outline />)
    expect(container.querySelector(".pm-card--outline")).toBeTruthy()
  })

  it("Interactive card applies interactive class", () => {
    const { container } = render(<composed.Interactive />)
    expect(container.querySelector(".pm-card--interactive")).toBeTruthy()
  })

  it("Horizontal layout applies correct class", () => {
    const { container } = render(<composed.Horizontal />)
    expect(container.querySelector(".pm-card--horizontal")).toBeTruthy()
  })
})
