import { describe, it, expect } from "vitest"
import { isClient } from "./client-only.js"

describe("isClient", () => {
  it("returns a boolean", () => {
    expect(typeof isClient()).toBe("boolean")
  })

  it("returns true when window and document are defined", () => {
    // In vitest with jsdom or happy-dom, both are defined
    // In a plain Node environment, they might not be
    const result = isClient()
    const expected =
      typeof globalThis.window !== "undefined" && typeof globalThis.document !== "undefined"
    expect(result).toBe(expected)
  })
})
