module.exports = {
  parser: "@typescript-eslint/parser",
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  env: {
    browser: true,
    es2021: true,
  },
  rules: {
    "no-duplicate-imports": ["error", { "includeExports": true }],
    "no-unused-vars": "error",
    "no-undef": "error",
    "no-extra-semi": "error"
  }
}
