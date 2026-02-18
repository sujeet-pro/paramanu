import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { TagsInput } from "./tags-input.js"

afterEach(cleanup)

describe("TagsInput", () => {
  it("renders a group element", () => {
    render(<TagsInput aria-label="Tags" />)
    expect(screen.getByRole("group", { name: "Tags" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<TagsInput aria-label="Tags" />)
    const tagsInput = screen.getByRole("group", { name: "Tags" })
    expect(tagsInput.className).toContain("pm-tags-input")
    expect(tagsInput.className).toContain("pm-tags-input--outline")
    expect(tagsInput.className).toContain("pm-tags-input--md")
  })

  it("applies variant class", () => {
    render(<TagsInput variant="filled" aria-label="Tags" />)
    const tagsInput = screen.getByRole("group", { name: "Tags" })
    expect(tagsInput.className).toContain("pm-tags-input--filled")
  })

  it("applies size class", () => {
    render(<TagsInput size="lg" aria-label="Tags" />)
    const tagsInput = screen.getByRole("group", { name: "Tags" })
    expect(tagsInput.className).toContain("pm-tags-input--lg")
  })

  it("sets aria-disabled when disabled", () => {
    render(<TagsInput disabled aria-label="Tags" />)
    const tagsInput = screen.getByRole("group", { name: "Tags" })
    expect(tagsInput).toHaveAttribute("aria-disabled", "true")
    expect(tagsInput.className).toContain("pm-tags-input--disabled")
  })

  it("sets aria-invalid when invalid", () => {
    render(<TagsInput invalid aria-label="Tags" />)
    const tagsInput = screen.getByRole("group", { name: "Tags" })
    expect(tagsInput).toHaveAttribute("aria-invalid", "true")
    expect(tagsInput.className).toContain("pm-tags-input--invalid")
  })

  it("forwards ref", () => {
    let tagsRef: HTMLDivElement | null = null
    render(<TagsInput ref={(el) => (tagsRef = el)} aria-label="Tags" />)
    expect(tagsRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<TagsInput className="custom-class" aria-label="Tags" />)
    const tagsInput = screen.getByRole("group", { name: "Tags" })
    expect(tagsInput.className).toContain("pm-tags-input")
    expect(tagsInput.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<TagsInput data-testid="my-tags" aria-label="Tags" />)
    expect(screen.getByTestId("my-tags")).toBeInTheDocument()
  })

  it("renders children", () => {
    render(
      <TagsInput aria-label="Tags">
        <span>Tag content</span>
      </TagsInput>,
    )
    expect(screen.getByText("Tag content")).toBeInTheDocument()
  })
})
