import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { FileUpload } from "./file-upload.js"

afterEach(cleanup)

describe("FileUpload", () => {
  it("renders a div element", () => {
    render(<FileUpload data-testid="file-upload" />)
    expect(screen.getByTestId("file-upload")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<FileUpload data-testid="file-upload" />)
    const el = screen.getByTestId("file-upload")
    expect(el.className).toContain("pm-file-upload")
    expect(el.className).toContain("pm-file-upload--md")
  })

  it("applies size class", () => {
    render(<FileUpload size="lg" data-testid="file-upload" />)
    const el = screen.getByTestId("file-upload")
    expect(el.className).toContain("pm-file-upload--lg")
  })

  it("sets aria-disabled when disabled", () => {
    render(<FileUpload disabled data-testid="file-upload" />)
    const el = screen.getByTestId("file-upload")
    expect(el).toHaveAttribute("aria-disabled", "true")
    expect(el.className).toContain("pm-file-upload--disabled")
  })

  it("forwards ref", () => {
    let elRef: HTMLDivElement | null = null
    render(<FileUpload ref={(el) => (elRef = el)} data-testid="file-upload" />)
    expect(elRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<FileUpload className="custom-class" data-testid="file-upload" />)
    const el = screen.getByTestId("file-upload")
    expect(el.className).toContain("pm-file-upload")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<FileUpload data-testid="my-upload" />)
    expect(screen.getByTestId("my-upload")).toBeInTheDocument()
  })

  it("renders children", () => {
    render(
      <FileUpload data-testid="file-upload">
        <button>Upload</button>
      </FileUpload>,
    )
    expect(screen.getByRole("button", { name: "Upload" })).toBeInTheDocument()
  })
})
