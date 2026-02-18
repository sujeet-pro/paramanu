import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ShowHide } from "./show-hide.js"

describe("ShowHide", () => {
  it("renders with show class by default", () => {
    render(<ShowHide data-testid="sh">Content</ShowHide>)
    expect(screen.getByTestId("sh")).toHaveClass("pm-show")
  })

  it("renders with hide class", () => {
    render(
      <ShowHide display="hide" data-testid="sh">
        Content
      </ShowHide>,
    )
    expect(screen.getByTestId("sh")).toHaveClass("pm-hide")
  })

  it("merges custom className", () => {
    render(
      <ShowHide className="custom" data-testid="sh">
        Content
      </ShowHide>,
    )
    const el = screen.getByTestId("sh")
    expect(el).toHaveClass("pm-show")
    expect(el).toHaveClass("custom")
  })

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>
    render(<ShowHide ref={ref}>Content</ShowHide>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
