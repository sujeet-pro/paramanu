import typescript from "@rollup/plugin-typescript"

/** @type import('rollup').RollupOptions */
const buildEsm = {
  input: "src/index.ts",
  output: {
    preserveModules: true,
    dir: "dist",
    format: "esm",
  },
  plugins: [typescript({
    exclude: ['src/**/*.test.ts']
  })],
}

export default [buildEsm]
