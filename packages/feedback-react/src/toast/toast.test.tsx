import { describe, it, expect, afterEach, vi } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import { Toast, ToastContainer } from "./toast.js"

afterEach(cleanup)

describe("Toast", () => {
  it("renders with role=status for info variant", () => {
    render(<Toast message="Info toast" />)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("renders with role=status for success variant", () => {
    render(<Toast variant="success" message="Success" />)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("renders with role=alert for warning variant", () => {
    render(<Toast variant="warning" message="Warning" />)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("renders with role=alert for danger variant", () => {
    render(<Toast variant="danger" message="Danger" />)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Toast message="Default" />)
    const toast = screen.getByRole("status")
    expect(toast.className).toContain("pm-toast")
    expect(toast.className).toContain("pm-toast--info")
  })

  it("applies variant class", () => {
    render(<Toast variant="success" message="Success" />)
    const toast = screen.getByRole("status")
    expect(toast.className).toContain("pm-toast--success")
  })

  it("applies entering class", () => {
    render(<Toast entering message="Entering" />)
    const toast = screen.getByRole("status")
    expect(toast.className).toContain("pm-toast--entering")
  })

  it("applies exiting class", () => {
    render(<Toast exiting message="Exiting" />)
    const toast = screen.getByRole("status")
    expect(toast.className).toContain("pm-toast--exiting")
  })

  it("renders message", () => {
    render(<Toast message="Toast message" />)
    expect(screen.getByText("Toast message")).toBeInTheDocument()
  })

  it("renders icon", () => {
    render(<Toast icon={<span data-testid="icon">!</span>} message="Test" />)
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })

  it("renders close button when dismissible with onClose", () => {
    const onClose = vi.fn()
    render(<Toast dismissible onClose={onClose} message="Test" />)
    expect(screen.getByLabelText("Close")).toBeInTheDocument()
  })

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn()
    render(<Toast dismissible onClose={onClose} message="Test" />)
    fireEvent.click(screen.getByLabelText("Close"))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("does not render close button when not dismissible", () => {
    render(<Toast message="Test" />)
    expect(screen.queryByLabelText("Close")).not.toBeInTheDocument()
  })

  it("auto-dismisses after duration", () => {
    vi.useFakeTimers()
    const onClose = vi.fn()
    render(<Toast duration={3000} onClose={onClose} message="Auto" />)
    expect(onClose).not.toHaveBeenCalled()
    vi.advanceTimersByTime(3000)
    expect(onClose).toHaveBeenCalledTimes(1)
    vi.useRealTimers()
  })

  it("does not auto-dismiss without duration", () => {
    vi.useFakeTimers()
    const onClose = vi.fn()
    render(<Toast onClose={onClose} message="No duration" />)
    vi.advanceTimersByTime(10000)
    expect(onClose).not.toHaveBeenCalled()
    vi.useRealTimers()
  })

  it("forwards ref", () => {
    let toastRef: HTMLDivElement | null = null
    render(<Toast ref={(el) => (toastRef = el)} message="Ref" />)
    expect(toastRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Toast className="custom-class" message="Custom" />)
    const toast = screen.getByRole("status")
    expect(toast.className).toContain("pm-toast")
    expect(toast.className).toContain("custom-class")
  })
})

describe("ToastContainer", () => {
  it("applies default classes", () => {
    const { container } = render(<ToastContainer>Content</ToastContainer>)
    const toastContainer = container.firstElementChild as HTMLElement
    expect(toastContainer.className).toContain("pm-toast-container")
    expect(toastContainer.className).toContain("pm-toast-container--top-right")
  })

  it("applies placement class", () => {
    const { container } = render(<ToastContainer placement="bottom-left">Content</ToastContainer>)
    const toastContainer = container.firstElementChild as HTMLElement
    expect(toastContainer.className).toContain("pm-toast-container--bottom-left")
  })

  it("renders children", () => {
    render(<ToastContainer>Toast children</ToastContainer>)
    expect(screen.getByText("Toast children")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let containerRef: HTMLDivElement | null = null
    render(<ToastContainer ref={(el) => (containerRef = el)}>Ref</ToastContainer>)
    expect(containerRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    const { container } = render(<ToastContainer className="custom-class">Custom</ToastContainer>)
    const toastContainer = container.firstElementChild as HTMLElement
    expect(toastContainer.className).toContain("pm-toast-container")
    expect(toastContainer.className).toContain("custom-class")
  })
})
