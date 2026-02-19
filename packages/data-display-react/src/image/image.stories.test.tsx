import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./image.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Img Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-img")).toBeTruthy()
  })

  it("Rounded applies radius class", () => {
    const { container } = render(<composed.Rounded />)
    expect(container.querySelector(".pm-img--radius-lg")).toBeTruthy()
  })

  it("Fallback shows fallback element", () => {
    const { container } = render(<composed.Fallback />)
    expect(container.querySelector(".pm-img__fallback")).toBeTruthy()
  })
})
