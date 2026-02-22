import { describe, it, expect, afterEach, vi } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import { Popover, PopoverArrow } from "./popover.js"

afterEach(cleanup)

describe("Popover", () => {
  it("renders children when open", () => {
    render(<Popover open>Popover content</Popover>)
    expect(screen.getByText("Popover content")).toBeInTheDocument()
  })

  it("does not render when closed", () => {
    render(<Popover>Popover content</Popover>)
    expect(screen.queryByText("Popover content")).not.toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(
      <Popover open data-testid="popover">
        Content
      </Popover>,
    )
    const el = screen.getByTestId("popover")
    expect(el.className).toContain("pm-popover")
    expect(el.className).toContain("pm-popover--bottom")
  })

  it("applies placement class", () => {
    render(
      <Popover open placement="top" data-testid="popover">
        Content
      </Popover>,
    )
    const el = screen.getByTestId("popover")
    expect(el.className).toContain("pm-popover--top")
  })

  it("applies hasArrow class", () => {
    render(
      <Popover open hasArrow data-testid="popover">
        Content
      </Popover>,
    )
    const el = screen.getByTestId("popover")
    expect(el.className).toContain("pm-popover--has-arrow")
  })

  it("calls onClose when Escape is pressed", () => {
    const onClose = vi.fn()
    render(
      <Popover open onClose={onClose}>
        Content
      </Popover>,
    )
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("does not call onClose when Escape is pressed and closed", () => {
    const onClose = vi.fn()
    render(<Popover onClose={onClose}>Content</Popover>)
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onClose).not.toHaveBeenCalled()
  })

  it("forwards ref", () => {
    let popoverRef: HTMLDivElement | null = null
    render(
      <Popover open ref={(el) => (popoverRef = el)}>
        Content
      </Popover>,
    )
    expect(popoverRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Popover open className="custom-class" data-testid="popover">
        Content
      </Popover>,
    )
    const el = screen.getByTestId("popover")
    expect(el.className).toContain("pm-popover")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <Popover open data-testid="my-popover">
        Content
      </Popover>,
    )
    expect(screen.getByTestId("my-popover")).toBeInTheDocument()
  })
})

describe("PopoverArrow", () => {
  it("renders with default classes", () => {
    render(<PopoverArrow data-testid="arrow" />)
    const el = screen.getByTestId("arrow")
    expect(el.className).toContain("pm-popover__arrow")
  })

  it("forwards ref", () => {
    let arrowRef: HTMLDivElement | null = null
    render(<PopoverArrow ref={(el) => (arrowRef = el)} />)
    expect(arrowRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<PopoverArrow className="custom-arrow" data-testid="arrow" />)
    const el = screen.getByTestId("arrow")
    expect(el.className).toContain("pm-popover__arrow")
    expect(el.className).toContain("custom-arrow")
  })
})
