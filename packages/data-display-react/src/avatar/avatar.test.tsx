import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Avatar } from "./avatar.js"

afterEach(cleanup)

describe("Avatar", () => {
  it("renders with fallback initials", () => {
    render(<Avatar name="John Doe" />)
    const avatar = screen.getByRole("img", { name: "John Doe" })
    expect(avatar).toBeInTheDocument()
    expect(avatar.textContent).toBe("JD")
  })

  it("applies default classes", () => {
    render(<Avatar name="Test" />)
    const avatar = screen.getByRole("img", { name: "Test" })
    expect(avatar.className).toContain("pm-avatar")
    expect(avatar.className).toContain("pm-avatar--md")
    expect(avatar.className).toContain("pm-avatar--circle")
    expect(avatar.className).toContain("pm-avatar--primary")
  })

  it("renders image when src is provided", () => {
    render(<Avatar src="/avatar.jpg" alt="User" data-testid="avatar" />)
    const avatar = screen.getByTestId("avatar")
    const img = avatar.querySelector("img")
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute("src", "/avatar.jpg")
    expect(img).toHaveAttribute("alt", "User")
  })

  it("applies variant class", () => {
    render(<Avatar variant="square" name="S" />)
    expect(screen.getByRole("img").className).toContain("pm-avatar--square")
  })

  it("applies size class", () => {
    render(<Avatar size="lg" name="L" />)
    expect(screen.getByRole("img").className).toContain("pm-avatar--lg")
  })

  it("applies color class", () => {
    render(<Avatar color="danger" name="D" />)
    expect(screen.getByRole("img").className).toContain("pm-avatar--danger")
  })

  it("generates initials from single name", () => {
    render(<Avatar name="Alice" />)
    expect(screen.getByRole("img").textContent).toBe("A")
  })

  it("forwards ref", () => {
    let avatarRef: HTMLSpanElement | null = null
    render(<Avatar ref={(el) => (avatarRef = el)} name="Ref" />)
    expect(avatarRef).toBeInstanceOf(HTMLSpanElement)
  })

  it("merges custom className", () => {
    render(<Avatar className="custom" name="C" />)
    const avatar = screen.getByRole("img")
    expect(avatar.className).toContain("pm-avatar")
    expect(avatar.className).toContain("custom")
  })

  it("passes through additional HTML attributes", () => {
    render(<Avatar data-testid="my-avatar" name="T" />)
    expect(screen.getByTestId("my-avatar")).toBeInTheDocument()
  })
})
