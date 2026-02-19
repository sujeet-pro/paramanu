import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Img } from "./image.js"

afterEach(cleanup)

describe("Img", () => {
  it("renders an img element with src", () => {
    render(<Img src="/photo.jpg" alt="A photo" />)
    const img = screen.getByRole("img", { name: "A photo" })
    expect(img).toBeInTheDocument()
    expect(img).toHaveAttribute("src", "/photo.jpg")
  })

  it("applies default classes", () => {
    render(<Img src="/photo.jpg" alt="Photo" data-testid="figure" />)
    const figure = screen.getByTestId("figure")
    expect(figure.className).toContain("pm-img")
    expect(figure.className).toContain("pm-img--fit-cover")
  })

  it("applies fit class", () => {
    render(<Img src="/photo.jpg" fit="contain" data-testid="figure" />)
    expect(screen.getByTestId("figure").className).toContain("pm-img--fit-contain")
  })

  it("applies radius class", () => {
    render(<Img src="/photo.jpg" radius="lg" data-testid="figure" />)
    expect(screen.getByTestId("figure").className).toContain("pm-img--radius-lg")
  })

  it("renders caption when provided", () => {
    render(<Img src="/photo.jpg" caption="A caption" />)
    expect(screen.getByText("A caption")).toBeInTheDocument()
  })

  it("shows loading state", () => {
    render(<Img loading data-testid="figure" />)
    expect(screen.getByTestId("figure").className).toContain("pm-img--loading")
  })

  it("forwards ref", () => {
    let imgRef: HTMLElement | null = null
    render(<Img ref={(el) => (imgRef = el)} src="/photo.jpg" />)
    expect(imgRef).toBeInstanceOf(HTMLElement)
  })

  it("merges custom className", () => {
    render(<Img src="/photo.jpg" className="custom" data-testid="figure" />)
    const figure = screen.getByTestId("figure")
    expect(figure.className).toContain("pm-img")
    expect(figure.className).toContain("custom")
  })

  it("passes through additional HTML attributes", () => {
    render(<Img src="/photo.jpg" data-testid="my-image" />)
    expect(screen.getByTestId("my-image")).toBeInTheDocument()
  })
})
