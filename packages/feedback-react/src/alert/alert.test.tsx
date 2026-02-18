import { describe, it, expect, afterEach, vi } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import { Alert } from "./alert.js"

afterEach(cleanup)

describe("Alert", () => {
  it("renders with role=status for info variant", () => {
    render(<Alert variant="info">Info alert</Alert>)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("renders with role=status for success variant", () => {
    render(<Alert variant="success">Success alert</Alert>)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("renders with role=alert for warning variant", () => {
    render(<Alert variant="warning">Warning alert</Alert>)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("renders with role=alert for danger variant", () => {
    render(<Alert variant="danger">Danger alert</Alert>)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Alert>Default</Alert>)
    const alert = screen.getByRole("status")
    expect(alert.className).toContain("pm-alert")
    expect(alert.className).toContain("pm-alert--info")
  })

  it("applies variant class", () => {
    render(<Alert variant="danger">Danger</Alert>)
    const alert = screen.getByRole("alert")
    expect(alert.className).toContain("pm-alert--danger")
  })

  it("renders title", () => {
    render(<Alert title="Alert Title">Content</Alert>)
    expect(screen.getByText("Alert Title")).toBeInTheDocument()
  })

  it("renders description", () => {
    render(<Alert description="Alert description">Content</Alert>)
    expect(screen.getByText("Alert description")).toBeInTheDocument()
  })

  it("renders icon", () => {
    render(<Alert icon={<span data-testid="icon">!</span>}>Content</Alert>)
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })

  it("renders close button when dismissible with onClose", () => {
    const onClose = vi.fn()
    render(<Alert dismissible onClose={onClose}>Content</Alert>)
    const closeButton = screen.getByLabelText("Close")
    expect(closeButton).toBeInTheDocument()
  })

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn()
    render(<Alert dismissible onClose={onClose}>Content</Alert>)
    fireEvent.click(screen.getByLabelText("Close"))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("does not render close button when not dismissible", () => {
    render(<Alert>Content</Alert>)
    expect(screen.queryByLabelText("Close")).not.toBeInTheDocument()
  })

  it("applies dismissible class", () => {
    const onClose = vi.fn()
    render(<Alert dismissible onClose={onClose}>Content</Alert>)
    const alert = screen.getByRole("status")
    expect(alert.className).toContain("pm-alert--dismissible")
  })

  it("renders children", () => {
    render(<Alert>Custom content</Alert>)
    expect(screen.getByText("Custom content")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let alertRef: HTMLDivElement | null = null
    render(<Alert ref={(el) => (alertRef = el)}>Ref</Alert>)
    expect(alertRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Alert className="custom-class">Custom</Alert>)
    const alert = screen.getByRole("status")
    expect(alert.className).toContain("pm-alert")
    expect(alert.className).toContain("custom-class")
  })
})
