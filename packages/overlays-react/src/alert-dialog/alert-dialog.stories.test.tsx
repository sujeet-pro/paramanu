import { cleanup, render } from "@testing-library/react"
import { composeStories } from "@storybook/react"
import { afterEach, describe, expect, it } from "vitest"
import * as stories from "./alert-dialog.stories.js"

const composed = composeStories(stories)

afterEach(cleanup)

describe("AlertDialog Stories", () => {
  it("Playground renders when open", () => {
    const { container } = render(<composed.Playground />)
    expect(container.querySelector("[role='alertdialog']")).toBeTruthy()
  })

  it("Danger variant applies correct class", () => {
    const { container } = render(<composed.Danger />)
    expect(container.querySelector(".pm-alert-dialog--danger")).toBeTruthy()
  })
})
