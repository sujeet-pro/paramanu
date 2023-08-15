---
to: packages/<%= h.changeCase.paramCase(name) %>/tsconfig.json
---
{
  "extends": "../../tsconfig.base.json",
  "compilerOptions": {
    "declaration": true,
    "outDir": "dist"
  },
  "include": ["src/**/*.ts"]
}