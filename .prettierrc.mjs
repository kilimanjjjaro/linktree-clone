/** @type {import("prettier").Config} */
const prettierConfig = {
  plugins: ['prettier-plugin-tailwindcss'],
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  jsxSingleQuote: true,
  trailingComma: 'none',
  endOfLine: 'lf'
}

export default prettierConfig
