import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Bleed } from "./bleed.js"

afterEach(cleanup)

describe("Bleed", () => {
  it("renders with children", () => {
    render(<Bleed data-testid="bleed">Content</Bleed>)
    const el = screen.getByTestId("bleed")
    expect(el).toBeInTheDocument()
    expect(el).toHaveTextContent("Content")
  })

  it("applies base class with no options", () => {
    render(<Bleed data-testid="bleed">Content</Bleed>)
    const el = screen.getByTestId("bleed")
    expect(el.className).toContain("pm-bleed")
  })

  it("applies inline modifier", () => {
    render(
      <Bleed inline="4" data-testid="bleed">
        Content
      </Bleed>,
    )
    const el = screen.getByTestId("bleed")
    expect(el.className).toContain("pm-bleed--inline-4")
  })

  it("applies block modifier", () => {
    render(
      <Bleed block="6" data-testid="bleed">
        Content
      </Bleed>,
    )
    const el = screen.getByTestId("bleed")
    expect(el.className).toContain("pm-bleed--block-6")
  })

  it("applies inlineStart modifier", () => {
    render(
      <Bleed inlineStart="2" data-testid="bleed">
        Content
      </Bleed>,
    )
    const el = screen.getByTestId("bleed")
    expect(el.className).toContain("pm-bleed--inline-start-2")
  })

  it("applies inlineEnd modifier", () => {
    render(
      <Bleed inlineEnd="3" data-testid="bleed">
        Content
      </Bleed>,
    )
    const el = screen.getByTestId("bleed")
    expect(el.className).toContain("pm-bleed--inline-end-3")
  })

  it("applies blockStart modifier", () => {
    render(
      <Bleed blockStart="5" data-testid="bleed">
        Content
      </Bleed>,
    )
    const el = screen.getByTestId("bleed")
    expect(el.className).toContain("pm-bleed--block-start-5")
  })

  it("applies blockEnd modifier", () => {
    render(
      <Bleed blockEnd="8" data-testid="bleed">
        Content
      </Bleed>,
    )
    const el = screen.getByTestId("bleed")
    expect(el.className).toContain("pm-bleed--block-end-8")
  })

  it("forwards ref", () => {
    let elRef: HTMLDivElement | null = null
    render(<Bleed ref={(el) => (elRef = el)}>Content</Bleed>)
    expect(elRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Bleed className="custom-class" data-testid="bleed">
        Content
      </Bleed>,
    )
    const el = screen.getByTestId("bleed")
    expect(el.className).toContain("pm-bleed")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Bleed data-testid="my-bleed">Content</Bleed>)
    expect(screen.getByTestId("my-bleed")).toBeInTheDocument()
  })
})
