import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Slider } from "./slider.js"

afterEach(cleanup)

describe("Slider", () => {
  it("renders a slider element", () => {
    render(<Slider aria-label="Volume" />)
    expect(screen.getByRole("slider", { name: "Volume" })).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Slider aria-label="Volume" />)
    const slider = screen.getByRole("slider", { name: "Volume" })
    expect(slider.className).toContain("pm-slider")
    expect(slider.className).toContain("pm-slider--md")
    expect(slider.className).toContain("pm-slider--horizontal")
  })

  it("applies size class", () => {
    render(<Slider size="lg" aria-label="Volume" />)
    const slider = screen.getByRole("slider", { name: "Volume" })
    expect(slider.className).toContain("pm-slider--lg")
  })

  it("applies orientation class", () => {
    render(<Slider orientation="vertical" aria-label="Volume" />)
    const slider = screen.getByRole("slider", { name: "Volume" })
    expect(slider.className).toContain("pm-slider--vertical")
    expect(slider).toHaveAttribute("aria-orientation", "vertical")
  })

  it("sets aria-disabled when disabled", () => {
    render(<Slider disabled aria-label="Volume" />)
    const slider = screen.getByRole("slider", { name: "Volume" })
    expect(slider).toHaveAttribute("aria-disabled", "true")
    expect(slider.className).toContain("pm-slider--disabled")
  })

  it("sets aria-valuemin and aria-valuemax", () => {
    render(<Slider min={0} max={200} aria-label="Volume" />)
    const slider = screen.getByRole("slider", { name: "Volume" })
    expect(slider).toHaveAttribute("aria-valuemin", "0")
    expect(slider).toHaveAttribute("aria-valuemax", "200")
  })

  it("applies show-marks modifier", () => {
    render(<Slider showMarks aria-label="Volume" />)
    const slider = screen.getByRole("slider", { name: "Volume" })
    expect(slider.className).toContain("pm-slider--show-marks")
  })

  it("forwards ref", () => {
    let sliderRef: HTMLDivElement | null = null
    render(<Slider ref={(el) => (sliderRef = el)} aria-label="Volume" />)
    expect(sliderRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<Slider className="custom-class" aria-label="Volume" />)
    const slider = screen.getByRole("slider", { name: "Volume" })
    expect(slider.className).toContain("pm-slider")
    expect(slider.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Slider data-testid="my-slider" aria-label="Volume" />)
    expect(screen.getByTestId("my-slider")).toBeInTheDocument()
  })

  it("is keyboard focusable when not disabled", () => {
    render(<Slider aria-label="Volume" />)
    const slider = screen.getByRole("slider", { name: "Volume" })
    expect(slider).toHaveAttribute("tabindex", "0")
  })

  it("is not keyboard focusable when disabled", () => {
    render(<Slider disabled aria-label="Volume" />)
    const slider = screen.getByRole("slider", { name: "Volume" })
    expect(slider).not.toHaveAttribute("tabindex")
  })
})
