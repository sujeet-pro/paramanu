---
to: packages/<%= h.changeCase.paramCase(name) %>/src/index.ts
---

export function testFunction() {
  return 'Hello world! from "<%= name %>"'
}