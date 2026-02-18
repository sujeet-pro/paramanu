import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Wrap } from "./wrap.js"

afterEach(cleanup)

describe("Wrap", () => {
  it("renders with children", () => {
    render(<Wrap data-testid="wrap">Content</Wrap>)
    expect(screen.getByTestId("wrap")).toHaveTextContent("Content")
  })

  it("applies base class by default", () => {
    render(<Wrap data-testid="wrap">Default</Wrap>)
    const el = screen.getByTestId("wrap")
    expect(el.className).toBe("pm-wrap")
  })

  it("applies gap class", () => {
    render(
      <Wrap data-testid="wrap" gap="4">
        Gapped
      </Wrap>,
    )
    const el = screen.getByTestId("wrap")
    expect(el.className).toContain("pm-wrap--gap-4")
  })

  it("applies direction class", () => {
    render(
      <Wrap data-testid="wrap" direction="row-reverse">
        Reversed
      </Wrap>,
    )
    const el = screen.getByTestId("wrap")
    expect(el.className).toContain("pm-wrap--row-reverse")
  })

  it("does not add direction modifier for row (default)", () => {
    render(
      <Wrap data-testid="wrap" direction="row">
        Row
      </Wrap>,
    )
    const el = screen.getByTestId("wrap")
    expect(el.className).toBe("pm-wrap")
  })

  it("applies align class", () => {
    render(
      <Wrap data-testid="wrap" align="center">
        Aligned
      </Wrap>,
    )
    const el = screen.getByTestId("wrap")
    expect(el.className).toContain("pm-wrap--align-center")
  })

  it("applies justify class", () => {
    render(
      <Wrap data-testid="wrap" justify="between">
        Justified
      </Wrap>,
    )
    const el = screen.getByTestId("wrap")
    expect(el.className).toContain("pm-wrap--justify-between")
  })

  it("forwards ref", () => {
    let wrapRef: HTMLDivElement | null = null
    render(<Wrap ref={(el) => (wrapRef = el)}>Ref</Wrap>)
    expect(wrapRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Wrap data-testid="wrap" className="custom-class">
        Custom
      </Wrap>,
    )
    const el = screen.getByTestId("wrap")
    expect(el.className).toContain("pm-wrap")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Wrap data-testid="my-wrap">Test</Wrap>)
    expect(screen.getByTestId("my-wrap")).toBeInTheDocument()
  })
})
