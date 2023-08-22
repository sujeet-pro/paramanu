---
to: packages/<%= h.changeCase.paramCase(name) %>/jest.config.cjs
---
/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
};