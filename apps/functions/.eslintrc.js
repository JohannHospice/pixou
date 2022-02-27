export default {
  root: true,
  env: {
    es6: true,
    node: true,
    jest: true,
    "jest/globals": true,
  },
  files: ["*.ts", "*.tsx", "*.js"],
  // "extends": [
  //   "eslint:recommended",
  //   "plugin:import/errors",
  //   "plugin:import/warnings",
  //   "plugin:import/typescript",
  //   "google",
  //   "plugin:@typescript-eslint/recommended"
  // ],
  extends: [
    "prettier",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    sourceType: "module",
    tsconfigRootDir: __dirname,
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
  ],
  plugins: ["@typescript-eslint", "import", "jest"],
  rules: {
    quotes: ["error", "double"],
    "import/no-unresolved": 0,
    "no-unused-vars": "warn",
    "prettier/prettier": "warn",
  },
};
