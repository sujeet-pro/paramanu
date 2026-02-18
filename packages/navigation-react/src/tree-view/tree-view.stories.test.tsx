import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./tree-view.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("TreeView Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("tree")).toBeTruthy()
  })

  it("NestedBranches renders leaf node", () => {
    render(<composed.NestedBranches />)
    expect(screen.getByText("Leaf")).toBeTruthy()
  })

  it("WithSelection renders selected item", () => {
    render(<composed.WithSelection />)
    expect(screen.getByText("Selected Item")).toBeTruthy()
  })
})
