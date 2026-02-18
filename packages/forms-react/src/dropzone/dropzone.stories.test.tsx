import { describe, expect, test } from "vitest"
import { composeStories } from "@storybook/react"
import { render } from "@testing-library/react"
import * as stories from "./dropzone.stories.js"

const composed = composeStories(stories)

describe("Dropzone stories", () => {
  test("Playground renders", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("[role='button']")).toBeTruthy()
  })

  test("Disabled story renders with aria-disabled", () => {
    const { container } = render(<composed.Disabled />)
    const el = container.querySelector("[role='button']")
    expect(el).toBeTruthy()
    expect(el?.getAttribute("aria-disabled")).toBe("true")
  })
})
