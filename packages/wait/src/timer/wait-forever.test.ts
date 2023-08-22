import {test, expect} from '@jest/globals'
import {waitForever} from './wait-forever'
import { wait } from '..'

function testHelper(waitFor: number) {
  return Promise.race([
    (async () => {
      await wait(waitFor)
      return false
    })(),
    (async () => {
      await waitForever()
      return true
    })()
  ])
}

test('wait forever: not resolved immediately', async () => {
  const isResolved = await testHelper(0)
  expect(isResolved).toBe(false)
})

test('wait forever: not resolved after 1 sec', async () => {
  const isResolved = await testHelper(1000)
  expect(isResolved).toBe(false)
})

test('wait forever: not resolved after 10 sec', async () => {
  const isResolved = await testHelper(10000)
  expect(isResolved).toBe(false)
}, 11000)