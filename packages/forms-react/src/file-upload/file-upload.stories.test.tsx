import { describe, expect, test } from "vitest"
import { composeStories } from "@storybook/react"
import { render } from "@testing-library/react"
import * as stories from "./file-upload.stories.js"

const composed = composeStories(stories)

describe("Upload stories", () => {
  test("Playground renders", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-upload")).toBeTruthy()
  })

  test("Disabled story renders with aria-disabled", () => {
    const { container } = render(<composed.Disabled />)
    const el = container.querySelector(".pm-upload")
    expect(el).toBeTruthy()
    expect(el?.getAttribute("aria-disabled")).toBe("true")
  })
})
