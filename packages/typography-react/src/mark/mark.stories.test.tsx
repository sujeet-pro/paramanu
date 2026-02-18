import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./mark.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Mark Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-mark")).toBeTruthy()
  })

  it("Playground renders mark element", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("mark")).toBeTruthy()
  })

  it("Variants renders all variant classes", () => {
    const { container } = render(<composed.Variants />)
    expect(container.querySelector(".pm-mark--default")).toBeTruthy()
    expect(container.querySelector(".pm-mark--underline")).toBeTruthy()
    expect(container.querySelector(".pm-mark--circle")).toBeTruthy()
    expect(container.querySelector(".pm-mark--filled")).toBeTruthy()
  })

  it("Underline applies underline variant", () => {
    const { container } = render(<composed.Underline />)
    expect(container.querySelector(".pm-mark--underline")).toBeTruthy()
  })

  it("Filled applies filled variant and color", () => {
    const { container } = render(<composed.Filled />)
    expect(container.querySelector(".pm-mark--filled")).toBeTruthy()
  })
})
