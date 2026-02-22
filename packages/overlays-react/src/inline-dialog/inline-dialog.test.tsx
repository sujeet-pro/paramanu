import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { InlineDlg, InlineDlgBody } from "./inline-dialog.js"

afterEach(cleanup)

describe("InlineDlg", () => {
  it("renders with children", () => {
    render(<InlineDlg>Dialog content</InlineDlg>)
    expect(screen.getByText("Dialog content")).toBeInTheDocument()
  })

  it("applies role=dialog without aria-modal", () => {
    render(<InlineDlg>Content</InlineDlg>)
    const dialog = screen.getByRole("dialog")
    expect(dialog).toHaveAttribute("role", "dialog")
    expect(dialog).not.toHaveAttribute("aria-modal")
  })

  it("applies default classes", () => {
    render(<InlineDlg>Content</InlineDlg>)
    const dialog = screen.getByRole("dialog")
    expect(dialog.className).toContain("pm-inline-dlg")
  })

  it("applies visible class when visible", () => {
    render(<InlineDlg visible>Content</InlineDlg>)
    const dialog = screen.getByRole("dialog")
    expect(dialog.className).toContain("pm-inline-dlg--visible")
  })

  it("does not apply visible class when not visible", () => {
    render(<InlineDlg>Content</InlineDlg>)
    const dialog = screen.getByRole("dialog")
    expect(dialog.className).not.toContain("pm-inline-dlg--visible")
  })

  it("forwards ref", () => {
    let dialogRef: HTMLDivElement | null = null
    render(<InlineDlg ref={(el) => (dialogRef = el)}>Content</InlineDlg>)
    expect(dialogRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<InlineDlg className="custom-class">Content</InlineDlg>)
    const dialog = screen.getByRole("dialog")
    expect(dialog.className).toContain("pm-inline-dlg")
    expect(dialog.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<InlineDlg data-testid="my-inline-dialog">Content</InlineDlg>)
    expect(screen.getByTestId("my-inline-dialog")).toBeInTheDocument()
  })
})

describe("InlineDlgBody", () => {
  it("renders with children", () => {
    render(<InlineDlgBody>Body text</InlineDlgBody>)
    expect(screen.getByText("Body text")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<InlineDlgBody data-testid="body">Body</InlineDlgBody>)
    const el = screen.getByTestId("body")
    expect(el.className).toContain("pm-inline-dlg__body")
  })

  it("forwards ref", () => {
    let bodyRef: HTMLDivElement | null = null
    render(<InlineDlgBody ref={(el) => (bodyRef = el)}>Body</InlineDlgBody>)
    expect(bodyRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <InlineDlgBody className="custom-body" data-testid="body">
        Body
      </InlineDlgBody>,
    )
    const el = screen.getByTestId("body")
    expect(el.className).toContain("pm-inline-dlg__body")
    expect(el.className).toContain("custom-body")
  })
})
