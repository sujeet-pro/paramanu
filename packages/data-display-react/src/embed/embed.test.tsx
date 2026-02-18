import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Embed } from "./embed.js"

afterEach(cleanup)

describe("Embed", () => {
  it("renders an iframe with src and title", () => {
    render(<Embed src="https://example.com" title="Example" data-testid="embed" />)
    const iframe = screen.getByTitle("Example")
    expect(iframe).toBeInTheDocument()
    expect(iframe).toHaveAttribute("src", "https://example.com")
  })

  it("applies default classes", () => {
    render(<Embed src="https://example.com" title="Example" data-testid="embed" />)
    const embed = screen.getByTestId("embed")
    expect(embed.className).toContain("pm-embed")
    expect(embed.className).toContain("pm-embed--ratio-16-9")
  })

  it("applies ratio class", () => {
    render(<Embed src="https://example.com" title="Example" ratio="4/3" data-testid="embed" />)
    expect(screen.getByTestId("embed").className).toContain("pm-embed--ratio-4-3")
  })

  it("applies fullWidth modifier", () => {
    render(<Embed src="https://example.com" title="Example" fullWidth data-testid="embed" />)
    expect(screen.getByTestId("embed").className).toContain("pm-embed--full-width")
  })

  it("forwards ref", () => {
    let embedRef: HTMLDivElement | null = null
    render(
      <Embed ref={(el) => (embedRef = el)} src="https://example.com" title="Example" />,
    )
    expect(embedRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Embed src="https://example.com" title="Example" className="custom" data-testid="embed" />,
    )
    const embed = screen.getByTestId("embed")
    expect(embed.className).toContain("pm-embed")
    expect(embed.className).toContain("custom")
  })

  it("passes through additional HTML attributes", () => {
    render(<Embed src="https://example.com" title="Example" data-testid="my-embed" />)
    expect(screen.getByTestId("my-embed")).toBeInTheDocument()
  })
})
