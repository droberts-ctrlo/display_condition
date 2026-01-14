import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";
import stylistic from "@stylistic/eslint-plugin";

export default defineConfig([
  { plugins: { '@stylistic': stylistic } },
  { files: ["src/**/*.{js,mjs,ts,mts,cts}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  { files: ["src/**/*.test.ts"], languageOptions: { globals: globals.jest } },
  { ignores: ["eslint.config.mjs", "jest.config.cjs", "babel.config.cjs", "dist"] },
  tseslint.configs.recommended,
  stylistic.configs.recommended,
  {
    rules: {
      "@stylistic/semi": ["error", "always"],
      "@stylistic/indent": ["error", 4],
      "@stylistic/comma-dangle": "off",
      "@stylistic/brace-style": ["error", "1tbs", {"allowSingleLine": true}]
    }
  }
]);
