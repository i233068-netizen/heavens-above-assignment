import js from "@eslint/js";
import globals from "globals";

export default [
  // Base recommended rules
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.browser,
    },

    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "eqeqeq": "error",
    },
  },
];
