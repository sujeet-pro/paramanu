import { describe, it, expect, afterEach, vi } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import { Notif } from "./notification.js"

afterEach(cleanup)

describe("Notif", () => {
  it("renders with default classes", () => {
    const { container } = render(<Notif title="Test" />)
    const notification = container.firstElementChild as HTMLElement
    expect(notification.className).toContain("pm-notif")
  })

  it("applies unread class", () => {
    const { container } = render(<Notif unread title="Unread" />)
    const notification = container.firstElementChild as HTMLElement
    expect(notification.className).toContain("pm-notif--unread")
  })

  it("renders title", () => {
    render(<Notif title="Notif Title" />)
    expect(screen.getByText("Notif Title")).toBeInTheDocument()
  })

  it("renders message", () => {
    render(<Notif message="Notif message" />)
    expect(screen.getByText("Notif message")).toBeInTheDocument()
  })

  it("renders icon", () => {
    render(<Notif icon={<span data-testid="icon">!</span>} />)
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })

  it("renders timestamp", () => {
    render(<Notif timestamp="5 mins ago" />)
    expect(screen.getByText("5 mins ago")).toBeInTheDocument()
  })

  it("renders actions", () => {
    render(<Notif actions={<button>Accept</button>} />)
    expect(screen.getByRole("button", { name: "Accept" })).toBeInTheDocument()
  })

  it("renders close button when dismissible with onClose", () => {
    const onClose = vi.fn()
    render(<Notif dismissible onClose={onClose} title="Test" />)
    expect(screen.getByLabelText("Dismiss notification")).toBeInTheDocument()
  })

  it("calls onClose when close button is clicked", () => {
    const onClose = vi.fn()
    render(<Notif dismissible onClose={onClose} title="Test" />)
    fireEvent.click(screen.getByLabelText("Dismiss notification"))
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it("does not render close button when not dismissible", () => {
    render(<Notif title="Test" />)
    expect(screen.queryByLabelText("Dismiss notification")).not.toBeInTheDocument()
  })

  it("does not render sub-elements when not provided", () => {
    const { container } = render(<Notif />)
    expect(container.querySelector(".pm-notif__icon")).not.toBeInTheDocument()
    expect(container.querySelector(".pm-notif__title")).not.toBeInTheDocument()
    expect(container.querySelector(".pm-notif__message")).not.toBeInTheDocument()
    expect(container.querySelector(".pm-notif__timestamp")).not.toBeInTheDocument()
    expect(container.querySelector(".pm-notif__actions")).not.toBeInTheDocument()
  })

  it("forwards ref", () => {
    let notifRef: HTMLDivElement | null = null
    render(<Notif ref={(el) => (notifRef = el)} />)
    expect(notifRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    const { container } = render(<Notif className="custom-class" />)
    const notification = container.firstElementChild as HTMLElement
    expect(notification.className).toContain("pm-notif")
    expect(notification.className).toContain("custom-class")
  })

  it("applies dismissible class", () => {
    const onClose = vi.fn()
    const { container } = render(<Notif dismissible onClose={onClose} />)
    const notification = container.firstElementChild as HTMLElement
    expect(notification.className).toContain("pm-notif--dismissible")
  })
})
