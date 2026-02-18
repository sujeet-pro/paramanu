import { describe, expect, test } from "vitest"
import { composeStories } from "@storybook/react"
import { render } from "@testing-library/react"
import * as stories from "./rating.stories.js"

const composed = composeStories(stories)

describe("Rating stories", () => {
  test("Playground renders", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("[role='radiogroup']")).toBeTruthy()
  })

  test("Disabled story renders with aria-disabled", () => {
    const { container } = render(<composed.Disabled />)
    const rating = container.querySelector("[role='radiogroup']")
    expect(rating).toBeTruthy()
    expect(rating?.getAttribute("aria-disabled")).toBe("true")
  })
})
