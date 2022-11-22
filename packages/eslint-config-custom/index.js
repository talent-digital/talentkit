/* eslint-disable @typescript-eslint/no-unsafe-assignment */
module.exports = {
  extends: [
    "turbo",
    "prettier",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: [
      "./tsconfig.eslint.json",
      "../*/tsconfig.json",
      "../../apps/*/tsconfig.json",
    ],
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "@typescript-eslint/member-ordering": "error",
  },
};
