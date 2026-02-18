import { describe, it, expect, afterEach, vi } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import { Sheet, SheetHandle, SheetHeader, SheetBody } from "./sheet.js"

afterEach(cleanup)

describe("Sheet", () => {
  it("renders when open", () => {
    render(
      <Sheet open>
        <p>Sheet content</p>
      </Sheet>,
    )
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByText("Sheet content")).toBeInTheDocument()
  })

  it("does not render when closed", () => {
    render(
      <Sheet open={false}>
        <p>Sheet content</p>
      </Sheet>,
    )
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("applies role=dialog and aria-modal", () => {
    render(<Sheet open>Content</Sheet>)
    const sheet = screen.getByRole("dialog")
    expect(sheet).toHaveAttribute("role", "dialog")
    expect(sheet).toHaveAttribute("aria-modal", "true")
  })

  it("applies default classes", () => {
    render(<Sheet open>Content</Sheet>)
    const sheet = screen.getByRole("dialog")
    expect(sheet.className).toContain("pm-sheet")
    expect(sheet.className).toContain("pm-sheet--md")
  })

  it("applies size class", () => {
    render(
      <Sheet open size="lg">
        Content
      </Sheet>,
    )
    const sheet = screen.getByRole("dialog")
    expect(sheet.className).toContain("pm-sheet--lg")
  })

  it("calls onClose on Escape key", () => {
    const onClose = vi.fn()
    render(
      <Sheet open onClose={onClose}>
        Content
      </Sheet>,
    )
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("does not call onClose on Escape when closeOnEscape is false", () => {
    const onClose = vi.fn()
    render(
      <Sheet open onClose={onClose} closeOnEscape={false}>
        Content
      </Sheet>,
    )
    fireEvent.keyDown(document, { key: "Escape" })
    expect(onClose).not.toHaveBeenCalled()
  })

  it("forwards ref", () => {
    let sheetRef: HTMLDivElement | null = null
    render(
      <Sheet open ref={(el) => (sheetRef = el)}>
        Content
      </Sheet>,
    )
    expect(sheetRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Sheet open className="custom-class">
        Content
      </Sheet>,
    )
    const sheet = screen.getByRole("dialog")
    expect(sheet.className).toContain("pm-sheet")
    expect(sheet.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <Sheet open data-testid="my-sheet">
        Content
      </Sheet>,
    )
    expect(screen.getByTestId("my-sheet")).toBeInTheDocument()
  })
})

describe("SheetHandle", () => {
  it("renders", () => {
    render(<SheetHandle data-testid="handle" />)
    expect(screen.getByTestId("handle")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<SheetHandle data-testid="handle" />)
    const el = screen.getByTestId("handle")
    expect(el.className).toContain("pm-sheet__handle")
  })

  it("forwards ref", () => {
    let handleRef: HTMLDivElement | null = null
    render(<SheetHandle ref={(el) => (handleRef = el)} />)
    expect(handleRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<SheetHandle className="custom-handle" data-testid="handle" />)
    const el = screen.getByTestId("handle")
    expect(el.className).toContain("pm-sheet__handle")
    expect(el.className).toContain("custom-handle")
  })
})

describe("SheetHeader", () => {
  it("renders with children", () => {
    render(<SheetHeader>Header text</SheetHeader>)
    expect(screen.getByText("Header text")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<SheetHeader data-testid="header">Header</SheetHeader>)
    const el = screen.getByTestId("header")
    expect(el.className).toContain("pm-sheet__header")
  })

  it("forwards ref", () => {
    let headerRef: HTMLDivElement | null = null
    render(<SheetHeader ref={(el) => (headerRef = el)}>Header</SheetHeader>)
    expect(headerRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <SheetHeader className="custom-header" data-testid="header">
        Header
      </SheetHeader>,
    )
    const el = screen.getByTestId("header")
    expect(el.className).toContain("pm-sheet__header")
    expect(el.className).toContain("custom-header")
  })
})

describe("SheetBody", () => {
  it("renders with children", () => {
    render(<SheetBody>Body text</SheetBody>)
    expect(screen.getByText("Body text")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<SheetBody data-testid="body">Body</SheetBody>)
    const el = screen.getByTestId("body")
    expect(el.className).toContain("pm-sheet__body")
  })

  it("forwards ref", () => {
    let bodyRef: HTMLDivElement | null = null
    render(<SheetBody ref={(el) => (bodyRef = el)}>Body</SheetBody>)
    expect(bodyRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <SheetBody className="custom-body" data-testid="body">
        Body
      </SheetBody>,
    )
    const el = screen.getByTestId("body")
    expect(el.className).toContain("pm-sheet__body")
    expect(el.className).toContain("custom-body")
  })
})
