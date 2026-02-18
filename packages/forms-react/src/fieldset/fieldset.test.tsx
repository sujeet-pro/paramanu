import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Fieldset } from "./fieldset.js"

afterEach(cleanup)

describe("Fieldset", () => {
  it("renders with children", () => {
    render(
      <Fieldset legend="Info">
        <input />
      </Fieldset>,
    )
    expect(screen.getByRole("group")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(
      <Fieldset data-testid="fs">
        <input />
      </Fieldset>,
    )
    const el = screen.getByTestId("fs")
    expect(el.className).toContain("pm-fieldset")
    expect(el.className).toContain("pm-fieldset--default")
  })

  it("applies card variant", () => {
    render(
      <Fieldset variant="card" data-testid="fs">
        <input />
      </Fieldset>,
    )
    const el = screen.getByTestId("fs")
    expect(el.className).toContain("pm-fieldset--card")
  })

  it("renders legend element", () => {
    render(
      <Fieldset legend="Personal Information">
        <input />
      </Fieldset>,
    )
    expect(screen.getByText("Personal Information")).toBeInTheDocument()
    expect(screen.getByText("Personal Information").tagName).toBe("LEGEND")
    expect(screen.getByText("Personal Information").className).toContain("pm-fieldset__legend")
  })

  it("does not render legend when not provided", () => {
    render(
      <Fieldset data-testid="fs">
        <input />
      </Fieldset>,
    )
    const el = screen.getByTestId("fs")
    expect(el.querySelector("legend")).toBeNull()
  })

  it("applies disabled attribute", () => {
    render(
      <Fieldset disabled data-testid="fs">
        <input />
      </Fieldset>,
    )
    const el = screen.getByTestId("fs")
    expect(el).toBeDisabled()
    expect(el.className).toContain("pm-fieldset--disabled")
  })

  it("renders as a fieldset element", () => {
    render(
      <Fieldset data-testid="fs">
        <input />
      </Fieldset>,
    )
    const el = screen.getByTestId("fs")
    expect(el.tagName).toBe("FIELDSET")
  })

  it("forwards ref", () => {
    let fieldsetRef: HTMLFieldSetElement | null = null
    render(
      <Fieldset ref={(el) => (fieldsetRef = el)}>
        <input />
      </Fieldset>,
    )
    expect(fieldsetRef).toBeInstanceOf(HTMLFieldSetElement)
  })

  it("merges custom className", () => {
    render(
      <Fieldset className="custom-class" data-testid="fs">
        <input />
      </Fieldset>,
    )
    const el = screen.getByTestId("fs")
    expect(el.className).toContain("pm-fieldset")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <Fieldset data-testid="my-fieldset">
        <input />
      </Fieldset>,
    )
    expect(screen.getByTestId("my-fieldset")).toBeInTheDocument()
  })
})
