import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { SrOnly } from "./visually-hidden.js"

describe("SrOnly", () => {
  it("renders with base class", () => {
    render(<SrOnly data-testid="vh">Hidden text</SrOnly>)
    const el = screen.getByTestId("vh")
    expect(el).toHaveClass("pm-sr-only")
    expect(el.tagName).toBe("SPAN")
  })

  it("renders as custom element", () => {
    render(
      <SrOnly as="div" data-testid="vh">
        Hidden
      </SrOnly>,
    )
    expect(screen.getByTestId("vh").tagName).toBe("DIV")
  })

  it("applies focusable modifier", () => {
    render(
      <SrOnly focusable data-testid="vh">
        Skip link
      </SrOnly>,
    )
    expect(screen.getByTestId("vh")).toHaveClass("pm-sr-only--focusable")
  })

  it("merges custom className", () => {
    render(
      <SrOnly className="custom" data-testid="vh">
        Text
      </SrOnly>,
    )
    const el = screen.getByTestId("vh")
    expect(el).toHaveClass("pm-sr-only")
    expect(el).toHaveClass("custom")
  })

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLElement | null>
    render(<SrOnly ref={ref}>Text</SrOnly>)
    expect(ref.current).toBeInstanceOf(HTMLElement)
  })
})
