import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./flex.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Flex Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-flex")).toBeTruthy()
  })

  it("Row renders default direction", () => {
    const { container } = render(<composed.Row />)
    const el = container.querySelector(".pm-flex")
    expect(el).toBeTruthy()
  })

  it("Column applies column direction class", () => {
    const { container } = render(<composed.Column />)
    expect(container.querySelector(".pm-flex--col")).toBeTruthy()
  })

  it("Centered applies alignment and justification classes", () => {
    const { container } = render(<composed.Centered />)
    expect(container.querySelector(".pm-flex--align-center")).toBeTruthy()
    expect(container.querySelector(".pm-flex--justify-center")).toBeTruthy()
  })

  it("SpaceBetween applies justify-between class", () => {
    const { container } = render(<composed.SpaceBetween />)
    expect(container.querySelector(".pm-flex--justify-between")).toBeTruthy()
  })

  it("Wrapping applies wrap class", () => {
    const { container } = render(<composed.Wrapping />)
    expect(container.querySelector(".pm-flex--wrap")).toBeTruthy()
  })

  it("Inline applies inline class", () => {
    const { container } = render(<composed.Inline />)
    expect(container.querySelector(".pm-flex--inline")).toBeTruthy()
  })
})
