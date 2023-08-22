/** @type {import("prettier").Config} */
const config = {
  endOfLine: "lf",
  proseWrap: "preserve",

  // Spacing
  printWidth: 120,
  tabWidth: 2,
  useTabs: false,
  bracketSpacing: true,

  // Commas
  semi: false,
  trailingComma: "all",

  // Quotes
  singleQuote: false,
  quoteProps: "as-needed",

  // Funcitons
  arrowParens: "avoid",

  // JSX
  jsxSingleQuote: false,
  requirePragma: false,
  insertPragma: false,
}

export default config
