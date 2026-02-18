import { describe, it, expect, afterEach, vi } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import { SearchInput } from "./search-input.js"

afterEach(cleanup)

describe("SearchInput", () => {
  it("renders a search input", () => {
    render(<SearchInput aria-label="Search" />)
    const input = screen.getByLabelText("Search")
    expect(input).toHaveAttribute("type", "search")
  })

  it("applies wrapper classes", () => {
    const { container } = render(<SearchInput aria-label="Search" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-search-input")
    expect(wrapper?.className).toContain("pm-search-input--outline")
    expect(wrapper?.className).toContain("pm-search-input--md")
  })

  it("wrapper has role=search", () => {
    const { container } = render(<SearchInput aria-label="Search" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.getAttribute("role")).toBe("search")
  })

  it("applies input classes", () => {
    render(<SearchInput aria-label="Search" />)
    const input = screen.getByLabelText("Search")
    expect(input.className).toContain("pm-input")
    expect(input.className).toContain("pm-input--outline")
    expect(input.className).toContain("pm-input--md")
  })

  it("applies variant class", () => {
    const { container } = render(<SearchInput variant="filled" aria-label="Search" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-search-input--filled")
  })

  it("applies size class", () => {
    const { container } = render(<SearchInput size="lg" aria-label="Search" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-search-input--lg")
  })

  it("applies full-width class", () => {
    const { container } = render(<SearchInput fullWidth aria-label="Search" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-search-input--full-width")
  })

  it("renders search icon with aria-hidden", () => {
    const { container } = render(<SearchInput aria-label="Search" />)
    const icon = container.querySelector(".pm-search-input__icon")
    expect(icon?.getAttribute("aria-hidden")).toBe("true")
  })

  it("shows clear button when value is provided", () => {
    render(<SearchInput value="test" onChange={() => {}} aria-label="Search" />)
    expect(screen.getByLabelText("Clear search")).toBeInTheDocument()
  })

  it("hides clear button when value is empty", () => {
    render(<SearchInput value="" onChange={() => {}} aria-label="Search" />)
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument()
  })

  it("calls onClear when clear button is clicked", () => {
    const onClear = vi.fn()
    render(<SearchInput value="test" onChange={() => {}} onClear={onClear} aria-label="Search" />)
    fireEvent.click(screen.getByLabelText("Clear search"))
    expect(onClear).toHaveBeenCalledOnce()
  })

  it("sets disabled attribute and aria-disabled", () => {
    render(<SearchInput disabled aria-label="Search" />)
    const input = screen.getByLabelText("Search")
    expect(input).toBeDisabled()
    expect(input).toHaveAttribute("aria-disabled", "true")
  })

  it("sets aria-invalid when invalid", () => {
    render(<SearchInput invalid aria-label="Search" />)
    const input = screen.getByLabelText("Search")
    expect(input).toHaveAttribute("aria-invalid", "true")
  })

  it("forwards ref to the input element", () => {
    let inputRef: HTMLInputElement | null = null
    render(<SearchInput ref={(el) => (inputRef = el)} aria-label="Search" />)
    expect(inputRef).toBeInstanceOf(HTMLInputElement)
    expect(inputRef?.type).toBe("search")
  })

  it("merges custom className on wrapper", () => {
    const { container } = render(<SearchInput className="custom-class" aria-label="Search" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-search-input")
    expect(wrapper?.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<SearchInput data-testid="my-search" aria-label="Search" placeholder="Search..." />)
    const input = screen.getByTestId("my-search")
    expect(input).toHaveAttribute("placeholder", "Search...")
  })
})
