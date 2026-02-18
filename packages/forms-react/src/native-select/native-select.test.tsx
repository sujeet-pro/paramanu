import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { NativeSelect } from "./native-select.js"

afterEach(cleanup)

describe("NativeSelect", () => {
  it("renders a select element", () => {
    render(
      <NativeSelect aria-label="Country">
        <option value="us">US</option>
      </NativeSelect>,
    )
    expect(screen.getByRole("combobox", { name: "Country" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(
      <NativeSelect aria-label="Country">
        <option value="us">US</option>
      </NativeSelect>,
    )
    const wrapper = screen.getByRole("combobox", { name: "Country" }).closest("div")
    expect(wrapper?.className).toContain("pm-native-select")
    expect(wrapper?.className).toContain("pm-native-select--outline")
    expect(wrapper?.className).toContain("pm-native-select--md")
  })

  it("applies variant class", () => {
    render(
      <NativeSelect variant="filled" aria-label="Country">
        <option value="us">US</option>
      </NativeSelect>,
    )
    const wrapper = screen.getByRole("combobox", { name: "Country" }).closest("div")
    expect(wrapper?.className).toContain("pm-native-select--filled")
  })

  it("applies size class", () => {
    render(
      <NativeSelect size="lg" aria-label="Country">
        <option value="us">US</option>
      </NativeSelect>,
    )
    const wrapper = screen.getByRole("combobox", { name: "Country" }).closest("div")
    expect(wrapper?.className).toContain("pm-native-select--lg")
  })

  it("sets disabled attribute and aria-disabled", () => {
    render(
      <NativeSelect disabled aria-label="Country">
        <option value="us">US</option>
      </NativeSelect>,
    )
    const select = screen.getByRole("combobox", { name: "Country" })
    expect(select).toBeDisabled()
    expect(select).toHaveAttribute("aria-disabled", "true")
  })

  it("sets aria-invalid when invalid", () => {
    render(
      <NativeSelect invalid aria-label="Country">
        <option value="us">US</option>
      </NativeSelect>,
    )
    const select = screen.getByRole("combobox", { name: "Country" })
    expect(select).toHaveAttribute("aria-invalid", "true")
  })

  it("applies full-width modifier", () => {
    render(
      <NativeSelect fullWidth aria-label="Country">
        <option value="us">US</option>
      </NativeSelect>,
    )
    const wrapper = screen.getByRole("combobox", { name: "Country" }).closest("div")
    expect(wrapper?.className).toContain("pm-native-select--full-width")
  })

  it("forwards ref to select element", () => {
    let selectRef: HTMLSelectElement | null = null
    render(
      <NativeSelect ref={(el) => (selectRef = el)} aria-label="Country">
        <option value="us">US</option>
      </NativeSelect>,
    )
    expect(selectRef).toBeInstanceOf(HTMLSelectElement)
  })

  it("renders children as options", () => {
    render(
      <NativeSelect aria-label="Country">
        <option value="us">US</option>
        <option value="uk">UK</option>
      </NativeSelect>,
    )
    const options = screen.getAllByRole("option")
    expect(options).toHaveLength(2)
  })

  it("hides arrow from screen readers", () => {
    const { container } = render(
      <NativeSelect aria-label="Country">
        <option value="us">US</option>
      </NativeSelect>,
    )
    const arrow = container.querySelector(".pm-native-select__arrow")
    expect(arrow).toHaveAttribute("aria-hidden", "true")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <NativeSelect data-testid="my-select" aria-label="Country">
        <option value="us">US</option>
      </NativeSelect>,
    )
    expect(screen.getByTestId("my-select")).toBeInTheDocument()
  })
})
