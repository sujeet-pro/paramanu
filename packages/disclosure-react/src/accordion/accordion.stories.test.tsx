import { cleanup, render, screen } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./accordion.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("Accordion Stories", () => {
  it("Playground renders without crashing", () => {
    render(<composed.Playground />)
    expect(screen.getByRole("button", { name: /Section 1/ })).toBeTruthy()
  })

  it("Default opens first item", () => {
    render(<composed.Default />)
    const trigger = screen.getByRole("button", { name: /Open Section/ })
    expect(trigger.getAttribute("aria-expanded")).toBe("true")
  })

  it("WithDisabled has disabled trigger", () => {
    render(<composed.WithDisabled />)
    const disabled = screen.getByRole("button", { name: /Disabled/ })
    expect(disabled).toBeDisabled()
  })

  it("Multiple opens two items simultaneously", () => {
    render(<composed.Multiple />)
    const trigger1 = screen.getByRole("button", { name: /Section 1/ })
    const trigger2 = screen.getByRole("button", { name: /Section 2/ })
    expect(trigger1.getAttribute("aria-expanded")).toBe("true")
    expect(trigger2.getAttribute("aria-expanded")).toBe("true")
  })
})
