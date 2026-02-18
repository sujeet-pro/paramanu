import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Divider } from "./divider.js"

afterEach(cleanup)

describe("Divider", () => {
  it("renders as hr by default (horizontal)", () => {
    render(<Divider data-testid="divider" />)
    const divider = screen.getByTestId("divider")
    expect(divider.tagName).toBe("HR")
  })

  it("applies default classes (horizontal, solid)", () => {
    render(<Divider data-testid="divider" />)
    const divider = screen.getByTestId("divider")
    expect(divider.className).toContain("pm-divider")
    expect(divider.className).toContain("pm-divider--horizontal")
    expect(divider.className).toContain("pm-divider--solid")
  })

  it("renders as div with role=separator for vertical", () => {
    render(<Divider orientation="vertical" data-testid="divider" />)
    const divider = screen.getByTestId("divider")
    expect(divider.tagName).toBe("DIV")
    expect(divider).toHaveAttribute("role", "separator")
  })

  it("has aria-orientation=horizontal for horizontal", () => {
    render(<Divider data-testid="divider" />)
    const divider = screen.getByTestId("divider")
    expect(divider).toHaveAttribute("aria-orientation", "horizontal")
  })

  it("has aria-orientation=vertical for vertical", () => {
    render(<Divider orientation="vertical" data-testid="divider" />)
    const divider = screen.getByTestId("divider")
    expect(divider).toHaveAttribute("aria-orientation", "vertical")
  })

  it("applies variant class", () => {
    render(<Divider variant="dashed" data-testid="divider" />)
    const divider = screen.getByTestId("divider")
    expect(divider.className).toContain("pm-divider--dashed")
  })

  it("applies dotted variant", () => {
    render(<Divider variant="dotted" data-testid="divider" />)
    const divider = screen.getByTestId("divider")
    expect(divider.className).toContain("pm-divider--dotted")
  })

  it("forwards ref", () => {
    let dividerRef: HTMLElement | null = null
    render(<Divider ref={(el) => (dividerRef = el)} />)
    expect(dividerRef).toBeInstanceOf(HTMLHRElement)
  })

  it("forwards ref for vertical divider", () => {
    let dividerRef: HTMLElement | null = null
    render(<Divider orientation="vertical" ref={(el) => (dividerRef = el)} />)
    expect(dividerRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Divider className="custom-class" data-testid="divider" />)
    const divider = screen.getByTestId("divider")
    expect(divider.className).toContain("pm-divider")
    expect(divider.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Divider data-testid="my-divider" />)
    expect(screen.getByTestId("my-divider")).toBeInTheDocument()
  })
})
