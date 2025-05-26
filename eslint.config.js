import js from "@eslint/js";
import vue from "eslint-plugin-vue";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import vueEslintParser from "vue-eslint-parser";

export default [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json"
      }
    },
    plugins: { '@typescript-eslint': tseslint },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ["error", { "argsIgnorePattern": "^_" }]
    }
  },
  {
    files: ["**/*.vue"],
    languageOptions: {
      parser: vueEslintParser,
      parserOptions: {
        parser: tsParser,
        ecmaVersion: "latest",
        sourceType: "module",
        extraFileExtensions: [".vue"]
      }
    },
    plugins: { vue },
    rules: {
      ...((vue.configs && vue.configs["vue3-recommended"] && vue.configs["vue3-recommended"].rules) || {}),
      'no-unused-vars': ["error", { "argsIgnorePattern": "^_" }]
    }
  },
  {
    languageOptions: {
      globals: {
        window: "readonly",
        document: "readonly",
        navigator: "readonly",
        console: "readonly",
        self: "readonly",
        caches: "readonly",
        fetch: "readonly",
        event: "readonly",
        localStorage: "readonly"
      }
    }
  }
];
