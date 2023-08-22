---
to: packages/<%= h.changeCase.paramCase(name) %>/src/index.spec.ts
---
import {expect, test} from '@jest/globals';
import { testFunction } from "./index";

test('check initialization', () => {
  expect(testFunction()).toBe('Hello world! from "<%= name %>"')
})