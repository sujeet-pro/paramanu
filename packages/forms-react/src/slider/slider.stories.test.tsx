import { describe, expect, test } from "vitest"
import { composeStories } from "@storybook/react"
import { render } from "@testing-library/react"
import * as stories from "./slider.stories.js"

const composed = composeStories(stories)

describe("Slider stories", () => {
  test("Playground renders", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("[role='slider']")).toBeTruthy()
  })

  test("Disabled story renders with aria-disabled", () => {
    const { container } = render(<composed.Disabled />)
    const slider = container.querySelector("[role='slider']")
    expect(slider).toBeTruthy()
    expect(slider?.getAttribute("aria-disabled")).toBe("true")
  })
})
