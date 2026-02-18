import { describe, expect, test } from "vitest"
import { composeStories } from "@storybook/react"
import { render } from "@testing-library/react"
import * as stories from "./form.stories.js"

const composed = composeStories(stories)

describe("Form stories", () => {
  test("Playground renders", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("form")).toBeTruthy()
  })

  test("VerticalForm story has correct class", () => {
    const { container } = render(<composed.VerticalForm />)
    const form = container.querySelector("form")
    expect(form).toBeTruthy()
    expect(form?.classList.contains("pm-form--vertical")).toBe(true)
  })
})
