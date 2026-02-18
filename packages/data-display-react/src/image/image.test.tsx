import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Image } from "./image.js"

afterEach(cleanup)

describe("Image", () => {
  it("renders an img element with src", () => {
    render(<Image src="/photo.jpg" alt="A photo" />)
    const img = screen.getByRole("img", { name: "A photo" })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute("src", "/photo.jpg")
  })

  it("applies default classes", () => {
    render(<Image src="/photo.jpg" alt="Photo" data-testid="figure" />)
    const figure = screen.getByTestId("figure")
    expect(figure.className).toContain("pm-image")
    expect(figure.className).toContain("pm-image--fit-cover")
  })

  it("applies fit class", () => {
    render(<Image src="/photo.jpg" fit="contain" data-testid="figure" />)
    expect(screen.getByTestId("figure").className).toContain("pm-image--fit-contain")
  })

  it("applies radius class", () => {
    render(<Image src="/photo.jpg" radius="lg" data-testid="figure" />)
    expect(screen.getByTestId("figure").className).toContain("pm-image--radius-lg")
  })

  it("renders caption when provided", () => {
    render(<Image src="/photo.jpg" caption="A caption" />)
    expect(screen.getByText("A caption")).toBeInTheDocument()
  })

  it("shows loading state", () => {
    render(<Image loading data-testid="figure" />)
    expect(screen.getByTestId("figure").className).toContain("pm-image--loading")
  })

  it("forwards ref", () => {
    let imgRef: HTMLElement | null = null
    render(<Image ref={(el) => (imgRef = el)} src="/photo.jpg" />)
    expect(imgRef).toBeInstanceOf(HTMLElement)
  })

  it("merges custom className", () => {
    render(<Image src="/photo.jpg" className="custom" data-testid="figure" />)
    const figure = screen.getByTestId("figure")
    expect(figure.className).toContain("pm-image")
    expect(figure.className).toContain("custom")
  })

  it("passes through additional HTML attributes", () => {
    render(<Image src="/photo.jpg" data-testid="my-image" />)
    expect(screen.getByTestId("my-image")).toBeInTheDocument()
  })
})
