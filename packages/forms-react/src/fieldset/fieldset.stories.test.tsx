import { describe, expect, test } from "vitest"
import { composeStories } from "@storybook/react"
import { render } from "@testing-library/react"
import * as stories from "./fieldset.stories.js"

const composed = composeStories(stories)

describe("Fieldset stories", () => {
  test("Playground renders with legend", () => {
    const { container } = render(<composed.Playground />)
    const fieldset = container.querySelector("fieldset")
    expect(fieldset).toBeTruthy()
    expect(container.querySelector("legend")).toBeTruthy()
  })

  test("Disabled story renders disabled fieldset", () => {
    const { container } = render(<composed.Disabled />)
    const fieldset = container.querySelector("fieldset") as HTMLFieldSetElement
    expect(fieldset).toBeTruthy()
    expect(fieldset.disabled).toBe(true)
  })
})
