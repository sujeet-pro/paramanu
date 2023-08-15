---
to: packages/<%= h.changeCase.paramCase(name) %>/src/index.ts
---

export function test() {
  console.log('Hello world! from "<%= name %>"')
}