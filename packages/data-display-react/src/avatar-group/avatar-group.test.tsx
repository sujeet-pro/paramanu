import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { AvatarGroup } from "./avatar-group.js"

afterEach(cleanup)

describe("AvatarGroup", () => {
  it("renders children", () => {
    render(
      <AvatarGroup>
        <span>A</span>
        <span>B</span>
      </AvatarGroup>,
    )
    expect(screen.getByRole("group")).toBeInTheDocument()
    expect(screen.getByText("A")).toBeInTheDocument()
    expect(screen.getByText("B")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<AvatarGroup>children</AvatarGroup>)
    const group = screen.getByRole("group")
    expect(group.className).toContain("pm-avatar-group")
    expect(group.className).toContain("pm-avatar-group--md")
    expect(group.className).toContain("pm-avatar-group--spacing-normal")
  })

  it("applies size class", () => {
    render(<AvatarGroup size="lg">children</AvatarGroup>)
    expect(screen.getByRole("group").className).toContain("pm-avatar-group--lg")
  })

  it("applies spacing class", () => {
    render(<AvatarGroup spacing="tight">children</AvatarGroup>)
    expect(screen.getByRole("group").className).toContain("pm-avatar-group--spacing-tight")
  })

  it("shows overflow indicator when max is exceeded", () => {
    render(
      <AvatarGroup max={2}>
        <span>A</span>
        <span>B</span>
        <span>C</span>
        <span>D</span>
      </AvatarGroup>,
    )
    expect(screen.getByText("+2")).toBeInTheDocument()
    expect(screen.queryByText("C")).not.toBeInTheDocument()
  })

  it("does not show overflow when within max", () => {
    render(
      <AvatarGroup max={5}>
        <span>A</span>
        <span>B</span>
      </AvatarGroup>,
    )
    expect(screen.queryByText(/\+/)).not.toBeInTheDocument()
  })

  it("has role=group and aria-label", () => {
    render(<AvatarGroup>children</AvatarGroup>)
    const group = screen.getByRole("group")
    expect(group).toHaveAttribute("aria-label", "Avatars")
  })

  it("forwards ref", () => {
    let groupRef: HTMLDivElement | null = null
    render(<AvatarGroup ref={(el) => (groupRef = el)}>children</AvatarGroup>)
    expect(groupRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<AvatarGroup className="custom">children</AvatarGroup>)
    const group = screen.getByRole("group")
    expect(group.className).toContain("pm-avatar-group")
    expect(group.className).toContain("custom")
  })

  it("passes through additional HTML attributes", () => {
    render(<AvatarGroup data-testid="my-group">children</AvatarGroup>)
    expect(screen.getByTestId("my-group")).toBeInTheDocument()
  })
})
