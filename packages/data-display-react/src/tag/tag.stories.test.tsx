import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./tag.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Tag Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-tag")).toBeTruthy()
  })

  it("Removable tag has remove button", () => {
    const { container } = render(<composed.Removable />)
    expect(container.querySelector(".pm-tag__remove")).toBeTruthy()
  })

  it("Disabled tag applies disabled class", () => {
    const { container } = render(<composed.Disabled />)
    expect(container.querySelector(".pm-tag--disabled")).toBeTruthy()
  })
})
