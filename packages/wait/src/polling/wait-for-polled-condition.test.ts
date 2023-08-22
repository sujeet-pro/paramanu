import {test, expect} from '@jest/globals'
import {waitForPolledCondition, conditionFunction, waitForConditionOptions} from './wait-for-polled-condition'

async function testTimeoutError(condition: conditionFunction, options: waitForConditionOptions = { pollInterval: 100, timeout: 500 }) {
  expect.assertions(2)
  try {
    await waitForPolledCondition(condition, options)
  } catch (error) {
    expect(error).toBeInstanceOf(Error)
    if(error instanceof Error) {
    expect(error.message).toBe('Timeout')
    }
  }
}

async function testSuccess(condition: conditionFunction, options: waitForConditionOptions = { pollInterval: 100, timeout: 500 }) {
  const res = await waitForPolledCondition(condition, options)
  expect(res).toBe(true)
}

function conditionfactory(success_val: true | Promise<true>, error_val: false | Promise<false> | null, success_after: number = 0) {
  let attempt = 0
  return function condition() {
    if(attempt >= success_after) {
      return success_val
    }
    attempt += 1
    if(error_val === null) {
      throw new Error('Failed')
    }
    return error_val
  }
}


describe('waitForPolledCondition', () => {
  describe('Condition is always successful', () => {
    test('with Promise<true>', async () => {
      await testSuccess( () => Promise.resolve(true))
    })
    test('with true', async () => {
      await testSuccess( () => true)
    })
    
  })
  describe('Condition always fails', () => {
    test('with Promise<false>', async () => {
      await testTimeoutError(() => Promise.resolve(false))
    })
    test('with false', async () => {
      await testTimeoutError( () => false)
    })
    test('with error', async () => {
      await testTimeoutError(() => {
        throw new Error('Failed')
      })
    })    
  })


  describe('Condition is successful within timeout', () => {
    test('with Promise<true>, initially returned Promise<false>', async () => {
      await testSuccess(conditionfactory(Promise.resolve(true), Promise.reject(false), 2))
    })
    test('with Promise<true>, initially returned error', async () => {
      await testSuccess(conditionfactory(Promise.resolve(true), null, 2))
    })
    test('with true, initially returned false', async () => {
      await testSuccess(conditionfactory(true, false, 2))
    })
    test('with true, initially returned error', async () => {
      await testSuccess(conditionfactory(true, null, 2))
    })
  })

  describe('Condition is not successful after timeout', () => {
    test('with Promise<true>, initially returned Promise<false>', async () => {
      await testTimeoutError(conditionfactory(Promise.resolve(true), Promise.reject(false), 10))
    })
    test('with Promise<true>, initially returned error', async () => {
      await testTimeoutError(conditionfactory(Promise.resolve(true), null, 10))
    })
    test('with true, initially returned false', async () => {
      await testTimeoutError(conditionfactory(true, false, 10))
    })
    test('with true, initially returned error', async () => {
      await testTimeoutError(conditionfactory(true, null, 10))
    })
  })
})