import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./native-select.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("NativeSelect Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("combobox")).toBeTruthy()
  })

  it("Disabled select is disabled", () => {
    render(<composed.Disabled />)
    expect(screen.getByRole("combobox")).toBeDisabled()
  })

  it("Options are rendered", () => {
    render(<composed.Playground />)
    expect(screen.getByText("Apple")).toBeTruthy()
    expect(screen.getByText("Banana")).toBeTruthy()
  })
})
