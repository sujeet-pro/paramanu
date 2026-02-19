import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { NativeSel } from "./native-select.js"

afterEach(cleanup)

describe("NativeSel", () => {
  it("renders a select element", () => {
    render(
      <NativeSel aria-label="Country">
        <option value="us">US</option>
      </NativeSel>,
    )
    expect(screen.getByRole("combobox", { name: "Country" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(
      <NativeSel aria-label="Country">
        <option value="us">US</option>
      </NativeSel>,
    )
    const wrapper = screen.getByRole("combobox", { name: "Country" }).closest("div")
    expect(wrapper?.className).toContain("pm-native-sel")
    expect(wrapper?.className).toContain("pm-native-sel--outline")
    expect(wrapper?.className).toContain("pm-native-sel--md")
  })

  it("applies variant class", () => {
    render(
      <NativeSel variant="filled" aria-label="Country">
        <option value="us">US</option>
      </NativeSel>,
    )
    const wrapper = screen.getByRole("combobox", { name: "Country" }).closest("div")
    expect(wrapper?.className).toContain("pm-native-sel--filled")
  })

  it("applies size class", () => {
    render(
      <NativeSel size="lg" aria-label="Country">
        <option value="us">US</option>
      </NativeSel>,
    )
    const wrapper = screen.getByRole("combobox", { name: "Country" }).closest("div")
    expect(wrapper?.className).toContain("pm-native-sel--lg")
  })

  it("sets disabled attribute and aria-disabled", () => {
    render(
      <NativeSel disabled aria-label="Country">
        <option value="us">US</option>
      </NativeSel>,
    )
    const select = screen.getByRole("combobox", { name: "Country" })
    expect(select).toBeDisabled()
    expect(select).toHaveAttribute("aria-disabled", "true")
  })

  it("sets aria-invalid when invalid", () => {
    render(
      <NativeSel invalid aria-label="Country">
        <option value="us">US</option>
      </NativeSel>,
    )
    const select = screen.getByRole("combobox", { name: "Country" })
    expect(select).toHaveAttribute("aria-invalid", "true")
  })

  it("applies full-width modifier", () => {
    render(
      <NativeSel fullWidth aria-label="Country">
        <option value="us">US</option>
      </NativeSel>,
    )
    const wrapper = screen.getByRole("combobox", { name: "Country" }).closest("div")
    expect(wrapper?.className).toContain("pm-native-sel--full-width")
  })

  it("forwards ref to select element", () => {
    let selectRef: HTMLSelectElement | null = null
    render(
      <NativeSel ref={(el) => (selectRef = el)} aria-label="Country">
        <option value="us">US</option>
      </NativeSel>,
    )
    expect(selectRef).toBeInstanceOf(HTMLSelectElement)
  })

  it("renders children as options", () => {
    render(
      <NativeSel aria-label="Country">
        <option value="us">US</option>
        <option value="uk">UK</option>
      </NativeSel>,
    )
    const options = screen.getAllByRole("option")
    expect(options).toHaveLength(2)
  })

  it("hides arrow from screen readers", () => {
    const { container } = render(
      <NativeSel aria-label="Country">
        <option value="us">US</option>
      </NativeSel>,
    )
    const arrow = container.querySelector(".pm-native-sel__arrow")
    expect(arrow).toHaveAttribute("aria-hidden", "true")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <NativeSel data-testid="my-select" aria-label="Country">
        <option value="us">US</option>
      </NativeSel>,
    )
    expect(screen.getByTestId("my-select")).toBeInTheDocument()
  })
})
