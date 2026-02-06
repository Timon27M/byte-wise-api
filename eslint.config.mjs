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
  {
    // Используем плагин Prettier без пресета
    plugins: {
      prettier: eslintPluginPrettierRecommended.plugins.prettier,
    },
    rules: {
      ...eslintPluginPrettierRecommended.rules,
      // Переопределяем правила кавычек
      quotes: "off",
      "@typescript-eslint/quotes": "off",
    },
  },
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
      // Убедитесь, что правила ESLint для кавычек отключены
      quotes: "off",
      "@typescript-eslint/quotes": "off",
    },
  },
);
