import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { FormControl } from "./form-control.js"

afterEach(cleanup)

describe("FormControl", () => {
  it("renders with children", () => {
    render(
      <FormControl>
        <label>Name</label>
      </FormControl>,
    )
    expect(screen.getByText("Name")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(
      <FormControl data-testid="fc">
        <input />
      </FormControl>,
    )
    const el = screen.getByTestId("fc")
    expect(el.className).toContain("pm-form-control")
    expect(el.className).toContain("pm-form-control--vertical")
  })

  it("applies horizontal orientation", () => {
    render(
      <FormControl orientation="horizontal" data-testid="fc">
        <input />
      </FormControl>,
    )
    const el = screen.getByTestId("fc")
    expect(el.className).toContain("pm-form-control--horizontal")
  })

  it("applies invalid modifier", () => {
    render(
      <FormControl invalid data-testid="fc">
        <input />
      </FormControl>,
    )
    const el = screen.getByTestId("fc")
    expect(el.className).toContain("pm-form-control--invalid")
  })

  it("applies disabled modifier", () => {
    render(
      <FormControl disabled data-testid="fc">
        <input />
      </FormControl>,
    )
    const el = screen.getByTestId("fc")
    expect(el.className).toContain("pm-form-control--disabled")
  })

  it("renders helper text when not invalid", () => {
    render(
      <FormControl helperText="Enter your name">
        <input />
      </FormControl>,
    )
    expect(screen.getByText("Enter your name")).toBeInTheDocument()
    expect(screen.getByText("Enter your name").className).toContain(
      "pm-form-control__helper-text",
    )
  })

  it("does not render helper text when invalid", () => {
    render(
      <FormControl invalid helperText="Enter your name">
        <input />
      </FormControl>,
    )
    expect(screen.queryByText("Enter your name")).not.toBeInTheDocument()
  })

  it("renders error text when invalid", () => {
    render(
      <FormControl invalid errorText="This field is required">
        <input />
      </FormControl>,
    )
    expect(screen.getByText("This field is required")).toBeInTheDocument()
    expect(screen.getByText("This field is required").className).toContain(
      "pm-form-control__error-text",
    )
  })

  it("does not render error text when not invalid", () => {
    render(
      <FormControl errorText="This field is required">
        <input />
      </FormControl>,
    )
    expect(screen.queryByText("This field is required")).not.toBeInTheDocument()
  })

  it("has group role", () => {
    render(
      <FormControl data-testid="fc">
        <input />
      </FormControl>,
    )
    expect(screen.getByRole("group")).toBeInTheDocument()
  })

  it("forwards ref", () => {
    let divRef: HTMLDivElement | null = null
    render(
      <FormControl ref={(el) => (divRef = el)}>
        <input />
      </FormControl>,
    )
    expect(divRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <FormControl className="custom-class" data-testid="fc">
        <input />
      </FormControl>,
    )
    const el = screen.getByTestId("fc")
    expect(el.className).toContain("pm-form-control")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <FormControl data-testid="my-fc">
        <input />
      </FormControl>,
    )
    expect(screen.getByTestId("my-fc")).toBeInTheDocument()
  })
})
