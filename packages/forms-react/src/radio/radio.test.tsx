import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Radio, RadioGroup } from "./radio.js"

afterEach(cleanup)

describe("Radio", () => {
  it("renders with text content", () => {
    render(<Radio>Option A</Radio>)
    expect(screen.getByRole("radio")).toBeInTheDocument()
    expect(screen.getByText("Option A")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Radio>Default</Radio>)
    const label = screen.getByText("Default").closest("label")
    expect(label?.className).toContain("pm-radio")
    expect(label?.className).toContain("pm-radio--md")
  })

  it("applies size class", () => {
    render(<Radio size="lg">Large</Radio>)
    const label = screen.getByText("Large").closest("label")
    expect(label?.className).toContain("pm-radio--lg")
  })

  it("applies checked state", () => {
    render(
      <Radio checked onChange={() => {}}>
        Selected
      </Radio>,
    )
    const input = screen.getByRole("radio")
    expect(input).toBeChecked()
  })

  it("applies disabled state", () => {
    render(<Radio disabled>Disabled</Radio>)
    const input = screen.getByRole("radio")
    expect(input).toBeDisabled()
    const label = screen.getByText("Disabled").closest("label")
    expect(label?.className).toContain("pm-radio--disabled")
  })

  it("applies invalid state", () => {
    render(<Radio invalid>Invalid</Radio>)
    const input = screen.getByRole("radio")
    expect(input).toHaveAttribute("aria-invalid", "true")
    const label = screen.getByText("Invalid").closest("label")
    expect(label?.className).toContain("pm-radio--invalid")
  })

  it("sets name and value attributes", () => {
    render(
      <Radio name="color" value="red">
        Red
      </Radio>,
    )
    const input = screen.getByRole("radio")
    expect(input).toHaveAttribute("name", "color")
    expect(input).toHaveAttribute("value", "red")
  })

  it("forwards ref", () => {
    let inputRef: HTMLInputElement | null = null
    render(<Radio ref={(el) => (inputRef = el)}>Ref</Radio>)
    expect(inputRef).toBeInstanceOf(HTMLInputElement)
  })

  it("merges custom className", () => {
    render(<Radio className="custom-class">Custom</Radio>)
    const label = screen.getByText("Custom").closest("label")
    expect(label?.className).toContain("pm-radio")
    expect(label?.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Radio data-testid="my-radio">Test</Radio>)
    expect(screen.getByTestId("my-radio")).toBeInTheDocument()
  })
})

describe("RadioGroup", () => {
  it("renders with role=radiogroup", () => {
    render(
      <RadioGroup>
        <Radio>A</Radio>
        <Radio>B</Radio>
      </RadioGroup>,
    )
    expect(screen.getByRole("radiogroup")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<RadioGroup>Content</RadioGroup>)
    const group = screen.getByRole("radiogroup")
    expect(group.className).toContain("pm-radio-group")
    expect(group.className).toContain("pm-radio-group--vertical")
    expect(group.className).toContain("pm-radio-group--md")
  })

  it("applies horizontal orientation", () => {
    render(<RadioGroup orientation="horizontal">Content</RadioGroup>)
    const group = screen.getByRole("radiogroup")
    expect(group.className).toContain("pm-radio-group--horizontal")
  })

  it("applies size class", () => {
    render(<RadioGroup size="lg">Content</RadioGroup>)
    const group = screen.getByRole("radiogroup")
    expect(group.className).toContain("pm-radio-group--lg")
  })

  it("forwards ref", () => {
    let groupRef: HTMLDivElement | null = null
    render(<RadioGroup ref={(el) => (groupRef = el)}>Content</RadioGroup>)
    expect(groupRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<RadioGroup className="custom-group">Content</RadioGroup>)
    const group = screen.getByRole("radiogroup")
    expect(group.className).toContain("pm-radio-group")
    expect(group.className).toContain("custom-group")
  })
})
