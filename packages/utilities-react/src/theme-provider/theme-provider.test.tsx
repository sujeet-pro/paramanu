import { describe, it, expect, vi, beforeEach } from "vitest"
import { render, screen, act } from "@testing-library/react"
import { Theme, useTheme } from "./theme-provider.js"

function ThemeConsumer() {
  const { mode, setMode, clearMode } = useTheme()
  return (
    <div>
      <span data-testid="mode">{mode}</span>
      <button data-testid="set-dark" onClick={() => setMode("dark")}>
        Dark
      </button>
      <button data-testid="clear" onClick={() => clearMode()}>
        Clear
      </button>
    </div>
  )
}

describe("Theme", () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.removeAttribute("data-pm-theme")
    document.documentElement.style.removeProperty("color-scheme")
  })

  it("provides default system mode", () => {
    render(
      <Theme>
        <ThemeConsumer />
      </Theme>,
    )
    expect(screen.getByTestId("mode")).toHaveTextContent("system")
  })

  it("reads stored theme from localStorage", () => {
    localStorage.setItem("pm-theme", "dark")
    render(
      <Theme>
        <ThemeConsumer />
      </Theme>,
    )
    expect(screen.getByTestId("mode")).toHaveTextContent("dark")
  })

  it("updates theme on setMode", () => {
    render(
      <Theme>
        <ThemeConsumer />
      </Theme>,
    )
    act(() => {
      screen.getByTestId("set-dark").click()
    })
    expect(screen.getByTestId("mode")).toHaveTextContent("dark")
    expect(document.documentElement).toHaveAttribute("data-pm-theme", "dark")
  })

  it("clears theme on clearMode", () => {
    render(
      <Theme>
        <ThemeConsumer />
      </Theme>,
    )
    act(() => {
      screen.getByTestId("set-dark").click()
    })
    act(() => {
      screen.getByTestId("clear").click()
    })
    expect(screen.getByTestId("mode")).toHaveTextContent("system")
  })

  it("uses custom storageKey", () => {
    render(
      <Theme storageKey="custom-key" defaultMode="light">
        <ThemeConsumer />
      </Theme>,
    )
    expect(screen.getByTestId("mode")).toHaveTextContent("light")
    expect(localStorage.getItem("custom-key")).toBe("light")
  })
})
