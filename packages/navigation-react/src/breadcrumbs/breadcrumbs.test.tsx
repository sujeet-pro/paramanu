import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "./breadcrumbs.js"

afterEach(cleanup)

describe("Breadcrumb", () => {
  it("renders with nav element and aria-label", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumb>,
    )
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" })
    expect(nav).toBeInTheDocument()
  })

  it("renders ordered list inside nav", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumb>,
    )
    const list = screen.getByRole("list")
    expect(list).toBeInTheDocument()
    expect(list.tagName).toBe("OL")
  })

  it("applies default classes", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumb>,
    )
    const nav = screen.getByRole("navigation")
    expect(nav.className).toContain("pm-breadcrumb")
    expect(nav.className).toContain("pm-breadcrumb--slash")
  })

  it("applies separator variant", () => {
    render(
      <Breadcrumb separator="chevron">
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumb>,
    )
    const nav = screen.getByRole("navigation")
    expect(nav.className).toContain("pm-breadcrumb--chevron")
  })

  it("merges custom className", () => {
    render(
      <Breadcrumb className="custom-class">
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumb>,
    )
    const nav = screen.getByRole("navigation")
    expect(nav.className).toContain("pm-breadcrumb")
    expect(nav.className).toContain("custom-class")
  })

  it("forwards ref", () => {
    let navRef: HTMLElement | null = null
    render(
      <Breadcrumb ref={(el) => (navRef = el)}>
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumb>,
    )
    expect(navRef).toBeInstanceOf(HTMLElement)
  })
})

describe("BreadcrumbItem", () => {
  it("renders list item", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumb>,
    )
    const item = screen.getByRole("listitem")
    expect(item).toBeInTheDocument()
  })

  it("applies item classes", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>Home</BreadcrumbItem>
      </Breadcrumb>,
    )
    const item = screen.getByRole("listitem")
    expect(item.className).toContain("pm-breadcrumb__item")
  })

  it("renders active item with aria-current", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem active>Current</BreadcrumbItem>
      </Breadcrumb>,
    )
    const current = screen.getByText("Current")
    expect(current.closest("[aria-current='page']")).not.toBeNull()
  })

  it("forwards ref", () => {
    let itemRef: HTMLLIElement | null = null
    render(
      <Breadcrumb>
        <BreadcrumbItem ref={(el) => (itemRef = el)}>Home</BreadcrumbItem>
      </Breadcrumb>,
    )
    expect(itemRef).toBeInstanceOf(HTMLLIElement)
  })
})

describe("BreadcrumbLink", () => {
  it("renders anchor element", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>,
    )
    const link = screen.getByRole("link", { name: "Home" })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/")
  })

  it("applies link classes", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>,
    )
    const link = screen.getByRole("link")
    expect(link.className).toContain("pm-breadcrumb__link")
  })

  it("merges custom className", () => {
    render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink href="/" className="custom">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>,
    )
    const link = screen.getByRole("link")
    expect(link.className).toContain("pm-breadcrumb__link")
    expect(link.className).toContain("custom")
  })

  it("forwards ref", () => {
    let linkRef: HTMLAnchorElement | null = null
    render(
      <Breadcrumb>
        <BreadcrumbItem>
          <BreadcrumbLink ref={(el) => (linkRef = el)} href="/">
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>,
    )
    expect(linkRef).toBeInstanceOf(HTMLAnchorElement)
  })
})
