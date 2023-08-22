import { expect, test } from "@jest/globals"
import { deepFreeze } from "./deep-freeze"

test("Level 1 freeze", () => {
  const a = {
    name: "test a",
  }
  const frozen = deepFreeze(a)
  expect(Object.isFrozen(frozen)).toBe(true)
})

test("deepFreeze: level 2", () => {
  const testObj = {
    l1: {
      l2: "",
    },
  }

  const frozen = deepFreeze(testObj)
  expect(Object.isFrozen(frozen)).toBe(true)
  expect(Object.isFrozen(frozen.l1)).toBe(true)
})
