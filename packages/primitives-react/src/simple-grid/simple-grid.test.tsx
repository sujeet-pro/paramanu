import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Sgrid } from "./simple-grid.js"

afterEach(cleanup)

describe("Sgrid", () => {
  it("renders with children", () => {
    render(<Sgrid data-testid="simple-grid">Content</Sgrid>)
    expect(screen.getByTestId("simple-grid")).toHaveTextContent("Content")
  })

  it("applies base class by default", () => {
    render(<Sgrid data-testid="simple-grid">Default</Sgrid>)
    const el = screen.getByTestId("simple-grid")
    expect(el.className).toBe("pm-sgrid")
  })

  it("applies minChildWidth class", () => {
    render(
      <Sgrid data-testid="simple-grid" minChildWidth="sm">
        MinWidth
      </Sgrid>,
    )
    const el = screen.getByTestId("simple-grid")
    expect(el.className).toContain("pm-sgrid--min-sm")
  })

  it("applies columns class", () => {
    render(
      <Sgrid data-testid="simple-grid" columns={3}>
        Columns
      </Sgrid>,
    )
    const el = screen.getByTestId("simple-grid")
    expect(el.className).toContain("pm-sgrid--cols-3")
  })

  it("minChildWidth takes priority over columns", () => {
    render(
      <Sgrid data-testid="simple-grid" minChildWidth="md" columns={3}>
        Priority
      </Sgrid>,
    )
    const el = screen.getByTestId("simple-grid")
    expect(el.className).toContain("pm-sgrid--min-md")
    expect(el.className).not.toContain("pm-sgrid--cols-3")
  })

  it("applies gap class", () => {
    render(
      <Sgrid data-testid="simple-grid" gap="4">
        Gapped
      </Sgrid>,
    )
    const el = screen.getByTestId("simple-grid")
    expect(el.className).toContain("pm-sgrid--gap-4")
  })

  it("forwards ref", () => {
    let gridRef: HTMLDivElement | null = null
    render(<Sgrid ref={(el) => (gridRef = el)}>Ref</Sgrid>)
    expect(gridRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Sgrid data-testid="simple-grid" className="custom-class">
        Custom
      </Sgrid>,
    )
    const el = screen.getByTestId("simple-grid")
    expect(el.className).toContain("pm-sgrid")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Sgrid data-testid="my-grid">Test</Sgrid>)
    expect(screen.getByTestId("my-grid")).toBeInTheDocument()
  })
})
