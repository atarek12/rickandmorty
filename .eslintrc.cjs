module.exports = {
  parser: "@typescript-eslint/parser",
  env: { browser: true, es6: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:import/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  parserOptions: {
    project: "./tsconfig.json",
    ecmaFeatures: { jsx: true },
    ecmaVersion: 18,
    sourceType: "module",
  },
  globals: { window: true, React: true },
  plugins: ["react", "react-hooks", "@typescript-eslint", "prettier"],
  settings: {
    react: { version: "detect" },
    "import/resolver": {
      node: {
        paths: ["src"],
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "prettier/prettier": ["warn", { endOfLine: "auto" }],
    "import/no-cycle": "error",
    "no-console": "warn",
  },
};
