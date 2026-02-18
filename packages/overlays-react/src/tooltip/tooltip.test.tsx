import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Tooltip, TooltipArrow } from "./tooltip.js"

afterEach(cleanup)

describe("Tooltip", () => {
  it("renders with children", () => {
    render(<Tooltip>Tooltip text</Tooltip>)
    expect(screen.getByText("Tooltip text")).toBeInTheDocument()
  })

  it("applies default classes", () => {
    render(<Tooltip data-testid="tooltip">Content</Tooltip>)
    const el = screen.getByTestId("tooltip")
    expect(el.className).toContain("pm-tooltip")
    expect(el.className).toContain("pm-tooltip--top")
  })

  it("has role tooltip", () => {
    render(<Tooltip>Content</Tooltip>)
    const el = screen.getByRole("tooltip")
    expect(el).toBeInTheDocument()
  })

  it("applies placement class", () => {
    render(
      <Tooltip placement="bottom" data-testid="tooltip">
        Content
      </Tooltip>,
    )
    const el = screen.getByTestId("tooltip")
    expect(el.className).toContain("pm-tooltip--bottom")
  })

  it("forwards ref", () => {
    let tooltipRef: HTMLDivElement | null = null
    render(<Tooltip ref={(el) => (tooltipRef = el)}>Content</Tooltip>)
    expect(tooltipRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(
      <Tooltip className="custom-class" data-testid="tooltip">
        Content
      </Tooltip>,
    )
    const el = screen.getByTestId("tooltip")
    expect(el.className).toContain("pm-tooltip")
    expect(el.className).toContain("custom-class")
  })

  it("passes through additional HTML attributes", () => {
    render(<Tooltip data-testid="my-tooltip">Content</Tooltip>)
    expect(screen.getByTestId("my-tooltip")).toBeInTheDocument()
  })
})

describe("TooltipArrow", () => {
  it("renders with default classes", () => {
    render(<TooltipArrow data-testid="arrow" />)
    const el = screen.getByTestId("arrow")
    expect(el.className).toContain("pm-tooltip__arrow")
  })

  it("forwards ref", () => {
    let arrowRef: HTMLDivElement | null = null
    render(<TooltipArrow ref={(el) => (arrowRef = el)} />)
    expect(arrowRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className", () => {
    render(<TooltipArrow className="custom-arrow" data-testid="arrow" />)
    const el = screen.getByTestId("arrow")
    expect(el.className).toContain("pm-tooltip__arrow")
    expect(el.className).toContain("custom-arrow")
  })
})
