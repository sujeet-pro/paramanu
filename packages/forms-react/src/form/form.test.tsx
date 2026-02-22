import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Form } from "./form.js"

afterEach(cleanup)

describe("Form", () => {
  it("renders with children", () => {
    render(
      <Form aria-label="test form">
        <input />
      </Form>,
    )
    expect(screen.getByRole("form")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(
      <Form data-testid="frm">
        <input />
      </Form>,
    )
    const el = screen.getByTestId("frm")
    expect(el.className).toContain("pm-form")
    expect(el.className).toContain("pm-form--vertical")
    expect(el.className).toContain("pm-form--gap-md")
  })

  it("applies horizontal layout", () => {
    render(
      <Form layout="horizontal" data-testid="frm">
        <input />
      </Form>,
    )
    const el = screen.getByTestId("frm")
    expect(el.className).toContain("pm-form--horizontal")
  })

  it("applies inline layout", () => {
    render(
      <Form layout="inline" data-testid="frm">
        <input />
      </Form>,
    )
    const el = screen.getByTestId("frm")
    expect(el.className).toContain("pm-form--inline")
  })

  it("applies gap-sm", () => {
    render(
      <Form gap="sm" data-testid="frm">
        <input />
      </Form>,
    )
    const el = screen.getByTestId("frm")
    expect(el.className).toContain("pm-form--gap-sm")
  })

  it("applies gap-lg", () => {
    render(
      <Form gap="lg" data-testid="frm">
        <input />
      </Form>,
    )
    const el = screen.getByTestId("frm")
    expect(el.className).toContain("pm-form--gap-lg")
  })

  it("renders as a form element", () => {
    render(
      <Form data-testid="frm">
        <input />
      </Form>,
    )
    const el = screen.getByTestId("frm")
    expect(el.tagName).toBe("FORM")
  })

  it("passes onSubmit handler", () => {
    let submitted = false
    render(
      <Form
        onSubmit={(e) => {
          e.preventDefault()
          submitted = true
        }}
        data-testid="frm"
      >
        <button type="submit">Submit</button>
      </Form>,
    )
    screen.getByTestId("frm").dispatchEvent(new Event("submit", { bubbles: true }))
    expect(submitted).toBe(true)
  })

  it("forwards ref", () => {
    let formRef: HTMLFormElement | null = null
    render(
      <Form ref={(el) => (formRef = el)}>
        <input />
      </Form>,
    )
    expect(formRef).toBeInstanceOf(HTMLFormElement)
  })

  it("merges custom className", () => {
    render(
      <Form className="custom-class" data-testid="frm">
        <input />
      </Form>,
    )
    const el = screen.getByTestId("frm")
    expect(el.className).toContain("pm-form")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <Form data-testid="my-form">
        <input />
      </Form>,
    )
    expect(screen.getByTestId("my-form")).toBeInTheDocument()
  })
})
