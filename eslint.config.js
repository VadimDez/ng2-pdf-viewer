// @ts-check
const eslint = require("@eslint/js");
const { defineConfig } = require("eslint/config");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = defineConfig([
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      tseslint.configs.recommended,
      tseslint.configs.stylistic,
      angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: ["pdf", "app"],
          style: "kebab-case",
        },
      ],
      // kebab-case input()/output() aliases are part of the public API.
      "@angular-eslint/no-input-rename": "off",
      "@angular-eslint/no-output-rename": "off",
      // (error) and (on-progress) outputs are documented public API names.
      "@angular-eslint/no-output-native": "off",
      "@angular-eslint/no-output-on-prefix": "off",
      // Carry forward prior tslint:recommended strictness; tightening
      // these is out of scope for the Angular 21 upgrade.
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-require-imports": "off",
      "no-prototype-builtins": "off",
      "no-useless-assignment": "off",
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      angular.configs.templateRecommended,
      angular.configs.templateAccessibility,
    ],
    rules: {
      // Demo template a11y warnings out of scope for the Angular 21 upgrade.
      "@angular-eslint/template/click-events-have-key-events": "off",
      "@angular-eslint/template/interactive-supports-focus": "off",
    },
  }
]);
