import { describe, it, expect, beforeEach } from "vitest"
import { render, screen, act } from "@testing-library/react"
import { LocaleProvider, useLocale } from "./locale-provider.js"

function LocaleConsumer() {
  const { locale, setLocale } = useLocale()
  return (
    <div>
      <span data-testid="locale">{locale}</span>
      <button data-testid="set-fr" onClick={() => setLocale("fr")}>
        French
      </button>
    </div>
  )
}

describe("LocaleProvider", () => {
  beforeEach(() => {
    document.documentElement.setAttribute("lang", "en")
  })

  it("provides default locale from document", () => {
    render(
      <LocaleProvider>
        <LocaleConsumer />
      </LocaleProvider>,
    )
    expect(screen.getByTestId("locale")).toHaveTextContent("en")
  })

  it("uses defaultLocale prop", () => {
    render(
      <LocaleProvider defaultLocale="ja">
        <LocaleConsumer />
      </LocaleProvider>,
    )
    expect(screen.getByTestId("locale")).toHaveTextContent("ja")
  })

  it("updates locale on setLocale", () => {
    render(
      <LocaleProvider>
        <LocaleConsumer />
      </LocaleProvider>,
    )
    act(() => {
      screen.getByTestId("set-fr").click()
    })
    expect(screen.getByTestId("locale")).toHaveTextContent("fr")
    expect(document.documentElement).toHaveAttribute("lang", "fr")
  })
})
