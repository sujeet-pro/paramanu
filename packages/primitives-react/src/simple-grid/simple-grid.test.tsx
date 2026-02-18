import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { SimpleGrid } from "./simple-grid.js"

afterEach(cleanup)

describe("SimpleGrid", () => {
  it("renders with children", () => {
    render(<SimpleGrid data-testid="simple-grid">Content</SimpleGrid>)
    expect(screen.getByTestId("simple-grid")).toHaveTextContent("Content")
  })

  it("applies base class by default", () => {
    render(<SimpleGrid data-testid="simple-grid">Default</SimpleGrid>)
    const el = screen.getByTestId("simple-grid")
    expect(el.className).toBe("pm-simple-grid")
  })

  it("applies minChildWidth class", () => {
    render(
      <SimpleGrid data-testid="simple-grid" minChildWidth="sm">
        MinWidth
      </SimpleGrid>,
    )
    const el = screen.getByTestId("simple-grid")
    expect(el.className).toContain("pm-simple-grid--min-sm")
  })

  it("applies columns class", () => {
    render(
      <SimpleGrid data-testid="simple-grid" columns={3}>
        Columns
      </SimpleGrid>,
    )
    const el = screen.getByTestId("simple-grid")
    expect(el.className).toContain("pm-simple-grid--cols-3")
  })

  it("minChildWidth takes priority over columns", () => {
    render(
      <SimpleGrid data-testid="simple-grid" minChildWidth="md" columns={3}>
        Priority
      </SimpleGrid>,
    )
    const el = screen.getByTestId("simple-grid")
    expect(el.className).toContain("pm-simple-grid--min-md")
    expect(el.className).not.toContain("pm-simple-grid--cols-3")
  })

  it("applies gap class", () => {
    render(
      <SimpleGrid data-testid="simple-grid" gap="4">
        Gapped
      </SimpleGrid>,
    )
    const el = screen.getByTestId("simple-grid")
    expect(el.className).toContain("pm-simple-grid--gap-4")
  })

  it("forwards ref", () => {
    let gridRef: HTMLDivElement | null = null
    render(<SimpleGrid ref={(el) => (gridRef = el)}>Ref</SimpleGrid>)
    expect(gridRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <SimpleGrid data-testid="simple-grid" className="custom-class">
        Custom
      </SimpleGrid>,
    )
    const el = screen.getByTestId("simple-grid")
    expect(el.className).toContain("pm-simple-grid")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<SimpleGrid data-testid="my-grid">Test</SimpleGrid>)
    expect(screen.getByTestId("my-grid")).toBeInTheDocument()
  })
})
