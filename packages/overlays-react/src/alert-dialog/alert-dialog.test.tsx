import { describe, it, expect, afterEach, vi } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "./alert-dialog.js"

afterEach(cleanup)

describe("AlertDialog", () => {
  it("renders when open", () => {
    render(
      <AlertDialog open>
        <p>Alert content</p>
      </AlertDialog>,
    )
    expect(screen.getByRole("alertdialog")).toBeInTheDocument()
    expect(screen.getByText("Alert content")).toBeInTheDocument()
  })

  it("does not render when closed", () => {
    render(
      <AlertDialog open={false}>
        <p>Alert content</p>
      </AlertDialog>,
    )
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument()
  })

  it("applies role=alertdialog and aria-modal", () => {
    render(<AlertDialog open>Content</AlertDialog>)
    const dialog = screen.getByRole("alertdialog")
    expect(dialog).toHaveAttribute("role", "alertdialog")
    expect(dialog).toHaveAttribute("aria-modal", "true")
  })

  it("applies default classes", () => {
    render(<AlertDialog open>Content</AlertDialog>)
    const dialog = screen.getByRole("alertdialog")
    expect(dialog.className).toContain("pm-alert-dialog")
    expect(dialog.className).toContain("pm-alert-dialog--info")
  })

  it("applies variant class", () => {
    render(
      <AlertDialog open variant="danger">
        Content
      </AlertDialog>,
    )
    const dialog = screen.getByRole("alertdialog")
    expect(dialog.className).toContain("pm-alert-dialog--danger")
  })

  it("does not close on Escape by default", () => {
    const onClose = vi.fn()
    render(
      <AlertDialog open onClose={onClose}>
        Content
      </AlertDialog>,
    )
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onClose).not.toHaveBeenCalled()
  })

  it("closes on Escape when closeOnEscape is true", () => {
    const onClose = vi.fn()
    render(
      <AlertDialog open onClose={onClose} closeOnEscape>
        Content
      </AlertDialog>,
    )
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("forwards ref", () => {
    let dialogRef: HTMLDivElement | null = null
    render(
      <AlertDialog open ref={(el) => (dialogRef = el)}>
        Content
      </AlertDialog>,
    )
    expect(dialogRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <AlertDialog open className="custom-class">
        Content
      </AlertDialog>,
    )
    const dialog = screen.getByRole("alertdialog")
    expect(dialog.className).toContain("pm-alert-dialog")
    expect(dialog.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <AlertDialog open data-testid="my-alert-dialog">
        Content
      </AlertDialog>,
    )
    expect(screen.getByTestId("my-alert-dialog")).toBeInTheDocument()
  })
})

describe("AlertDialogHeader", () => {
  it("renders with children", () => {
    render(<AlertDialogHeader>Header text</AlertDialogHeader>)
    expect(screen.getByText("Header text")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<AlertDialogHeader data-testid="header">Header</AlertDialogHeader>)
    const el = screen.getByTestId("header")
    expect(el.className).toContain("pm-alert-dialog__header")
  })

  it("forwards ref", () => {
    let headerRef: HTMLDivElement | null = null
    render(<AlertDialogHeader ref={(el) => (headerRef = el)}>Header</AlertDialogHeader>)
    expect(headerRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <AlertDialogHeader className="custom-header" data-testid="header">
        Header
      </AlertDialogHeader>,
    )
    const el = screen.getByTestId("header")
    expect(el.className).toContain("pm-alert-dialog__header")
    expect(el.className).toContain("custom-header")
  })
})

describe("AlertDialogBody", () => {
  it("renders with children", () => {
    render(<AlertDialogBody>Body text</AlertDialogBody>)
    expect(screen.getByText("Body text")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<AlertDialogBody data-testid="body">Body</AlertDialogBody>)
    const el = screen.getByTestId("body")
    expect(el.className).toContain("pm-alert-dialog__body")
  })

  it("forwards ref", () => {
    let bodyRef: HTMLDivElement | null = null
    render(<AlertDialogBody ref={(el) => (bodyRef = el)}>Body</AlertDialogBody>)
    expect(bodyRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <AlertDialogBody className="custom-body" data-testid="body">
        Body
      </AlertDialogBody>,
    )
    const el = screen.getByTestId("body")
    expect(el.className).toContain("pm-alert-dialog__body")
    expect(el.className).toContain("custom-body")
  })
})

describe("AlertDialogFooter", () => {
  it("renders with children", () => {
    render(<AlertDialogFooter>Footer text</AlertDialogFooter>)
    expect(screen.getByText("Footer text")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<AlertDialogFooter data-testid="footer">Footer</AlertDialogFooter>)
    const el = screen.getByTestId("footer")
    expect(el.className).toContain("pm-alert-dialog__footer")
  })

  it("forwards ref", () => {
    let footerRef: HTMLDivElement | null = null
    render(<AlertDialogFooter ref={(el) => (footerRef = el)}>Footer</AlertDialogFooter>)
    expect(footerRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <AlertDialogFooter className="custom-footer" data-testid="footer">
        Footer
      </AlertDialogFooter>,
    )
    const el = screen.getByTestId("footer")
    expect(el.className).toContain("pm-alert-dialog__footer")
    expect(el.className).toContain("custom-footer")
  })
})
