import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Affix } from "./affix.js"

describe("Affix", () => {
  it("renders with default top position", () => {
    render(<Affix data-testid="af">Content</Affix>)
    const el = screen.getByTestId("af")
    expect(el).toHaveClass("pm-affix")
    expect(el).toHaveClass("pm-affix--top")
  })

  it("renders with bottom position", () => {
    render(
      <Affix position="bottom" data-testid="af">
        Content
      </Affix>,
    )
    expect(screen.getByTestId("af")).toHaveClass("pm-affix--bottom")
  })

  it("applies offset modifier", () => {
    render(
      <Affix offset="4" data-testid="af">
        Content
      </Affix>,
    )
    expect(screen.getByTestId("af")).toHaveClass("pm-affix--offset-4")
  })

  it("merges custom className", () => {
    render(
      <Affix className="custom" data-testid="af">
        Content
      </Affix>,
    )
    const el = screen.getByTestId("af")
    expect(el).toHaveClass("pm-affix")
    expect(el).toHaveClass("custom")
  })

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>
    render(<Affix ref={ref}>Content</Affix>)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
