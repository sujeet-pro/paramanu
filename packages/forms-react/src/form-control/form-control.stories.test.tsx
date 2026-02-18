import { describe, expect, test } from "vitest"
import { composeStories } from "@storybook/react"
import { render } from "@testing-library/react"
import * as stories from "./form-control.stories.js"

const composed = composeStories(stories)

describe("FormControl stories", () => {
  test("Playground renders", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("[role='group']")).toBeTruthy()
  })

  test("Disabled story has disabled class", () => {
    const { container } = render(<composed.Disabled />)
    const el = container.querySelector("[role='group']")
    expect(el).toBeTruthy()
    expect(el?.classList.contains("pm-form-control--disabled")).toBe(true)
  })
})
