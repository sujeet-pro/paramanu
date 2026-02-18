import { describe, expect, test } from "vitest"
import { composeStories } from "@storybook/react"
import { render } from "@testing-library/react"
import * as stories from "./label.stories.js"

const composed = composeStories(stories)

describe("Label stories", () => {
  test("Playground renders", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("label")).toBeTruthy()
  })

  test("Required story has aria-required", () => {
    const { container } = render(<composed.Required />)
    const label = container.querySelector("label")
    expect(label).toBeTruthy()
    expect(label?.getAttribute("aria-required")).toBe("true")
  })
})
