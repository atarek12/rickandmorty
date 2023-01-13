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
    // "@typescript-eslint/no-explicit-any": "off",
    // "@typescript-eslint/no-non-null-assertion": "off",
    // "@typescript-eslint/ban-ts-comment": "off",
    // "react/prop-types": "off",
    // "react/react-in-jsx-scope": "off",
    // "import/no-cycle": "error",
    // "import/named": "off",
    // "no-console": "warn",
    // "@typescript-eslint/no-empty-interface": "off",
    // "no-empty-pattern": "off",
    // "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
  },
};
