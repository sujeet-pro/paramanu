import { describe, it, expect, afterEach, vi } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import { Dialog, DialogHeader, DialogBody, DialogFooter } from "./dialog.js"

afterEach(cleanup)

describe("Dialog", () => {
  it("renders when open", () => {
    render(
      <Dialog open>
        <p>Dialog content</p>
      </Dialog>,
    )
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByText("Dialog content")).toBeInTheDocument()
  })

  it("does not render when closed", () => {
    render(
      <Dialog open={false}>
        <p>Dialog content</p>
      </Dialog>,
    )
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("applies role=dialog and aria-modal", () => {
    render(<Dialog open>Content</Dialog>)
    const dialog = screen.getByRole("dialog")
    expect(dialog).toHaveAttribute("role", "dialog")
    expect(dialog).toHaveAttribute("aria-modal", "true")
  })

  it("applies default classes", () => {
    render(<Dialog open>Content</Dialog>)
    const dialog = screen.getByRole("dialog")
    expect(dialog.className).toContain("pm-dialog")
    expect(dialog.className).toContain("pm-dialog--md")
  })

  it("applies size class", () => {
    render(
      <Dialog open size="lg">
        Content
      </Dialog>,
    )
    const dialog = screen.getByRole("dialog")
    expect(dialog.className).toContain("pm-dialog--lg")
  })

  it("applies centered class", () => {
    render(
      <Dialog open centered>
        Content
      </Dialog>,
    )
    const dialog = screen.getByRole("dialog")
    expect(dialog.className).toContain("pm-dialog--centered")
  })

  it("calls onClose on backdrop click", () => {
    const onClose = vi.fn()
    render(
      <Dialog open onClose={onClose}>
        <p>Content</p>
      </Dialog>,
    )
    const dialog = screen.getByRole("dialog")
    fireEvent.click(dialog)
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("does not call onClose when clicking inside content", () => {
    const onClose = vi.fn()
    render(
      <Dialog open onClose={onClose}>
        <p>Content</p>
      </Dialog>,
    )
    fireEvent.click(screen.getByText("Content"))
    expect(onClose).not.toHaveBeenCalled()
  })

  it("does not call onClose on backdrop click when closeOnBackdropClick is false", () => {
    const onClose = vi.fn()
    render(
      <Dialog open onClose={onClose} closeOnBackdropClick={false}>
        <p>Content</p>
      </Dialog>,
    )
    const dialog = screen.getByRole("dialog")
    fireEvent.click(dialog)
    expect(onClose).not.toHaveBeenCalled()
  })

  it("calls onClose on Escape key", () => {
    const onClose = vi.fn()
    render(
      <Dialog open onClose={onClose}>
        Content
      </Dialog>,
    )
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("does not call onClose on Escape when closeOnEscape is false", () => {
    const onClose = vi.fn()
    render(
      <Dialog open onClose={onClose} closeOnEscape={false}>
        Content
      </Dialog>,
    )
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onClose).not.toHaveBeenCalled()
  })

  it("forwards ref", () => {
    let dialogRef: HTMLDivElement | null = null
    render(
      <Dialog open ref={(el) => (dialogRef = el)}>
        Content
      </Dialog>,
    )
    expect(dialogRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Dialog open className="custom-class">
        Content
      </Dialog>,
    )
    const dialog = screen.getByRole("dialog")
    expect(dialog.className).toContain("pm-dialog")
    expect(dialog.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <Dialog open data-testid="my-dialog">
        Content
      </Dialog>,
    )
    expect(screen.getByTestId("my-dialog")).toBeInTheDocument()
  })
})

describe("DialogHeader", () => {
  it("renders with children", () => {
    render(<DialogHeader>Header text</DialogHeader>)
    expect(screen.getByText("Header text")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<DialogHeader data-testid="header">Header</DialogHeader>)
    const el = screen.getByTestId("header")
    expect(el.className).toContain("pm-dialog__header")
  })

  it("forwards ref", () => {
    let headerRef: HTMLDivElement | null = null
    render(<DialogHeader ref={(el) => (headerRef = el)}>Header</DialogHeader>)
    expect(headerRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <DialogHeader className="custom-header" data-testid="header">
        Header
      </DialogHeader>,
    )
    const el = screen.getByTestId("header")
    expect(el.className).toContain("pm-dialog__header")
    expect(el.className).toContain("custom-header")
  })
})

describe("DialogBody", () => {
  it("renders with children", () => {
    render(<DialogBody>Body text</DialogBody>)
    expect(screen.getByText("Body text")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<DialogBody data-testid="body">Body</DialogBody>)
    const el = screen.getByTestId("body")
    expect(el.className).toContain("pm-dialog__body")
  })

  it("applies scrollBehavior class", () => {
    render(
      <DialogBody scrollBehavior="inside" data-testid="body">
        Body
      </DialogBody>,
    )
    const el = screen.getByTestId("body")
    expect(el.className).toContain("pm-dialog__body--scroll-inside")
  })

  it("forwards ref", () => {
    let bodyRef: HTMLDivElement | null = null
    render(<DialogBody ref={(el) => (bodyRef = el)}>Body</DialogBody>)
    expect(bodyRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <DialogBody className="custom-body" data-testid="body">
        Body
      </DialogBody>,
    )
    const el = screen.getByTestId("body")
    expect(el.className).toContain("pm-dialog__body")
    expect(el.className).toContain("custom-body")
  })
})

describe("DialogFooter", () => {
  it("renders with children", () => {
    render(<DialogFooter>Footer text</DialogFooter>)
    expect(screen.getByText("Footer text")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<DialogFooter data-testid="footer">Footer</DialogFooter>)
    const el = screen.getByTestId("footer")
    expect(el.className).toContain("pm-dialog__footer")
  })

  it("forwards ref", () => {
    let footerRef: HTMLDivElement | null = null
    render(<DialogFooter ref={(el) => (footerRef = el)}>Footer</DialogFooter>)
    expect(footerRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <DialogFooter className="custom-footer" data-testid="footer">
        Footer
      </DialogFooter>,
    )
    const el = screen.getByTestId("footer")
    expect(el.className).toContain("pm-dialog__footer")
    expect(el.className).toContain("custom-footer")
  })
})
