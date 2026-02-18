import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./prose.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Prose Stories", () => {
  it("Playground renders without crashing", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector(".pm-prose")).toBeTruthy()
  })

  it("Small applies sm size class", () => {
    const { container } = render(<composed.Small />)
    expect(container.querySelector(".pm-prose--sm")).toBeTruthy()
  })

  it("Large applies lg size class", () => {
    const { container } = render(<composed.Large />)
    expect(container.querySelector(".pm-prose--lg")).toBeTruthy()
  })

  it("MutedColor applies color class", () => {
    const { container } = render(<composed.MutedColor />)
    expect(container.querySelector(".pm-prose--color-muted")).toBeTruthy()
  })

  it("TrimmedMargins applies trim class", () => {
    const { container } = render(<composed.TrimmedMargins />)
    expect(container.querySelector(".pm-prose--trim")).toBeTruthy()
  })
})
