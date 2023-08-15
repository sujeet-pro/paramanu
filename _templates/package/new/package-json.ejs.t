---
to: packages/<%= h.changeCase.paramCase(name) %>/package.json
---
{
  "name": "@paramanu/<%= h.changeCase.paramCase(name) %>",
  "version": "1.0.0",
  "description": "Inversion of Control Containers",
  "type": "module",
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/index.d.ts"
    }
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "prebuild": "rimraf dist",
    "build": "rollup -c"
  },
  "author": "Sujeet",
  "license": "MIT",
  "repository": {
    "type": "git",
    "url": "git+https://github.com/sujeet-pro/paramanu.git"
  },
  "bugs": {
    "url": "https://github.com/sujeet-pro/paramanu/issues"
  },
  "homepage": "https://github.com/sujeet-pro/paramanu#readme"
}