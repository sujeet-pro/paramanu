import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Grid } from "./grid.js"

afterEach(cleanup)

describe("Grid", () => {
  it("renders with children", () => {
    render(<Grid data-testid="grid">Content</Grid>)
    expect(screen.getByTestId("grid")).toHaveTextContent("Content")
  })

  it("applies base class by default", () => {
    render(<Grid data-testid="grid">Default</Grid>)
    const el = screen.getByTestId("grid")
    expect(el.className).toBe("pm-grid")
  })

  it("applies columns class", () => {
    render(
      <Grid data-testid="grid" columns={3}>
        Columns
      </Grid>,
    )
    const el = screen.getByTestId("grid")
    expect(el.className).toContain("pm-grid--cols-3")
  })

  it("applies rows class", () => {
    render(
      <Grid data-testid="grid" rows={2}>
        Rows
      </Grid>,
    )
    const el = screen.getByTestId("grid")
    expect(el.className).toContain("pm-grid--rows-2")
  })

  it("applies gap class", () => {
    render(
      <Grid data-testid="grid" gap="4">
        Gapped
      </Grid>,
    )
    const el = screen.getByTestId("grid")
    expect(el.className).toContain("pm-grid--gap-4")
  })

  it("applies rowGap class", () => {
    render(
      <Grid data-testid="grid" rowGap="2">
        RowGapped
      </Grid>,
    )
    const el = screen.getByTestId("grid")
    expect(el.className).toContain("pm-grid--row-gap-2")
  })

  it("applies columnGap class", () => {
    render(
      <Grid data-testid="grid" columnGap="6">
        ColGapped
      </Grid>,
    )
    const el = screen.getByTestId("grid")
    expect(el.className).toContain("pm-grid--col-gap-6")
  })

  it("applies inline class", () => {
    render(
      <Grid data-testid="grid" inline>
        Inline
      </Grid>,
    )
    const el = screen.getByTestId("grid")
    expect(el.className).toContain("pm-grid--inline")
  })

  it("applies align class", () => {
    render(
      <Grid data-testid="grid" align="center">
        Aligned
      </Grid>,
    )
    const el = screen.getByTestId("grid")
    expect(el.className).toContain("pm-grid--align-center")
  })

  it("applies justify class", () => {
    render(
      <Grid data-testid="grid" justify="between">
        Justified
      </Grid>,
    )
    const el = screen.getByTestId("grid")
    expect(el.className).toContain("pm-grid--justify-between")
  })

  it("forwards ref", () => {
    let gridRef: HTMLDivElement | null = null
    render(<Grid ref={(el) => (gridRef = el)}>Ref</Grid>)
    expect(gridRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Grid data-testid="grid" className="custom-class">
        Custom
      </Grid>,
    )
    const el = screen.getByTestId("grid")
    expect(el.className).toContain("pm-grid")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Grid data-testid="my-grid">Test</Grid>)
    expect(screen.getByTestId("my-grid")).toBeInTheDocument()
  })
})
