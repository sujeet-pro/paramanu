import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Stack, HStack, VStack } from "./stack.js"

afterEach(cleanup)

describe("Stack", () => {
  it("renders with children", () => {
    render(<Stack data-testid="stack">Content</Stack>)
    expect(screen.getByTestId("stack")).toHaveTextContent("Content")
  })

  it("renders vertical by default", () => {
    render(<Stack data-testid="stack">Default</Stack>)
    const el = screen.getByTestId("stack")
    expect(el.className).toContain("pm-stack--vertical")
  })

  it("renders horizontal when specified", () => {
    render(
      <Stack data-testid="stack" direction="horizontal">
        Horizontal
      </Stack>,
    )
    const el = screen.getByTestId("stack")
    expect(el.className).toContain("pm-stack--horizontal")
  })

  it("applies gap class", () => {
    render(
      <Stack data-testid="stack" gap="4">
        Gapped
      </Stack>,
    )
    const el = screen.getByTestId("stack")
    expect(el.className).toContain("pm-stack--gap-4")
  })

  it("applies align class", () => {
    render(
      <Stack data-testid="stack" align="center">
        Aligned
      </Stack>,
    )
    const el = screen.getByTestId("stack")
    expect(el.className).toContain("pm-stack--align-center")
  })

  it("applies justify class", () => {
    render(
      <Stack data-testid="stack" justify="between">
        Justified
      </Stack>,
    )
    const el = screen.getByTestId("stack")
    expect(el.className).toContain("pm-stack--justify-between")
  })

  it("forwards ref", () => {
    let stackRef: HTMLDivElement | null = null
    render(<Stack ref={(el) => (stackRef = el)}>Ref</Stack>)
    expect(stackRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Stack data-testid="stack" className="custom-class">
        Custom
      </Stack>,
    )
    const el = screen.getByTestId("stack")
    expect(el.className).toContain("pm-stack")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Stack data-testid="my-stack">Test</Stack>)
    expect(screen.getByTestId("my-stack")).toBeInTheDocument()
  })
})

describe("HStack", () => {
  it("renders horizontal", () => {
    render(<HStack data-testid="hstack">Horizontal</HStack>)
    const el = screen.getByTestId("hstack")
    expect(el.className).toContain("pm-stack--horizontal")
  })

  it("forwards ref", () => {
    let ref: HTMLDivElement | null = null
    render(<HStack ref={(el) => (ref = el)}>Ref</HStack>)
    expect(ref).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <HStack data-testid="hstack" className="custom">
        Custom
      </HStack>,
    )
    const el = screen.getByTestId("hstack")
    expect(el.className).toContain("pm-stack")
    expect(el.className).toContain("custom")
  })
})

describe("VStack", () => {
  it("renders vertical", () => {
    render(<VStack data-testid="vstack">Vertical</VStack>)
    const el = screen.getByTestId("vstack")
    expect(el.className).toContain("pm-stack--vertical")
  })

  it("forwards ref", () => {
    let ref: HTMLDivElement | null = null
    render(<VStack ref={(el) => (ref = el)}>Ref</VStack>)
    expect(ref).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <VStack data-testid="vstack" className="custom">
        Custom
      </VStack>,
    )
    const el = screen.getByTestId("vstack")
    expect(el.className).toContain("pm-stack")
    expect(el.className).toContain("custom")
  })
})
