module.exports = {
  extends: "standard",
  printWidth: 120,
  proseWrap: "never",
  trailingComma: "es5",
  tabWidth: 2,
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  bracketSpacing: true,
  arrowParens: "always",
  bracketSameLine: true,
  overrides: [
    {
      files: [".js", ".jsx"],
      options: {
        parser: "babel",
      },
    },
    {
      files: [".ts", ".tsx"],
      options: {
        parser: "typescript",
      },
    },
    {
      files: [".json", ".rc", ".yaml", ".yml"],
      options: {
        tabWidth: 2,
      },
    },
  ],
};
