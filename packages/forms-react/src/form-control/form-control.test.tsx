import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { FormCtrl } from "./form-control.js"

afterEach(cleanup)

describe("FormCtrl", () => {
  it("renders with children", () => {
    render(
      <FormCtrl>
        <label>Name</label>
      </FormCtrl>,
    )
    expect(screen.getByText("Name")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(
      <FormCtrl data-testid="fc">
        <input />
      </FormCtrl>,
    )
    const el = screen.getByTestId("fc")
    expect(el.className).toContain("pm-form-ctrl")
    expect(el.className).toContain("pm-form-ctrl--vertical")
  })

  it("applies horizontal orientation", () => {
    render(
      <FormCtrl orientation="horizontal" data-testid="fc">
        <input />
      </FormCtrl>,
    )
    const el = screen.getByTestId("fc")
    expect(el.className).toContain("pm-form-ctrl--horizontal")
  })

  it("applies invalid modifier", () => {
    render(
      <FormCtrl invalid data-testid="fc">
        <input />
      </FormCtrl>,
    )
    const el = screen.getByTestId("fc")
    expect(el.className).toContain("pm-form-ctrl--invalid")
  })

  it("applies disabled modifier", () => {
    render(
      <FormCtrl disabled data-testid="fc">
        <input />
      </FormCtrl>,
    )
    const el = screen.getByTestId("fc")
    expect(el.className).toContain("pm-form-ctrl--disabled")
  })

  it("renders helper text when not invalid", () => {
    render(
      <FormCtrl helperText="Enter your name">
        <input />
      </FormCtrl>,
    )
    expect(screen.getByText("Enter your name")).toBeInTheDocument()
    expect(screen.getByText("Enter your name").className).toContain("pm-form-ctrl__helper-text")
  })

  it("does not render helper text when invalid", () => {
    render(
      <FormCtrl invalid helperText="Enter your name">
        <input />
      </FormCtrl>,
    )
    expect(screen.queryByText("Enter your name")).not.toBeInTheDocument()
  })

  it("renders error text when invalid", () => {
    render(
      <FormCtrl invalid errorText="This field is required">
        <input />
      </FormCtrl>,
    )
    expect(screen.getByText("This field is required")).toBeInTheDocument()
    expect(screen.getByText("This field is required").className).toContain(
      "pm-form-ctrl__error-text",
    )
  })

  it("does not render error text when not invalid", () => {
    render(
      <FormCtrl errorText="This field is required">
        <input />
      </FormCtrl>,
    )
    expect(screen.queryByText("This field is required")).not.toBeInTheDocument()
  })

  it("has group role", () => {
    render(
      <FormCtrl data-testid="fc">
        <input />
      </FormCtrl>,
    )
    expect(screen.getByRole("group")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let divRef: HTMLDivElement | null = null
    render(
      <FormCtrl ref={(el) => (divRef = el)}>
        <input />
      </FormCtrl>,
    )
    expect(divRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <FormCtrl className="custom-class" data-testid="fc">
        <input />
      </FormCtrl>,
    )
    const el = screen.getByTestId("fc")
    expect(el.className).toContain("pm-form-ctrl")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <FormCtrl data-testid="my-fc">
        <input />
      </FormCtrl>,
    )
    expect(screen.getByTestId("my-fc")).toBeInTheDocument()
  })
})
