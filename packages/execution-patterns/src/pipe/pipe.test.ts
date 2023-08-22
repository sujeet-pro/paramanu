import { expect, test } from "@jest/globals"
import { Pipe } from "./pipe"

test("check initialization", () => {
  const val = new Pipe(1).value
  expect(val).toBe(1)
})
