/**
 * @see https://prettier.io/docs/configuration
 * @type {import("prettier").Config}
 */
const config = {
  plugins: ["@trivago/prettier-plugin-sort-imports"],
  importOrderParserPlugins: ["decorators-legacy", "classProperties"],
  importOrder: [
    "^react", // React imports
    "^@[a-z]", // Scoped packages
    "^[a-z]", // Unscoped packages
    "^[./]", // Local files
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
};

module.exports = config;
