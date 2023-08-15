---
to: packages/<%= h.changeCase.paramCase(name) %>/rollup.config.js
---
import typescript from '@rollup/plugin-typescript'

/** @type import('rollup').RollupOptions */
const buildEsm = {
  input: 'src/index.ts',
  output: {
    preserveModules: true,
    dir: 'dist',
    format: 'esm'
  },
  plugins: [typescript()]
}

export default [
  buildEsm
]