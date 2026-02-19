import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Upload } from "./file-upload.js"

afterEach(cleanup)

describe("Upload", () => {
  it("renders a div element", () => {
    render(<Upload data-testid="file-upload" />)
    expect(screen.getByTestId("file-upload")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Upload data-testid="file-upload" />)
    const el = screen.getByTestId("file-upload")
    expect(el.className).toContain("pm-upload")
    expect(el.className).toContain("pm-upload--md")
  })

  it("applies size class", () => {
    render(<Upload size="lg" data-testid="file-upload" />)
    const el = screen.getByTestId("file-upload")
    expect(el.className).toContain("pm-upload--lg")
  })

  it("sets aria-disabled when disabled", () => {
    render(<Upload disabled data-testid="file-upload" />)
    const el = screen.getByTestId("file-upload")
    expect(el).toHaveAttribute("aria-disabled", "true")
    expect(el.className).toContain("pm-upload--disabled")
  })

  it("forwards ref", () => {
    let elRef: HTMLDivElement | null = null
    render(<Upload ref={(el) => (elRef = el)} data-testid="file-upload" />)
    expect(elRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Upload className="custom-class" data-testid="file-upload" />)
    const el = screen.getByTestId("file-upload")
    expect(el.className).toContain("pm-upload")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Upload data-testid="my-upload" />)
    expect(screen.getByTestId("my-upload")).toBeInTheDocument()
  })

  it("renders children", () => {
    render(
      <Upload data-testid="file-upload">
        <button>Upload</button>
      </Upload>,
    )
    expect(screen.getByRole("button", { name: "Upload" })).toBeInTheDocument()
  })
})
