import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Flex } from "./flex.js"

afterEach(cleanup)

describe("Flex", () => {
  it("renders with children", () => {
    render(<Flex data-testid="flex">Content</Flex>)
    expect(screen.getByTestId("flex")).toHaveTextContent("Content")
  })

  it("applies base class by default", () => {
    render(<Flex data-testid="flex">Default</Flex>)
    const el = screen.getByTestId("flex")
    expect(el.className).toContain("pm-flex")
  })

  it("applies direction class", () => {
    render(
      <Flex data-testid="flex" direction="column">
        Column
      </Flex>,
    )
    const el = screen.getByTestId("flex")
    expect(el.className).toContain("pm-flex--col")
  })

  it("does not add direction modifier for row", () => {
    render(
      <Flex data-testid="flex" direction="row">
        Row
      </Flex>,
    )
    const el = screen.getByTestId("flex")
    expect(el.className).toBe("pm-flex")
  })

  it("applies align class", () => {
    render(
      <Flex data-testid="flex" align="center">
        Aligned
      </Flex>,
    )
    const el = screen.getByTestId("flex")
    expect(el.className).toContain("pm-flex--align-center")
  })

  it("applies justify class", () => {
    render(
      <Flex data-testid="flex" justify="between">
        Justified
      </Flex>,
    )
    const el = screen.getByTestId("flex")
    expect(el.className).toContain("pm-flex--justify-between")
  })

  it("applies gap class", () => {
    render(
      <Flex data-testid="flex" gap="4">
        Gapped
      </Flex>,
    )
    const el = screen.getByTestId("flex")
    expect(el.className).toContain("pm-flex--gap-4")
  })

  it("applies inline class", () => {
    render(
      <Flex data-testid="flex" inline>
        Inline
      </Flex>,
    )
    const el = screen.getByTestId("flex")
    expect(el.className).toContain("pm-flex--inline")
  })

  it("applies wrap class", () => {
    render(
      <Flex data-testid="flex" wrap="wrap">
        Wrapped
      </Flex>,
    )
    const el = screen.getByTestId("flex")
    expect(el.className).toContain("pm-flex--wrap")
  })

  it("forwards ref", () => {
    let flexRef: HTMLDivElement | null = null
    render(<Flex ref={(el) => (flexRef = el)}>Ref</Flex>)
    expect(flexRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Flex data-testid="flex" className="custom-class">
        Custom
      </Flex>,
    )
    const el = screen.getByTestId("flex")
    expect(el.className).toContain("pm-flex")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Flex data-testid="my-flex">Test</Flex>)
    expect(screen.getByTestId("my-flex")).toBeInTheDocument()
  })
})
