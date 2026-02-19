import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import {
  Empty,
  EmptyIcon,
  EmptyHeading,
  EmptyDescription,
  EmptyActions,
} from "./empty-state.js"

afterEach(cleanup)

describe("Empty", () => {
  it("renders with children", () => {
    render(<Empty data-testid="es">Content</Empty>)
    expect(screen.getByTestId("es")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Empty data-testid="es">Content</Empty>)
    const es = screen.getByTestId("es")
    expect(es.className).toContain("pm-empty")
    expect(es.className).toContain("pm-empty--md")
  })

  it("applies size class", () => {
    render(<Empty size="lg" data-testid="es">Content</Empty>)
    expect(screen.getByTestId("es").className).toContain("pm-empty--lg")
  })

  it("applies bordered modifier", () => {
    render(<Empty bordered data-testid="es">Content</Empty>)
    expect(screen.getByTestId("es").className).toContain("pm-empty--bordered")
  })

  it("forwards ref", () => {
    let esRef: HTMLDivElement | null = null
    render(<Empty ref={(el) => (esRef = el)}>Content</Empty>)
    expect(esRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Empty className="custom" data-testid="es">Content</Empty>)
    const es = screen.getByTestId("es")
    expect(es.className).toContain("pm-empty")
    expect(es.className).toContain("custom")
  })

  it("passes through additional HTML attributes", () => {
    render(<Empty data-testid="my-es">Content</Empty>)
    expect(screen.getByTestId("my-es")).toBeInTheDocument()
  })
})

describe("EmptyIcon", () => {
  it("renders with icon class", () => {
    render(<EmptyIcon data-testid="icon">Icon</EmptyIcon>)
    expect(screen.getByTestId("icon").className).toContain("pm-empty__icon")
  })
})

describe("EmptyHeading", () => {
  it("renders an h3 with heading class", () => {
    render(<EmptyHeading>Title</EmptyHeading>)
    const heading = screen.getByRole("heading", { name: "Title" })
    expect(heading.tagName).toBe("H3")
    expect(heading.className).toContain("pm-empty__heading")
  })
})

describe("EmptyDescription", () => {
  it("renders a p with description class", () => {
    render(<EmptyDescription data-testid="desc">Desc</EmptyDescription>)
    const desc = screen.getByTestId("desc")
    expect(desc.tagName).toBe("P")
    expect(desc.className).toContain("pm-empty__description")
  })
})

describe("EmptyActions", () => {
  it("renders with actions class", () => {
    render(<EmptyActions data-testid="actions">Actions</EmptyActions>)
    expect(screen.getByTestId("actions").className).toContain("pm-empty__actions")
  })
})
