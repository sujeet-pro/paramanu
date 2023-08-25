import { expect, test, describe } from "@jest/globals"
import { Pipe } from "./pipe"

describe('Pipe: Sync', () => {
  test("check initialization", () => {
    const val = new Pipe(1).value
    expect(val).toBe(1)
  })
})