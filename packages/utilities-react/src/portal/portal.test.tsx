import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Portal } from "./portal.js"

describe("Portal", () => {
  it("renders children in a portal container", () => {
    render(
      <Portal>
        <div data-testid="content">Portal content</div>
      </Portal>,
    )
    const content = screen.getByTestId("content")
    expect(content).toBeInTheDocument()
    expect(content.closest("[data-pm-portal]")).not.toBeNull()
  })

  it("renders in custom target", () => {
    const target = document.createElement("div")
    target.setAttribute("id", "custom-target")
    document.body.appendChild(target)

    render(
      <Portal target="#custom-target">
        <div data-testid="content">Content</div>
      </Portal>,
    )

    const content = screen.getByTestId("content")
    expect(target.contains(content)).toBe(true)

    document.body.removeChild(target)
  })

  it("renders in-place when disabled", () => {
    const { container } = render(
      <Portal disabled>
        <div data-testid="content">Content</div>
      </Portal>,
    )
    const content = screen.getByTestId("content")
    expect(container.contains(content)).toBe(true)
  })

  it("cleans up portal container on unmount", () => {
    const { unmount } = render(
      <Portal>
        <div>Content</div>
      </Portal>,
    )
    expect(document.querySelector("[data-pm-portal]")).not.toBeNull()
    unmount()
    expect(document.querySelector("[data-pm-portal]")).toBeNull()
  })
})
