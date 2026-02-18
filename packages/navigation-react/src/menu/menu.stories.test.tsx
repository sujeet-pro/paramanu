import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./menu.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Menu Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("menu")).toBeTruthy()
  })

  it("WithGroups renders group labels", () => {
    render(<composed.WithGroups />)
    expect(screen.getByText("File Actions")).toBeTruthy()
    expect(screen.getByText("Edit Actions")).toBeTruthy()
  })

  it("WithStates renders disabled item", () => {
    render(<composed.WithStates />)
    expect(screen.getByText("Disabled Item")).toBeTruthy()
  })
})
