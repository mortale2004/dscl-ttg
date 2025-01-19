/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: ["@dscl-ttg/eslint-config/react.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
