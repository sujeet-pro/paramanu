import { describe, it, expect, afterEach, vi } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import {
  Alertdialog,
  AlertdialogHeader,
  AlertdialogBody,
  AlertdialogFooter,
} from "./alert-dialog.js"

afterEach(cleanup)

describe("Alertdialog", () => {
  it("renders when open", () => {
    render(
      <Alertdialog open>
        <p>Alert content</p>
      </Alertdialog>,
    )
    expect(screen.getByRole("alertdialog")).toBeInTheDocument()
    expect(screen.getByText("Alert content")).toBeInTheDocument()
  })

  it("does not render when closed", () => {
    render(
      <Alertdialog open={false}>
        <p>Alert content</p>
      </Alertdialog>,
    )
    expect(screen.queryByRole("alertdialog")).not.toBeInTheDocument()
  })

  it("applies role=alertdialog and aria-modal", () => {
    render(<Alertdialog open>Content</Alertdialog>)
    const dialog = screen.getByRole("alertdialog")
    expect(dialog).toHaveAttribute("role", "alertdialog")
    expect(dialog).toHaveAttribute("aria-modal", "true")
  })

  it("applies default classes", () => {
    render(<Alertdialog open>Content</Alertdialog>)
    const dialog = screen.getByRole("alertdialog")
    expect(dialog.className).toContain("pm-alertdialog")
    expect(dialog.className).toContain("pm-alertdialog--info")
  })

  it("applies variant class", () => {
    render(
      <Alertdialog open variant="danger">
        Content
      </Alertdialog>,
    )
    const dialog = screen.getByRole("alertdialog")
    expect(dialog.className).toContain("pm-alertdialog--danger")
  })

  it("does not close on Escape by default", () => {
    const onClose = vi.fn()
    render(
      <Alertdialog open onClose={onClose}>
        Content
      </Alertdialog>,
    )
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onClose).not.toHaveBeenCalled()
  })

  it("closes on Escape when closeOnEscape is true", () => {
    const onClose = vi.fn()
    render(
      <Alertdialog open onClose={onClose} closeOnEscape>
        Content
      </Alertdialog>,
    )
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("forwards ref", () => {
    let dialogRef: HTMLDivElement | null = null
    render(
      <Alertdialog open ref={(el) => (dialogRef = el)}>
        Content
      </Alertdialog>,
    )
    expect(dialogRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Alertdialog open className="custom-class">
        Content
      </Alertdialog>,
    )
    const dialog = screen.getByRole("alertdialog")
    expect(dialog.className).toContain("pm-alertdialog")
    expect(dialog.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <Alertdialog open data-testid="my-alert-dialog">
        Content
      </Alertdialog>,
    )
    expect(screen.getByTestId("my-alert-dialog")).toBeInTheDocument()
  })
})

describe("AlertdialogHeader", () => {
  it("renders with children", () => {
    render(<AlertdialogHeader>Header text</AlertdialogHeader>)
    expect(screen.getByText("Header text")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<AlertdialogHeader data-testid="header">Header</AlertdialogHeader>)
    const el = screen.getByTestId("header")
    expect(el.className).toContain("pm-alertdialog__header")
  })

  it("forwards ref", () => {
    let headerRef: HTMLDivElement | null = null
    render(<AlertdialogHeader ref={(el) => (headerRef = el)}>Header</AlertdialogHeader>)
    expect(headerRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <AlertdialogHeader className="custom-header" data-testid="header">
        Header
      </AlertdialogHeader>,
    )
    const el = screen.getByTestId("header")
    expect(el.className).toContain("pm-alertdialog__header")
    expect(el.className).toContain("custom-header")
  })
})

describe("AlertdialogBody", () => {
  it("renders with children", () => {
    render(<AlertdialogBody>Body text</AlertdialogBody>)
    expect(screen.getByText("Body text")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<AlertdialogBody data-testid="body">Body</AlertdialogBody>)
    const el = screen.getByTestId("body")
    expect(el.className).toContain("pm-alertdialog__body")
  })

  it("forwards ref", () => {
    let bodyRef: HTMLDivElement | null = null
    render(<AlertdialogBody ref={(el) => (bodyRef = el)}>Body</AlertdialogBody>)
    expect(bodyRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <AlertdialogBody className="custom-body" data-testid="body">
        Body
      </AlertdialogBody>,
    )
    const el = screen.getByTestId("body")
    expect(el.className).toContain("pm-alertdialog__body")
    expect(el.className).toContain("custom-body")
  })
})

describe("AlertdialogFooter", () => {
  it("renders with children", () => {
    render(<AlertdialogFooter>Footer text</AlertdialogFooter>)
    expect(screen.getByText("Footer text")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<AlertdialogFooter data-testid="footer">Footer</AlertdialogFooter>)
    const el = screen.getByTestId("footer")
    expect(el.className).toContain("pm-alertdialog__footer")
  })

  it("forwards ref", () => {
    let footerRef: HTMLDivElement | null = null
    render(<AlertdialogFooter ref={(el) => (footerRef = el)}>Footer</AlertdialogFooter>)
    expect(footerRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <AlertdialogFooter className="custom-footer" data-testid="footer">
        Footer
      </AlertdialogFooter>,
    )
    const el = screen.getByTestId("footer")
    expect(el.className).toContain("pm-alertdialog__footer")
    expect(el.className).toContain("custom-footer")
  })
})
