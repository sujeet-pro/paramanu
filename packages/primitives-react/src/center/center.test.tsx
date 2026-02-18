import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Center } from "./center.js"

afterEach(cleanup)

describe("Center", () => {
  it("renders children centered", () => {
    render(<Center data-testid="center">Centered content</Center>)
    const center = screen.getByTestId("center")
    expect(center).toHaveTextContent("Centered content")
    expect(center.className).toContain("pm-center")
  })

  it("applies default classes", () => {
    render(<Center data-testid="center">Content</Center>)
    const center = screen.getByTestId("center")
    expect(center.className).toContain("pm-center")
    expect(center.className).not.toContain("pm-center--inline")
  })

  it("applies inline modifier", () => {
    render(
      <Center inline data-testid="center">
        Inline
      </Center>,
    )
    const center = screen.getByTestId("center")
    expect(center.className).toContain("pm-center--inline")
  })

  it("forwards ref", () => {
    let centerRef: HTMLDivElement | null = null
    render(<Center ref={(el) => (centerRef = el)}>Ref</Center>)
    expect(centerRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Center className="custom-class" data-testid="center">
        Content
      </Center>,
    )
    const center = screen.getByTestId("center")
    expect(center.className).toContain("pm-center")
    expect(center.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Center data-testid="my-center">Test</Center>)
    expect(screen.getByTestId("my-center")).toBeInTheDocument()
  })
})
