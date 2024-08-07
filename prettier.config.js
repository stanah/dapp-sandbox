module.exports = {
  plugins: ["prettier-plugin-solidity"],
  printWidth: 150,
  tabWidth: 2,
  useTabs: false,
  singleQuote: false,
  overrides: [
    {
      files: "*.sol",
      options: {
        parser: "solidity-parse",
      },
    },
  ],
};
