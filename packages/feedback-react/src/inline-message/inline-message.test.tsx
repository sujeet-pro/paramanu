import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { InlineMessage } from "./inline-message.js"

afterEach(cleanup)

describe("InlineMessage", () => {
  it("renders with role=status by default", () => {
    render(<InlineMessage>Info message</InlineMessage>)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("renders with role=status for info variant", () => {
    render(<InlineMessage variant="info">Info</InlineMessage>)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("renders with role=status for success variant", () => {
    render(<InlineMessage variant="success">Success</InlineMessage>)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("renders with role=alert for warning variant", () => {
    render(<InlineMessage variant="warning">Warning</InlineMessage>)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("renders with role=alert for danger variant", () => {
    render(<InlineMessage variant="danger">Danger</InlineMessage>)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<InlineMessage>Default</InlineMessage>)
    const message = screen.getByRole("status")
    expect(message.className).toContain("pm-inline-message")
    expect(message.className).toContain("pm-inline-message--info")
  })

  it("applies variant class", () => {
    render(<InlineMessage variant="success">Success</InlineMessage>)
    const message = screen.getByRole("status")
    expect(message.className).toContain("pm-inline-message--success")
  })

  it("renders children", () => {
    render(<InlineMessage>Hello world</InlineMessage>)
    expect(screen.getByText("Hello world")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let messageRef: HTMLDivElement | null = null
    render(<InlineMessage ref={(el) => (messageRef = el)}>Ref</InlineMessage>)
    expect(messageRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<InlineMessage className="custom-class">Custom</InlineMessage>)
    const message = screen.getByRole("status")
    expect(message.className).toContain("pm-inline-message")
    expect(message.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<InlineMessage data-testid="my-message">Test</InlineMessage>)
    expect(screen.getByTestId("my-message")).toBeInTheDocument()
  })
})
