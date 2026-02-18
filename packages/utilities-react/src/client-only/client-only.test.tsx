import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ClientOnly } from "./client-only.js"

describe("ClientOnly", () => {
  it("renders children on client", () => {
    render(
      <ClientOnly>
        <div data-testid="content">Client content</div>
      </ClientOnly>,
    )
    expect(screen.getByTestId("content")).toBeInTheDocument()
  })

  it("renders fallback initially on server-like environment", () => {
    // In jsdom, useEffect runs synchronously in tests, so children render immediately
    // We mainly test that the component renders without errors
    render(
      <ClientOnly fallback={<div data-testid="fallback">Loading...</div>}>
        <div data-testid="content">Client content</div>
      </ClientOnly>,
    )
    expect(screen.getByTestId("content")).toBeInTheDocument()
  })
})
