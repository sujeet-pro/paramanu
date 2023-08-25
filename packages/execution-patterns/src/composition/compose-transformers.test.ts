import {describe, test} from '@jest/globals'
import {TransformerFunction, composeTransformers, pipeTransformer} from './compose-transformers'

const add2: TransformerFunction<number> = n => n + 2
const multipy3:  TransformerFunction<number> = n => n *3

describe('Compose Transformers', () => {
  const compose = composeTransformers(add2, multipy3)
  test('compose +2 x3', () => {
    expect(compose(0)).toBe(2) 
    expect(compose(1)).toBe(5)
  })
})

describe('Pipe Transformers', () => {
  const piped = pipeTransformer(add2, multipy3)
  test('pipe +2 x3', () => {
    expect(piped(0)).toBe(6) 
    expect(piped(1)).toBe(9)
  })
})
