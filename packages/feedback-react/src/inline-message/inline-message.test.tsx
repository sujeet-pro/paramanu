import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { InlineMsg } from "./inline-message.js"

afterEach(cleanup)

describe("InlineMsg", () => {
  it("renders with role=status by default", () => {
    render(<InlineMsg>Info message</InlineMsg>)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("renders with role=status for info variant", () => {
    render(<InlineMsg variant="info">Info</InlineMsg>)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("renders with role=status for success variant", () => {
    render(<InlineMsg variant="success">Success</InlineMsg>)
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("renders with role=alert for warning variant", () => {
    render(<InlineMsg variant="warning">Warning</InlineMsg>)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("renders with role=alert for danger variant", () => {
    render(<InlineMsg variant="danger">Danger</InlineMsg>)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<InlineMsg>Default</InlineMsg>)
    const message = screen.getByRole("status")
    expect(message.className).toContain("pm-inline-msg")
    expect(message.className).toContain("pm-inline-msg--info")
  })

  it("applies variant class", () => {
    render(<InlineMsg variant="success">Success</InlineMsg>)
    const message = screen.getByRole("status")
    expect(message.className).toContain("pm-inline-msg--success")
  })

  it("renders children", () => {
    render(<InlineMsg>Hello world</InlineMsg>)
    expect(screen.getByText("Hello world")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let messageRef: HTMLDivElement | null = null
    render(<InlineMsg ref={(el) => (messageRef = el)}>Ref</InlineMsg>)
    expect(messageRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<InlineMsg className="custom-class">Custom</InlineMsg>)
    const message = screen.getByRole("status")
    expect(message.className).toContain("pm-inline-msg")
    expect(message.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<InlineMsg data-testid="my-message">Test</InlineMsg>)
    expect(screen.getByTestId("my-message")).toBeInTheDocument()
  })
})
