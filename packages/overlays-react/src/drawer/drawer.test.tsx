import { describe, it, expect, afterEach, vi } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import { Drawer, DrawerHeader, DrawerBody, DrawerFooter } from "./drawer.js"

afterEach(cleanup)

describe("Drawer", () => {
  it("renders when open", () => {
    render(
      <Drawer open>
        <p>Drawer content</p>
      </Drawer>,
    )
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByText("Drawer content")).toBeInTheDocument()
  })

  it("does not render when closed", () => {
    render(
      <Drawer open={false}>
        <p>Drawer content</p>
      </Drawer>,
    )
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("applies role=dialog and aria-modal", () => {
    render(<Drawer open>Content</Drawer>)
    const drawer = screen.getByRole("dialog")
    expect(drawer).toHaveAttribute("role", "dialog")
    expect(drawer).toHaveAttribute("aria-modal", "true")
  })

  it("applies default classes", () => {
    render(<Drawer open>Content</Drawer>)
    const drawer = screen.getByRole("dialog")
    expect(drawer.className).toContain("pm-drawer")
    expect(drawer.className).toContain("pm-drawer--end")
    expect(drawer.className).toContain("pm-drawer--md")
  })

  it("applies placement class", () => {
    render(
      <Drawer open placement="start">
        Content
      </Drawer>,
    )
    const drawer = screen.getByRole("dialog")
    expect(drawer.className).toContain("pm-drawer--start")
  })

  it("applies size class", () => {
    render(
      <Drawer open size="lg">
        Content
      </Drawer>,
    )
    const drawer = screen.getByRole("dialog")
    expect(drawer.className).toContain("pm-drawer--lg")
  })

  it("calls onClose on Escape key", () => {
    const onClose = vi.fn()
    render(
      <Drawer open onClose={onClose}>
        Content
      </Drawer>,
    )
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("does not call onClose on Escape when closeOnEscape is false", () => {
    const onClose = vi.fn()
    render(
      <Drawer open onClose={onClose} closeOnEscape={false}>
        Content
      </Drawer>,
    )
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onClose).not.toHaveBeenCalled()
  })

  it("forwards ref", () => {
    let drawerRef: HTMLDivElement | null = null
    render(
      <Drawer open ref={(el) => (drawerRef = el)}>
        Content
      </Drawer>,
    )
    expect(drawerRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Drawer open className="custom-class">
        Content
      </Drawer>,
    )
    const drawer = screen.getByRole("dialog")
    expect(drawer.className).toContain("pm-drawer")
    expect(drawer.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <Drawer open data-testid="my-drawer">
        Content
      </Drawer>,
    )
    expect(screen.getByTestId("my-drawer")).toBeInTheDocument()
  })
})

describe("DrawerHeader", () => {
  it("renders with children", () => {
    render(<DrawerHeader>Header text</DrawerHeader>)
    expect(screen.getByText("Header text")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<DrawerHeader data-testid="header">Header</DrawerHeader>)
    const el = screen.getByTestId("header")
    expect(el.className).toContain("pm-drawer__header")
  })

  it("forwards ref", () => {
    let headerRef: HTMLDivElement | null = null
    render(<DrawerHeader ref={(el) => (headerRef = el)}>Header</DrawerHeader>)
    expect(headerRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <DrawerHeader className="custom-header" data-testid="header">
        Header
      </DrawerHeader>,
    )
    const el = screen.getByTestId("header")
    expect(el.className).toContain("pm-drawer__header")
    expect(el.className).toContain("custom-header")
  })
})

describe("DrawerBody", () => {
  it("renders with children", () => {
    render(<DrawerBody>Body text</DrawerBody>)
    expect(screen.getByText("Body text")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<DrawerBody data-testid="body">Body</DrawerBody>)
    const el = screen.getByTestId("body")
    expect(el.className).toContain("pm-drawer__body")
  })

  it("forwards ref", () => {
    let bodyRef: HTMLDivElement | null = null
    render(<DrawerBody ref={(el) => (bodyRef = el)}>Body</DrawerBody>)
    expect(bodyRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <DrawerBody className="custom-body" data-testid="body">
        Body
      </DrawerBody>,
    )
    const el = screen.getByTestId("body")
    expect(el.className).toContain("pm-drawer__body")
    expect(el.className).toContain("custom-body")
  })
})

describe("DrawerFooter", () => {
  it("renders with children", () => {
    render(<DrawerFooter>Footer text</DrawerFooter>)
    expect(screen.getByText("Footer text")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<DrawerFooter data-testid="footer">Footer</DrawerFooter>)
    const el = screen.getByTestId("footer")
    expect(el.className).toContain("pm-drawer__footer")
  })

  it("forwards ref", () => {
    let footerRef: HTMLDivElement | null = null
    render(<DrawerFooter ref={(el) => (footerRef = el)}>Footer</DrawerFooter>)
    expect(footerRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <DrawerFooter className="custom-footer" data-testid="footer">
        Footer
      </DrawerFooter>,
    )
    const el = screen.getByTestId("footer")
    expect(el.className).toContain("pm-drawer__footer")
    expect(el.className).toContain("custom-footer")
  })
})
