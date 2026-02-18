import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./box.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Box Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.firstChild).toBeTruthy()
  })

  it("WithPadding applies padding class", () => {
    const { container } = render(<composed.WithPadding />)
    expect(container.querySelector(".pm-box--p-4")).toBeTruthy()
  })

  it("WithDirectionalPadding applies px and py classes", () => {
    const { container } = render(<composed.WithDirectionalPadding />)
    expect(container.querySelector(".pm-box--px-6")).toBeTruthy()
    expect(container.querySelector(".pm-box--py-3")).toBeTruthy()
  })

  it("DisplayFlex applies display class", () => {
    const { container } = render(<composed.DisplayFlex />)
    expect(container.querySelector(".pm-box--d-flex")).toBeTruthy()
  })

  it("OverflowHidden applies overflow class", () => {
    const { container } = render(<composed.OverflowHidden />)
    expect(container.querySelector(".pm-box--overflow-hidden")).toBeTruthy()
  })

  it("AsSection renders as section element", () => {
    const { container } = render(<composed.AsSection />)
    expect(container.querySelector("section.pm-box")).toBeTruthy()
  })
})
