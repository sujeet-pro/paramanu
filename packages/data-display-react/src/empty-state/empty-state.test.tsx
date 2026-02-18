import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import {
  EmptyState,
  EmptyStateIcon,
  EmptyStateHeading,
  EmptyStateDescription,
  EmptyStateActions,
} from "./empty-state.js"

afterEach(cleanup)

describe("EmptyState", () => {
  it("renders with children", () => {
    render(<EmptyState data-testid="es">Content</EmptyState>)
    expect(screen.getByTestId("es")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<EmptyState data-testid="es">Content</EmptyState>)
    const es = screen.getByTestId("es")
    expect(es.className).toContain("pm-empty-state")
    expect(es.className).toContain("pm-empty-state--md")
  })

  it("applies size class", () => {
    render(<EmptyState size="lg" data-testid="es">Content</EmptyState>)
    expect(screen.getByTestId("es").className).toContain("pm-empty-state--lg")
  })

  it("applies bordered modifier", () => {
    render(<EmptyState bordered data-testid="es">Content</EmptyState>)
    expect(screen.getByTestId("es").className).toContain("pm-empty-state--bordered")
  })

  it("forwards ref", () => {
    let esRef: HTMLDivElement | null = null
    render(<EmptyState ref={(el) => (esRef = el)}>Content</EmptyState>)
    expect(esRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<EmptyState className="custom" data-testid="es">Content</EmptyState>)
    const es = screen.getByTestId("es")
    expect(es.className).toContain("pm-empty-state")
    expect(es.className).toContain("custom")
  })

  it("passes through additional HTML attributes", () => {
    render(<EmptyState data-testid="my-es">Content</EmptyState>)
    expect(screen.getByTestId("my-es")).toBeInTheDocument()
  })
})

describe("EmptyStateIcon", () => {
  it("renders with icon class", () => {
    render(<EmptyStateIcon data-testid="icon">Icon</EmptyStateIcon>)
    expect(screen.getByTestId("icon").className).toContain("pm-empty-state__icon")
  })
})

describe("EmptyStateHeading", () => {
  it("renders an h3 with heading class", () => {
    render(<EmptyStateHeading>Title</EmptyStateHeading>)
    const heading = screen.getByRole("heading", { name: "Title" })
    expect(heading.tagName).toBe("H3")
    expect(heading.className).toContain("pm-empty-state__heading")
  })
})

describe("EmptyStateDescription", () => {
  it("renders a p with description class", () => {
    render(<EmptyStateDescription data-testid="desc">Desc</EmptyStateDescription>)
    const desc = screen.getByTestId("desc")
    expect(desc.tagName).toBe("P")
    expect(desc.className).toContain("pm-empty-state__description")
  })
})

describe("EmptyStateActions", () => {
  it("renders with actions class", () => {
    render(<EmptyStateActions data-testid="actions">Actions</EmptyStateActions>)
    expect(screen.getByTestId("actions").className).toContain("pm-empty-state__actions")
  })
})
