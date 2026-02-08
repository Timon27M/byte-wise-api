// @ts-check
import eslint from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: ["eslint.config.mjs"],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      sourceType: "commonjs",
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "warn",
      "@typescript-eslint/no-unsafe-argument": "warn",
      // Конфигурация Prettier с двойными кавычками
      "prettier/prettier": [
        "error",
        {
          singleQuote: false,
          jsxSingleQuote: false,
          endOfLine: "auto",
        },
      ],
      "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^_",
        "caughtErrorsIgnorePattern": "^_"
      }
    ],
      "@typescript-eslint/no-unsafe-assignment": "off",
      // Убедитесь, что правила ESLint для кавычек отключены
      quotes: "off",
      "@typescript-eslint/quotes": "off",
      indent: "off",
      "@typescript-eslint/indent": "off",
    },
  },
);
