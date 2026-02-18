import { describe, it, expect, afterEach } from "vitest"
import { render, screen, cleanup } from "@testing-library/react"
import { Splitter, SplitterPanel, SplitterHandle } from "./splitter.js"

afterEach(cleanup)

describe("Splitter", () => {
  it("renders compound component with all sub-components", () => {
    render(
      <Splitter data-testid="splitter">
        <SplitterPanel data-testid="panel-1">Panel 1</SplitterPanel>
        <SplitterHandle data-testid="handle" />
        <SplitterPanel data-testid="panel-2">Panel 2</SplitterPanel>
      </Splitter>,
    )
    expect(screen.getByTestId("splitter")).toBeInTheDocument()
    expect(screen.getByTestId("panel-1")).toBeInTheDocument()
    expect(screen.getByTestId("handle")).toBeInTheDocument()
    expect(screen.getByTestId("panel-2")).toBeInTheDocument()
  })

  it("applies default horizontal orientation classes", () => {
    render(
      <Splitter data-testid="splitter">
        <SplitterPanel>A</SplitterPanel>
        <SplitterHandle />
        <SplitterPanel>B</SplitterPanel>
      </Splitter>,
    )
    const splitter = screen.getByTestId("splitter")
    expect(splitter.className).toContain("pm-splitter")
    expect(splitter.className).toContain("pm-splitter--horizontal")
  })

  it("applies vertical orientation classes", () => {
    render(
      <Splitter orientation="vertical" data-testid="splitter">
        <SplitterPanel>A</SplitterPanel>
        <SplitterHandle data-testid="handle" />
        <SplitterPanel>B</SplitterPanel>
      </Splitter>,
    )
    const splitter = screen.getByTestId("splitter")
    expect(splitter.className).toContain("pm-splitter--vertical")

    const handle = screen.getByTestId("handle")
    expect(handle.className).toContain("pm-splitter__handle--vertical")
  })

  it("applies disabled class", () => {
    render(
      <Splitter disabled data-testid="splitter">
        <SplitterPanel>A</SplitterPanel>
        <SplitterHandle />
        <SplitterPanel>B</SplitterPanel>
      </Splitter>,
    )
    expect(screen.getByTestId("splitter").className).toContain("pm-splitter--disabled")
  })

  it("renders panel with collapsed class", () => {
    render(
      <Splitter>
        <SplitterPanel collapsed data-testid="panel">
          A
        </SplitterPanel>
        <SplitterHandle />
        <SplitterPanel>B</SplitterPanel>
      </Splitter>,
    )
    expect(screen.getByTestId("panel").className).toContain("pm-splitter__panel--collapsed")
  })

  it("renders panel with collapsible class", () => {
    render(
      <Splitter>
        <SplitterPanel collapsible data-testid="panel">
          A
        </SplitterPanel>
        <SplitterHandle />
        <SplitterPanel>B</SplitterPanel>
      </Splitter>,
    )
    expect(screen.getByTestId("panel").className).toContain("pm-splitter__panel--collapsible")
  })

  it("sets initial width from defaultSize on horizontal panel", () => {
    render(
      <Splitter>
        <SplitterPanel defaultSize={30} data-testid="panel">
          A
        </SplitterPanel>
        <SplitterHandle />
        <SplitterPanel defaultSize={70}>B</SplitterPanel>
      </Splitter>,
    )
    const panel = screen.getByTestId("panel")
    expect(panel.style.width).toBe("30%")
  })

  it("sets initial height from defaultSize on vertical panel", () => {
    render(
      <Splitter orientation="vertical">
        <SplitterPanel defaultSize={40} data-testid="panel">
          A
        </SplitterPanel>
        <SplitterHandle />
        <SplitterPanel defaultSize={60}>B</SplitterPanel>
      </Splitter>,
    )
    const panel = screen.getByTestId("panel")
    expect(panel.style.height).toBe("40%")
  })

  it("handle has role=separator", () => {
    render(
      <Splitter>
        <SplitterPanel>A</SplitterPanel>
        <SplitterHandle data-testid="handle" />
        <SplitterPanel>B</SplitterPanel>
      </Splitter>,
    )
    expect(screen.getByTestId("handle")).toHaveAttribute("role", "separator")
  })

  it("handle has tabindex=0", () => {
    render(
      <Splitter>
        <SplitterPanel>A</SplitterPanel>
        <SplitterHandle data-testid="handle" />
        <SplitterPanel>B</SplitterPanel>
      </Splitter>,
    )
    expect(screen.getByTestId("handle")).toHaveAttribute("tabindex", "0")
  })

  it("handle has aria-valuenow, aria-valuemin, aria-valuemax", () => {
    render(
      <Splitter>
        <SplitterPanel>A</SplitterPanel>
        <SplitterHandle data-testid="handle" />
        <SplitterPanel>B</SplitterPanel>
      </Splitter>,
    )
    const handle = screen.getByTestId("handle")
    expect(handle).toHaveAttribute("aria-valuenow", "50")
    expect(handle).toHaveAttribute("aria-valuemin", "0")
    expect(handle).toHaveAttribute("aria-valuemax", "100")
  })

  it("handle has aria-orientation matching container orientation", () => {
    render(
      <Splitter orientation="vertical">
        <SplitterPanel>A</SplitterPanel>
        <SplitterHandle data-testid="handle" />
        <SplitterPanel>B</SplitterPanel>
      </Splitter>,
    )
    expect(screen.getByTestId("handle")).toHaveAttribute("aria-orientation", "vertical")
  })

  it("forwards ref on Splitter container", () => {
    let splitterRef: HTMLDivElement | null = null
    render(
      <Splitter ref={(el) => (splitterRef = el)}>
        <SplitterPanel>A</SplitterPanel>
        <SplitterHandle />
        <SplitterPanel>B</SplitterPanel>
      </Splitter>,
    )
    expect(splitterRef).toBeInstanceOf(HTMLDivElement)
  })

  it("forwards ref on SplitterPanel", () => {
    let panelRef: HTMLDivElement | null = null
    render(
      <Splitter>
        <SplitterPanel ref={(el) => (panelRef = el)}>A</SplitterPanel>
        <SplitterHandle />
        <SplitterPanel>B</SplitterPanel>
      </Splitter>,
    )
    expect(panelRef).toBeInstanceOf(HTMLDivElement)
  })

  it("forwards ref on SplitterHandle", () => {
    let handleRef: HTMLDivElement | null = null
    render(
      <Splitter>
        <SplitterPanel>A</SplitterPanel>
        <SplitterHandle ref={(el) => (handleRef = el)} />
        <SplitterPanel>B</SplitterPanel>
      </Splitter>,
    )
    expect(handleRef).toBeInstanceOf(HTMLDivElement)
  })

  it("merges custom className on Splitter", () => {
    render(
      <Splitter className="custom-splitter" data-testid="splitter">
        <SplitterPanel>A</SplitterPanel>
        <SplitterHandle />
        <SplitterPanel>B</SplitterPanel>
      </Splitter>,
    )
    const el = screen.getByTestId("splitter")
    expect(el.className).toContain("pm-splitter")
    expect(el.className).toContain("custom-splitter")
  })

  it("merges custom className on SplitterPanel", () => {
    render(
      <Splitter>
        <SplitterPanel className="custom-panel" data-testid="panel">
          A
        </SplitterPanel>
        <SplitterHandle />
        <SplitterPanel>B</SplitterPanel>
      </Splitter>,
    )
    const el = screen.getByTestId("panel")
    expect(el.className).toContain("pm-splitter__panel")
    expect(el.className).toContain("custom-panel")
  })

  it("merges custom className on SplitterHandle", () => {
    render(
      <Splitter>
        <SplitterPanel>A</SplitterPanel>
        <SplitterHandle className="custom-handle" data-testid="handle" />
        <SplitterPanel>B</SplitterPanel>
      </Splitter>,
    )
    const el = screen.getByTestId("handle")
    expect(el.className).toContain("pm-splitter__handle")
    expect(el.className).toContain("custom-handle")
  })

  it("passes through additional HTML attributes", () => {
    render(
      <Splitter data-testid="my-splitter">
        <SplitterPanel>A</SplitterPanel>
        <SplitterHandle />
        <SplitterPanel>B</SplitterPanel>
      </Splitter>,
    )
    expect(screen.getByTestId("my-splitter")).toBeInTheDocument()
  })
})
