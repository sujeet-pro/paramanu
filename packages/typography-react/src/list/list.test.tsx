import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { List } from "./list.js"

afterEach(cleanup)

describe("List", () => {
  it("renders with children", () => {
    render(
      <List>
        <li>Item 1</li>
      </List>,
    )
    expect(screen.getByText("Item 1")).toBeInTheDocument()
  })

  it("renders a <ul> by default", () => {
    render(
      <List>
        <li>Item</li>
      </List>,
    )
    expect(screen.getByRole("list").tagName).toBe("UL")
  })

  it("applies default classes", () => {
    render(
      <List>
        <li>Item</li>
      </List>,
    )
    expect(screen.getByRole("list").className).toContain("pm-list")
  })

  it("renders a <ol> for ordered type", () => {
    render(
      <List type="ordered">
        <li>Item</li>
      </List>,
    )
    expect(screen.getByRole("list").tagName).toBe("OL")
  })

  it("applies styleType class", () => {
    render(
      <List styleType="circle">
        <li>Item</li>
      </List>,
    )
    expect(screen.getByRole("list").className).toContain("pm-list--style-circle")
  })

  it("applies spacing class", () => {
    render(
      <List spacing="lg">
        <li>Item</li>
      </List>,
    )
    expect(screen.getByRole("list").className).toContain("pm-list--spacing-lg")
  })

  it("applies unstyled class", () => {
    render(
      <List unstyled>
        <li>Item</li>
      </List>,
    )
    expect(screen.getByRole("list").className).toContain("pm-list--unstyled")
  })

  it("forwards ref", () => {
    let listRef: HTMLUListElement | HTMLOListElement | null = null
    render(
      <List ref={(el) => (listRef = el)}>
        <li>Ref</li>
      </List>,
    )
    expect(listRef).toBeInstanceOf(HTMLUListElement)
  })

  it("forwards ref for ordered list", () => {
    let listRef: HTMLUListElement | HTMLOListElement | null = null
    render(
      <List type="ordered" ref={(el) => (listRef = el)}>
        <li>Ref</li>
      </List>,
    )
    expect(listRef).toBeInstanceOf(HTMLOListElement)
  })

  it("merges custom className", () => {
    render(
      <List className="custom-class">
        <li>Item</li>
      </List>,
    )
    const list = screen.getByRole("list")
    expect(list.className).toContain("pm-list")
    expect(list.className).toContain("custom-class")
  })

  it("passes through HTML attributes", () => {
    render(
      <List data-testid="my-list">
        <li>Item</li>
      </List>,
    )
    expect(screen.getByTestId("my-list")).toBeInTheDocument()
  })
})
