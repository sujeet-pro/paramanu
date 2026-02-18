import { describe, it, expect, afterEach, vi } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import { Notification } from "./notification.js"

afterEach(cleanup)

describe("Notification", () => {
  it("renders with default classes", () => {
    const { container } = render(<Notification title="Test" />)
    const notification = container.firstElementChild as HTMLElement
    expect(notification.className).toContain("pm-notification")
  })

  it("applies unread class", () => {
    const { container } = render(<Notification unread title="Unread" />)
    const notification = container.firstElementChild as HTMLElement
    expect(notification.className).toContain("pm-notification--unread")
  })

  it("renders title", () => {
    render(<Notification title="Notification Title" />)
    expect(screen.getByText("Notification Title")).toBeInTheDocument()
  })

  it("renders message", () => {
    render(<Notification message="Notification message" />)
    expect(screen.getByText("Notification message")).toBeInTheDocument()
  })

  it("renders icon", () => {
    render(<Notification icon={<span data-testid="icon">!</span>} />)
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })

  it("renders timestamp", () => {
    render(<Notification timestamp="5 mins ago" />)
    expect(screen.getByText("5 mins ago")).toBeInTheDocument()
  })

  it("renders actions", () => {
    render(<Notification actions={<button>Accept</button>} />)
    expect(screen.getByRole("button", { name: "Accept" })).toBeInTheDocument()
  })

  it("renders close button when dismissible with onClose", () => {
    const onClose = vi.fn()
    render(<Notification dismissible onClose={onClose} title="Test" />)
    expect(screen.getByLabelText("Close")).toBeInTheDocument()
  })

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn()
    render(<Notification dismissible onClose={onClose} title="Test" />)
    fireEvent.click(screen.getByLabelText("Close"))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("does not render close button when not dismissible", () => {
    render(<Notification title="Test" />)
    expect(screen.queryByLabelText("Close")).not.toBeInTheDocument()
  })

  it("does not render sub-elements when not provided", () => {
    const { container } = render(<Notification />)
    expect(container.querySelector(".pm-notification__icon")).not.toBeInTheDocument()
    expect(container.querySelector(".pm-notification__title")).not.toBeInTheDocument()
    expect(container.querySelector(".pm-notification__message")).not.toBeInTheDocument()
    expect(container.querySelector(".pm-notification__timestamp")).not.toBeInTheDocument()
    expect(container.querySelector(".pm-notification__actions")).not.toBeInTheDocument()
  })

  it("forwards ref", () => {
    let notifRef: HTMLDivElement | null = null
    render(<Notification ref={(el) => (notifRef = el)} />)
    expect(notifRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    const { container } = render(<Notification className="custom-class" />)
    const notification = container.firstElementChild as HTMLElement
    expect(notification.className).toContain("pm-notification")
    expect(notification.className).toContain("custom-class")
  })

  it("applies dismissible class", () => {
    const onClose = vi.fn()
    const { container } = render(<Notification dismissible onClose={onClose} />)
    const notification = container.firstElementChild as HTMLElement
    expect(notification.className).toContain("pm-notification--dismissible")
  })
})
