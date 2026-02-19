import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./structured-list.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("StructList Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-struct-list")).toBeTruthy()
  })

  it("Selectable applies correct class", () => {
    const { container } = render(<composed.Selectable />)
    expect(container.querySelector(".pm-struct-list--selectable")).toBeTruthy()
  })
})
