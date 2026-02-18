import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Box } from "./box.js"

afterEach(cleanup)

describe("Box", () => {
  it("renders as div by default", () => {
    render(<Box data-testid="box">Content</Box>)
    const box = screen.getByTestId("box")
    expect(box.tagName).toBe("DIV")
    expect(box).toHaveTextContent("Content")
  })

  it("applies pm-box class", () => {
    render(<Box data-testid="box">Content</Box>)
    const box = screen.getByTestId("box")
    expect(box.className).toContain("pm-box")
  })

  it("renders custom element with as prop", () => {
    render(
      <Box as="section" data-testid="box">
        Content
      </Box>,
    )
    const box = screen.getByTestId("box")
    expect(box.tagName).toBe("SECTION")
  })

  it("forwards ref", () => {
    let boxRef: HTMLDivElement | null = null
    render(<Box ref={(el) => (boxRef = el)}>Ref</Box>)
    expect(boxRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Box className="custom-class" data-testid="box">
        Content
      </Box>,
    )
    const box = screen.getByTestId("box")
    expect(box.className).toContain("pm-box")
    expect(box.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Box data-testid="my-box">Test</Box>)
    expect(screen.getByTestId("my-box")).toBeInTheDocument()
  })
})
