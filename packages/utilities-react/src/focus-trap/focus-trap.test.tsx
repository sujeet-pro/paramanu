import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { FocusTrap } from "./focus-trap.js"

describe("FocusTrap", () => {
  it("renders children", () => {
    render(
      <FocusTrap data-testid="trap">
        <button>Click me</button>
      </FocusTrap>,
    )
    expect(screen.getByTestId("trap")).toBeInTheDocument()
    expect(screen.getByText("Click me")).toBeInTheDocument()
  })

  it("focuses first focusable element when active", () => {
    render(
      <FocusTrap active>
        <button data-testid="btn1">First</button>
        <button data-testid="btn2">Second</button>
      </FocusTrap>,
    )
    expect(screen.getByTestId("btn1")).toHaveFocus()
  })

  it("does not trap focus when inactive", () => {
    render(
      <FocusTrap active={false}>
        <button data-testid="btn">Click</button>
      </FocusTrap>,
    )
    expect(screen.getByTestId("btn")).not.toHaveFocus()
  })

  it("calls onEscapeKey when Escape is pressed", () => {
    const onEscape = vi.fn()
    render(
      <FocusTrap active onEscapeKey={onEscape}>
        <button>Click</button>
      </FocusTrap>,
    )
    fireEvent.keyDown(screen.getByText("Click"), { key: "Escape" })
    expect(onEscape).toHaveBeenCalledOnce()
  })

  it("forwards ref", () => {
    const ref = { current: null } as React.RefObject<HTMLDivElement | null>
    render(
      <FocusTrap ref={ref}>
        <button>Click</button>
      </FocusTrap>,
    )
    expect(ref.current).toBeInstanceOf(HTMLDivElement)
  })
})
