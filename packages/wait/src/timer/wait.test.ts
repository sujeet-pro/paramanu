import { expect, test } from "@jest/globals"
import {wait} from './wait'

async function testHelper(
  input: number,
  resolveMin: number = Math.max(0, input),
  resolveMax: number = Math.max(100, resolveMin * 1.1)
  ) {
  const start = performance.now()
  await wait(input)
  const end = performance.now()
  const diff = end - start
  expect(diff).toBeGreaterThan(resolveMin)
  expect(diff).toBeLessThan(resolveMax)
}

test('wait: for Invalid Number', async () => {
  await testHelper(Number.NaN, 0)
})

test('wait: for Negative Value',async () => {
  await testHelper(-500)
})

test('wait: for Zero',async () => {
  await testHelper(0)
})

test('wait: for Positive Value',async () => {
  await testHelper(1000)
})

test('wait: for large value',async () => {
  await testHelper(10000)
}, 11000)
