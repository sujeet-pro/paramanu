import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Float } from "./float.js"

afterEach(cleanup)

describe("Float", () => {
  it("renders with children", () => {
    render(<Float data-testid="float">Badge</Float>)
    const el = screen.getByTestId("float")
    expect(el).toBeInTheDocument()
    expect(el).toHaveTextContent("Badge")
  })

  it("applies default placement (top-end)", () => {
    render(<Float data-testid="float">Content</Float>)
    const el = screen.getByTestId("float")
    expect(el.className).toContain("pm-float")
    expect(el.className).toContain("pm-float--top-end")
  })

  it("applies top-start placement", () => {
    render(
      <Float placement="top-start" data-testid="float">
        Content
      </Float>,
    )
    const el = screen.getByTestId("float")
    expect(el.className).toContain("pm-float--top-start")
  })

  it("applies top-center placement", () => {
    render(
      <Float placement="top-center" data-testid="float">
        Content
      </Float>,
    )
    const el = screen.getByTestId("float")
    expect(el.className).toContain("pm-float--top-center")
  })

  it("applies middle-start placement", () => {
    render(
      <Float placement="middle-start" data-testid="float">
        Content
      </Float>,
    )
    const el = screen.getByTestId("float")
    expect(el.className).toContain("pm-float--middle-start")
  })

  it("applies middle-end placement", () => {
    render(
      <Float placement="middle-end" data-testid="float">
        Content
      </Float>,
    )
    const el = screen.getByTestId("float")
    expect(el.className).toContain("pm-float--middle-end")
  })

  it("applies bottom-start placement", () => {
    render(
      <Float placement="bottom-start" data-testid="float">
        Content
      </Float>,
    )
    const el = screen.getByTestId("float")
    expect(el.className).toContain("pm-float--bottom-start")
  })

  it("applies bottom-center placement", () => {
    render(
      <Float placement="bottom-center" data-testid="float">
        Content
      </Float>,
    )
    const el = screen.getByTestId("float")
    expect(el.className).toContain("pm-float--bottom-center")
  })

  it("applies bottom-end placement", () => {
    render(
      <Float placement="bottom-end" data-testid="float">
        Content
      </Float>,
    )
    const el = screen.getByTestId("float")
    expect(el.className).toContain("pm-float--bottom-end")
  })

  it("applies offset modifier", () => {
    render(
      <Float offset="2" data-testid="float">
        Content
      </Float>,
    )
    const el = screen.getByTestId("float")
    expect(el.className).toContain("pm-float--offset-2")
  })

  it("combines placement and offset", () => {
    render(
      <Float placement="bottom-start" offset="3" data-testid="float">
        Content
      </Float>,
    )
    const el = screen.getByTestId("float")
    expect(el.className).toContain("pm-float--bottom-start")
    expect(el.className).toContain("pm-float--offset-3")
  })

  it("forwards ref", () => {
    let elRef: HTMLDivElement | null = null
    render(<Float ref={(el) => (elRef = el)}>Content</Float>)
    expect(elRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Float className="custom-class" data-testid="float">
        Content
      </Float>,
    )
    const el = screen.getByTestId("float")
    expect(el.className).toContain("pm-float")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Float data-testid="my-float">Content</Float>)
    expect(screen.getByTestId("my-float")).toBeInTheDocument()
  })
})
