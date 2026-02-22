import { describe, it, expect, vi } from "vitest"
import { render, screen, act } from "@testing-library/react"
import { Presence } from "./presence.js"

describe("Presence", () => {
  it("renders children when present", () => {
    render(
      <Presence present>
        <div data-testid="content">Hello</div>
      </Presence>,
    )
    expect(screen.getByTestId("content")).toBeInTheDocument()
  })

  it("does not render when not present", () => {
    render(
      <Presence present={false}>
        <div data-testid="content">Hello</div>
      </Presence>,
    )
    expect(screen.queryByTestId("content")).not.toBeInTheDocument()
  })

  it("calls onExited after exit animation", async () => {
    vi.useFakeTimers()
    const onExited = vi.fn()

    const { rerender } = render(
      <Presence present duration={100} onExited={onExited}>
        <div data-testid="content">Hello</div>
      </Presence>,
    )

    rerender(
      <Presence present={false} duration={100} onExited={onExited}>
        <div data-testid="content">Hello</div>
      </Presence>,
    )

    await act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(onExited).toHaveBeenCalledOnce()
    vi.useRealTimers()
  })

  it("supports render prop children", () => {
    render(
      <Presence present>{(state) => <div data-testid="content">State: {state}</div>}</Presence>,
    )
    expect(screen.getByTestId("content")).toBeInTheDocument()
  })
})
