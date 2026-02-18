import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { VisuallyHidden } from "./visually-hidden.js"

describe("VisuallyHidden", () => {
  it("renders with base class", () => {
    render(<VisuallyHidden data-testid="vh">Hidden text</VisuallyHidden>)
    const el = screen.getByTestId("vh")
    expect(el).toHaveClass("pm-visually-hidden")
    expect(el.tagName).toBe("SPAN")
  })

  it("renders as custom element", () => {
    render(
      <VisuallyHidden as="div" data-testid="vh">
        Hidden
      </VisuallyHidden>,
    )
    expect(screen.getByTestId("vh").tagName).toBe("DIV")
  })

  it("applies focusable modifier", () => {
    render(
      <VisuallyHidden focusable data-testid="vh">
        Skip link
      </VisuallyHidden>,
    )
    expect(screen.getByTestId("vh")).toHaveClass("pm-visually-hidden--focusable")
  })

  it("merges custom className", () => {
    render(
      <VisuallyHidden className="custom" data-testid="vh">
        Text
      </VisuallyHidden>,
    )
    const el = screen.getByTestId("vh")
    expect(el).toHaveClass("pm-visually-hidden")
    expect(el).toHaveClass("custom")
  })

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLElement | null>
    render(<VisuallyHidden ref={ref}>Text</VisuallyHidden>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })
})
