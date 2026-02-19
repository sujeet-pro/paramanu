import { describe, it, expect, afterEach, vi } from "vitest"
import { render, screen, cleanup, fireEvent } from "@testing-library/react"
import { Search } from "./search-input.js"

afterEach(cleanup)

describe("Search", () => {
  it("renders a search input", () => {
    render(<Search aria-label="Search" />)
    const input = screen.getByLabelText("Search")
    expect(input).toHaveAttribute("type", "search")
  })

  it("applies wrapper classes", () => {
    const { container } = render(<Search aria-label="Search" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-search")
    expect(wrapper?.className).toContain("pm-search--outline")
    expect(wrapper?.className).toContain("pm-search--md")
  })

  it("wrapper has role=search", () => {
    const { container } = render(<Search aria-label="Search" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.getAttribute("role")).toBe("search")
  })

  it("applies input classes", () => {
    render(<Search aria-label="Search" />)
    const input = screen.getByLabelText("Search")
    expect(input.className).toContain("pm-input")
    expect(input.className).toContain("pm-input--outline")
    expect(input.className).toContain("pm-input--md")
  })

  it("applies variant class", () => {
    const { container } = render(<Search variant="filled" aria-label="Search" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-search--filled")
  })

  it("applies size class", () => {
    const { container } = render(<Search size="lg" aria-label="Search" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-search--lg")
  })

  it("applies full-width class", () => {
    const { container } = render(<Search fullWidth aria-label="Search" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-search--full-width")
  })

  it("renders search icon with aria-hidden", () => {
    const { container } = render(<Search aria-label="Search" />)
    const icon = container.querySelector(".pm-search__icon")
    expect(icon?.getAttribute("aria-hidden")).toBe("true")
  })

  it("shows clear button when value is provided", () => {
    render(<Search value="test" onChange={() => {}} aria-label="Search" />)
    expect(screen.getByLabelText("Clear search")).toBeInTheDocument()
  })

  it("hides clear button when value is empty", () => {
    render(<Search value="" onChange={() => {}} aria-label="Search" />)
    expect(screen.queryByLabelText("Clear search")).not.toBeInTheDocument()
  })

  it("calls onClear when clear button is clicked", () => {
    const onClear = vi.fn()
    render(<Search value="test" onChange={() => {}} onClear={onClear} aria-label="Search" />)
    fireEvent.click(screen.getByLabelText("Clear search"))
    expect(onClear).toHaveBeenCalledOnce()
  })

  it("sets disabled attribute and aria-disabled", () => {
    render(<Search disabled aria-label="Search" />)
    const input = screen.getByLabelText("Search")
    expect(input).toBeDisabled()
    expect(input).toHaveAttribute("aria-disabled", "true")
  })

  it("sets aria-invalid when invalid", () => {
    render(<Search invalid aria-label="Search" />)
    const input = screen.getByLabelText("Search")
    expect(input).toHaveAttribute("aria-invalid", "true")
  })

  it("forwards ref to the input element", () => {
    let inputRef: HTMLInputElement | null = null
    render(<Search ref={(el) => (inputRef = el)} aria-label="Search" />)
    expect(inputRef).toBeInstanceOf(HTMLInputElement)
    expect(inputRef?.type).toBe("search")
  })

  it("merges custom className on wrapper", () => {
    const { container } = render(<Search className="custom-class" aria-label="Search" />)
    const wrapper = container.firstElementChild
    expect(wrapper?.className).toContain("pm-search")
    expect(wrapper?.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Search data-testid="my-search" aria-label="Search" placeholder="Search..." />)
    const input = screen.getByTestId("my-search")
    expect(input).toHaveAttribute("placeholder", "Search...")
  })
})
