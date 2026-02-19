import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { AvatarGrp } from "./avatar-group.js"

afterEach(cleanup)

describe("AvatarGrp", () => {
  it("renders children", () => {
    render(
      <AvatarGrp>
        <span>A</span>
        <span>B</span>
      </AvatarGrp>,
    )
    expect(screen.getByRole("group")).toBeInTheDocument()
    expect(screen.getByText("A")).toBeInTheDocument()
    expect(screen.getByText("B")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<AvatarGrp>children</AvatarGrp>)
    const group = screen.getByRole("group")
    expect(group.className).toContain("pm-avatar-grp")
    expect(group.className).toContain("pm-avatar-grp--md")
    expect(group.className).toContain("pm-avatar-grp--spacing-normal")
  })

  it("applies size class", () => {
    render(<AvatarGrp size="lg">children</AvatarGrp>)
    expect(screen.getByRole("group").className).toContain("pm-avatar-grp--lg")
  })

  it("applies spacing class", () => {
    render(<AvatarGrp spacing="tight">children</AvatarGrp>)
    expect(screen.getByRole("group").className).toContain("pm-avatar-grp--spacing-tight")
  })

  it("shows overflow indicator when max is exceeded", () => {
    render(
      <AvatarGrp max={2}>
        <span>A</span>
        <span>B</span>
        <span>C</span>
        <span>D</span>
      </AvatarGrp>,
    )
    expect(screen.getByText("+2")).toBeInTheDocument()
    expect(screen.queryByText("C")).not.toBeInTheDocument()
  })

  it("does not show overflow when within max", () => {
    render(
      <AvatarGrp max={5}>
        <span>A</span>
        <span>B</span>
      </AvatarGrp>,
    )
    expect(screen.queryByText(/\+/)).not.toBeInTheDocument()
  })

  it("has role=group and aria-label", () => {
    render(<AvatarGrp>children</AvatarGrp>)
    const group = screen.getByRole("group")
    expect(group).toHaveAttribute("aria-label", "Avatars")
  })

  it("forwards ref", () => {
    let groupRef: HTMLDivElement | null = null
    render(<AvatarGrp ref={(el) => (groupRef = el)}>children</AvatarGrp>)
    expect(groupRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<AvatarGrp className="custom">children</AvatarGrp>)
    const group = screen.getByRole("group")
    expect(group.className).toContain("pm-avatar-grp")
    expect(group.className).toContain("custom")
  })

  it("passes through additional HTML attributes", () => {
    render(<AvatarGrp data-testid="my-group">children</AvatarGrp>)
    expect(screen.getByTestId("my-group")).toBeInTheDocument()
  })
})
