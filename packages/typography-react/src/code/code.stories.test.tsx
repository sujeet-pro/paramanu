import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./code.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Code Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-code")).toBeTruthy()
  })

  it("InlineCode renders code element", () => {
    const { container } = render(<composed.InlineCode />)
    expect(container.querySelector("code.pm-code")).toBeTruthy()
  })

  it("CodeBlock renders pre element", () => {
    const { container } = render(<composed.CodeBlock />)
    expect(container.querySelector("pre.pm-code-block")).toBeTruthy()
  })

  it("WithLineNumbers applies line-numbers class", () => {
    const { container } = render(<composed.WithLineNumbers />)
    expect(container.querySelector(".pm-code-block--line-numbers")).toBeTruthy()
  })

  it("Outline applies outline variant class", () => {
    const { container } = render(<composed.Outline />)
    expect(container.querySelector(".pm-code--outline")).toBeTruthy()
  })
})
