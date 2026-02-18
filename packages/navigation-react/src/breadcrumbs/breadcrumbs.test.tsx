import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Breadcrumbs, BreadcrumbsItem, BreadcrumbsLink } from "./breadcrumbs.js"

afterEach(cleanup)

describe("Breadcrumbs", () => {
  it("renders with nav element and aria-label", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbsItem>Home</BreadcrumbsItem>
      </Breadcrumbs>,
    )
    const nav = screen.getByRole("navigation", { name: "Breadcrumb" })
    expect(nav).toBeInTheDocument()
  })

  it("renders ordered list inside nav", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbsItem>Home</BreadcrumbsItem>
      </Breadcrumbs>,
    )
    const list = screen.getByRole("list")
    expect(list).toBeInTheDocument()
    expect(list.tagName).toBe("OL")
  })

  it("applies default classes", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbsItem>Home</BreadcrumbsItem>
      </Breadcrumbs>,
    )
    const nav = screen.getByRole("navigation")
    expect(nav.className).toContain("pm-breadcrumbs")
    expect(nav.className).toContain("pm-breadcrumbs--slash")
  })

  it("applies separator variant", () => {
    render(
      <Breadcrumbs separator="chevron">
        <BreadcrumbsItem>Home</BreadcrumbsItem>
      </Breadcrumbs>,
    )
    const nav = screen.getByRole("navigation")
    expect(nav.className).toContain("pm-breadcrumbs--chevron")
  })

  it("merges custom className", () => {
    render(
      <Breadcrumbs className="custom-class">
        <BreadcrumbsItem>Home</BreadcrumbsItem>
      </Breadcrumbs>,
    )
    const nav = screen.getByRole("navigation")
    expect(nav.className).toContain("pm-breadcrumbs")
    expect(nav.className).toContain("custom-class")
  })

  it("forwards ref", () => {
    let navRef: HTMLElement | null = null
    render(
      <Breadcrumbs ref={(el) => (navRef = el)}>
        <BreadcrumbsItem>Home</BreadcrumbsItem>
      </Breadcrumbs>,
    )
    expect(navRef).toBeInstanceOf(HTMLElement)
  })
})

describe("BreadcrumbsItem", () => {
  it("renders list item", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbsItem>Home</BreadcrumbsItem>
      </Breadcrumbs>,
    )
    const item = screen.getByRole("listitem")
    expect(item).toBeInTheDocument()
  })

  it("applies item classes", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbsItem>Home</BreadcrumbsItem>
      </Breadcrumbs>,
    )
    const item = screen.getByRole("listitem")
    expect(item.className).toContain("pm-breadcrumbs__item")
  })

  it("renders active item with aria-current", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbsItem active>Current</BreadcrumbsItem>
      </Breadcrumbs>,
    )
    const current = screen.getByText("Current")
    expect(current.closest("[aria-current='page']")).not.toBeNull()
  })

  it("forwards ref", () => {
    let itemRef: HTMLLIElement | null = null
    render(
      <Breadcrumbs>
        <BreadcrumbsItem ref={(el) => (itemRef = el)}>Home</BreadcrumbsItem>
      </Breadcrumbs>,
    )
    expect(itemRef).toBeInstanceOf(HTMLLIElement)
  })
})

describe("BreadcrumbsLink", () => {
  it("renders anchor element", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="/">Home</BreadcrumbsLink>
        </BreadcrumbsItem>
      </Breadcrumbs>,
    )
    const link = screen.getByRole("link", { name: "Home" })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute("href", "/")
  })

  it("applies link classes", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="/">Home</BreadcrumbsLink>
        </BreadcrumbsItem>
      </Breadcrumbs>,
    )
    const link = screen.getByRole("link")
    expect(link.className).toContain("pm-breadcrumbs__link")
  })

  it("merges custom className", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbsItem>
          <BreadcrumbsLink href="/" className="custom">
            Home
          </BreadcrumbsLink>
        </BreadcrumbsItem>
      </Breadcrumbs>,
    )
    const link = screen.getByRole("link")
    expect(link.className).toContain("pm-breadcrumbs__link")
    expect(link.className).toContain("custom")
  })

  it("forwards ref", () => {
    let linkRef: HTMLAnchorElement | null = null
    render(
      <Breadcrumbs>
        <BreadcrumbsItem>
          <BreadcrumbsLink ref={(el) => (linkRef = el)} href="/">
            Home
          </BreadcrumbsLink>
        </BreadcrumbsItem>
      </Breadcrumbs>,
    )
    expect(linkRef).toBeInstanceOf(HTMLAnchorElement)
  })
})
