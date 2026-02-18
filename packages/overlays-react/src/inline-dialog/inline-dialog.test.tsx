import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { InlineDialog, InlineDialogBody } from "./inline-dialog.js"

afterEach(cleanup)

describe("InlineDialog", () => {
  it("renders with children", () => {
    render(<InlineDialog>Dialog content</InlineDialog>)
    expect(screen.getByText("Dialog content")).toBeInTheDocument()
  })

  it("applies role=dialog without aria-modal", () => {
    render(<InlineDialog>Content</InlineDialog>)
    const dialog = screen.getByRole("dialog")
    expect(dialog).toHaveAttribute("role", "dialog")
    expect(dialog).not.toHaveAttribute("aria-modal")
  })

  it("applies default classes", () => {
    render(<InlineDialog>Content</InlineDialog>)
    const dialog = screen.getByRole("dialog")
    expect(dialog.className).toContain("pm-inline-dialog")
  })

  it("applies visible class when visible", () => {
    render(<InlineDialog visible>Content</InlineDialog>)
    const dialog = screen.getByRole("dialog")
    expect(dialog.className).toContain("pm-inline-dialog--visible")
  })

  it("does not apply visible class when not visible", () => {
    render(<InlineDialog>Content</InlineDialog>)
    const dialog = screen.getByRole("dialog")
    expect(dialog.className).not.toContain("pm-inline-dialog--visible")
  })

  it("forwards ref", () => {
    let dialogRef: HTMLDivElement | null = null
    render(
      <InlineDialog ref={(el) => (dialogRef = el)}>Content</InlineDialog>,
    )
    expect(dialogRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<InlineDialog className="custom-class">Content</InlineDialog>)
    const dialog = screen.getByRole("dialog")
    expect(dialog.className).toContain("pm-inline-dialog")
    expect(dialog.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<InlineDialog data-testid="my-inline-dialog">Content</InlineDialog>)
    expect(screen.getByTestId("my-inline-dialog")).toBeInTheDocument()
  })
})

describe("InlineDialogBody", () => {
  it("renders with children", () => {
    render(<InlineDialogBody>Body text</InlineDialogBody>)
    expect(screen.getByText("Body text")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<InlineDialogBody data-testid="body">Body</InlineDialogBody>)
    const el = screen.getByTestId("body")
    expect(el.className).toContain("pm-inline-dialog__body")
  })

  it("forwards ref", () => {
    let bodyRef: HTMLDivElement | null = null
    render(<InlineDialogBody ref={(el) => (bodyRef = el)}>Body</InlineDialogBody>)
    expect(bodyRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <InlineDialogBody className="custom-body" data-testid="body">
        Body
      </InlineDialogBody>,
    )
    const el = screen.getByTestId("body")
    expect(el.className).toContain("pm-inline-dialog__body")
    expect(el.className).toContain("custom-body")
  })
})
