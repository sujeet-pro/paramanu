import { expect, test, describe, jest } from "@jest/globals"
import {AsyncPipe} from './async-pipe'
import { AsyncPipeCallback } from "./pipe.types"

describe('Pipe: Async', () => {
  test('Initialization', async () => {
    const p = new AsyncPipe(Promise.resolve(1))
    expect(p.value).resolves
    const val = await p.value
    expect(val).toBe(1)
  })

  test('tap: Immediately resolved', async () => {
    const ap = new AsyncPipe(Promise.resolve(1))
    const tapCallback = jest.fn()
    ap.tap(tapCallback)
    await ap.value // Need to wait for stuff to be resolved
    expect(tapCallback).toHaveBeenCalled()
    expect(tapCallback).toHaveBeenCalledTimes(1)
    expect(tapCallback).toHaveBeenCalledWith(1)
  })

  test('tap: resolved after a min', async () => {
    const ap = new AsyncPipe(new Promise(resolve => {
      setTimeout(()=> {
        resolve(1)
      }, 1000)
    }))
    const tapCallback = jest.fn()
    ap.tap(tapCallback)
    await ap.value // Need to wait for stuff to be resolved
    expect(tapCallback).toHaveBeenCalled()
    expect(tapCallback).toHaveBeenCalledTimes(1)
    expect(tapCallback).toHaveBeenCalledWith(1)
  })

  test('pipe: resolved after a min', async () => {
    const ap = new AsyncPipe(Promise.resolve(1))
    const pipeFun = jest.fn<AsyncPipeCallback<number, number>>().mockReturnValue(new Promise(resolve => {
      setTimeout(() => {
        resolve(2)
      }, 1000)
    }))
    const rp = ap.pipe(pipeFun)
    expect(rp).toBeInstanceOf(AsyncPipe)
    await ap.value
    expect(pipeFun).toHaveBeenCalled()
    expect(pipeFun).toHaveBeenCalledTimes(1)
    expect(pipeFun).toBeCalledWith(1)
    const rv = await rp.value
    expect(rv).toBe(2)
  })
})