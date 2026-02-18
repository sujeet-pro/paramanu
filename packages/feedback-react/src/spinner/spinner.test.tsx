import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Spinner } from "./spinner.js"

afterEach(cleanup)

describe("Spinner", () => {
  it("renders with role=status", () => {
    render(<Spinner />)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Spinner />)
    const spinner = screen.getByRole("status")
    expect(spinner.className).toContain("pm-spinner")
    expect(spinner.className).toContain("pm-spinner--md")
    expect(spinner.className).toContain("pm-spinner--primary")
  })

  it("applies size class", () => {
    render(<Spinner size="lg" />)
    const spinner = screen.getByRole("status")
    expect(spinner.className).toContain("pm-spinner--lg")
  })

  it("applies variant class", () => {
    render(<Spinner variant="neutral" />)
    const spinner = screen.getByRole("status")
    expect(spinner.className).toContain("pm-spinner--neutral")
  })

  it("has visually hidden loading text", () => {
    render(<Spinner />)
    expect(screen.getByText("Loading")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let spinnerRef: HTMLDivElement | null = null
    render(<Spinner ref={(el) => (spinnerRef = el)} />)
    expect(spinnerRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Spinner className="custom-class" />)
    const spinner = screen.getByRole("status")
    expect(spinner.className).toContain("pm-spinner")
    expect(spinner.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Spinner data-testid="my-spinner" />)
    expect(screen.getByTestId("my-spinner")).toBeInTheDocument()
  })
})
