import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { SkipNav, SkipNavTarget } from "./skip-nav.js"

describe("SkipNav", () => {
  it("renders with default targetId and text", () => {
    render(<SkipNav data-testid="skip" />)
    const el = screen.getByTestId("skip")
    expect(el).toHaveClass("pm-skip-nav")
    expect(el).toHaveAttribute("href", "#main-content")
    expect(el).toHaveTextContent("Skip to content")
  })

  it("renders with custom targetId and children", () => {
    render(
      <SkipNav targetId="content" data-testid="skip">
        Jump to main
      </SkipNav>,
    )
    const el = screen.getByTestId("skip")
    expect(el).toHaveAttribute("href", "#content")
    expect(el).toHaveTextContent("Jump to main")
  })

  it("merges custom className", () => {
    render(<SkipNav className="custom" data-testid="skip" />)
    const el = screen.getByTestId("skip")
    expect(el).toHaveClass("pm-skip-nav")
    expect(el).toHaveClass("custom")
  })

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLAnchorElement | null>
    render(<SkipNav ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLAnchorElement)
  })
})

describe("SkipNavTarget", () => {
  it("renders with default id and tabIndex", () => {
    render(<SkipNavTarget data-testid="target" />)
    const el = screen.getByTestId("target")
    expect(el).toHaveClass("pm-skip-nav-target")
    expect(el).toHaveAttribute("id", "main-content")
    expect(el).toHaveAttribute("tabindex", "-1")
  })

  it("renders with custom id", () => {
    render(<SkipNavTarget id="content" data-testid="target" />)
    expect(screen.getByTestId("target")).toHaveAttribute("id", "content")
  })

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>
    render(<SkipNavTarget ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
