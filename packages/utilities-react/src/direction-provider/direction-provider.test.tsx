import { describe, it, expect, beforeEach } from "vitest"
import { render, screen, act } from "@testing-library/react"
import { DirectionProvider, useDirection } from "./direction-provider.js"

function DirectionConsumer() {
  const { dir, setDir } = useDirection()
  return (
    <div>
      <span data-testid="dir">{dir}</span>
      <button data-testid="set-rtl" onClick={() => setDir("rtl")}>
        RTL
      </button>
    </div>
  )
}

describe("DirectionProvider", () => {
  beforeEach(() => {
    document.documentElement.removeAttribute("dir")
  })

  it("provides default ltr direction", () => {
    render(
      <DirectionProvider>
        <DirectionConsumer />
      </DirectionProvider>,
    )
    expect(screen.getByTestId("dir")).toHaveTextContent("ltr")
  })

  it("uses defaultDir prop", () => {
    render(
      <DirectionProvider defaultDir="rtl">
        <DirectionConsumer />
      </DirectionProvider>,
    )
    expect(screen.getByTestId("dir")).toHaveTextContent("rtl")
  })

  it("updates direction on setDir", () => {
    render(
      <DirectionProvider>
        <DirectionConsumer />
      </DirectionProvider>,
    )
    act(() => {
      screen.getByTestId("set-rtl").click()
    })
    expect(screen.getByTestId("dir")).toHaveTextContent("rtl")
    expect(document.documentElement).toHaveAttribute("dir", "rtl")
  })
})
