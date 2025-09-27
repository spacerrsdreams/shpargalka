// eslint.config.js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@tanstack/query/recommended",
    "prettier",
    "plugin:import/recommended",
  ),

  {
    ignores: ["src/components/ui/**/*", "src/generated/**/*", "src/to-implement/**/*", "**/deprecated/**/*", ".next"],
  },

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: ["./tsconfig.json"],
        },
      },
    },
    rules: {
      // --- TypeScript Enhancements ---
      "@typescript-eslint/prefer-nullish-coalescing": "error",
      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/no-inferrable-types": "error",
      "@typescript-eslint/no-unused-vars": ["warn", { args: "none", varsIgnorePattern: "^_" }],
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports" }],
      "@typescript-eslint/switch-exhaustiveness-check": "error",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-expect-error": "allow-with-description",
          "ts-ignore": "allow-with-description",
          "ts-nocheck": false,
          "ts-check": false,
        },
      ],

      // --- React Improvements ---
      "react/function-component-definition": [
        "error",
        {
          namedComponents: "arrow-function",
          unnamedComponents: "arrow-function",
        },
      ],
      "react/no-unescaped-entities": "off",
      "react-hooks/exhaustive-deps": "error",
      "react/jsx-boolean-value": ["error", "never"],
      "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
      "react/self-closing-comp": "error",
      "react/no-array-index-key": "warn",

      // --- Next.js Specific Rules ---
      "@next/next/no-html-link-for-pages": "error",
      "@next/next/no-img-element": "error",
      "@next/next/no-sync-scripts": "error",
      "@next/next/no-before-interactive-script-outside-document": "error",
      "@next/next/no-css-tags": "error",
      "@next/next/no-head-element": "error",
      "@next/next/no-duplicate-head": "error",

      // --- Performance / Code Quality ---
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always"],
      "no-unused-vars": ["error", { args: "none", varsIgnorePattern: "^_" }],
      "object-shorthand": ["error", "always"],
      "prefer-template": "error",
      "no-useless-concat": "error",
      "no-template-curly-in-string": "error",
      "array-callback-return": "error",
      "no-await-in-loop": "warn",
      "no-promise-executor-return": "error",
      "require-atomic-updates": "error",
      complexity: ["error", 15],
      "max-depth": ["error", 3],
      "prefer-arrow-callback": "error",
      "no-else-return": ["error", { allowElseIf: false }],
      "max-lines": ["warn", { max: 300, skipBlankLines: true, skipComments: true }],
      "max-nested-callbacks": ["warn", 4],
      "no-warning-comments": ["warn", { terms: ["todo", "fixme"], location: "start" }],
      "no-nested-ternary": "error",
      "no-constructor-return": "error",
      "no-unreachable-loop": "error",
      "prefer-regex-literals": "error",
      "no-eval": "error",
      "no-implied-eval": "error",
      "no-new-func": "error",
      "no-script-url": "error",
      radix: "error",
      "@typescript-eslint/no-restricted-types": [
        "error",
        {
          types: {
            "React.FC": {
              message: "Avoid using React.FC — type props inline instead: (props: Props)",
            },
            "React.FunctionComponent": {
              message: "Avoid using React.FunctionComponent — type props inline instead",
            },
          },
        },
      ],
      "no-restricted-imports": [
        "error",
        {
          patterns: ["./*", "../*"],
        },
      ],

      // --- Additionals / Formatting / Safety ---
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "import/no-default-export": "error",
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: ["const", "let", "var"], next: "*" },
        {
          blankLine: "any",
          prev: ["const", "let", "var"],
          next: ["const", "let", "var"],
        },
        { blankLine: "always", prev: "*", next: "return" },
        { blankLine: "always", prev: "*", next: "function" },
        { blankLine: "always", prev: "function", next: "*" },
      ],
    },
  },

  {
    files: ["src/app/**/page.tsx", "src/app/**/layout.tsx", "src/middleware.ts"],
    rules: {
      "import/no-default-export": "off",
      "react/function-component-definition": "off",
    },
  },

  {
    files: ["*.ts"],
    rules: {
      "max-lines-per-function": ["warn", { max: 100, skipBlankLines: true, skipComments: true }],
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },

  {
    files: ["*.tsx"],
    rules: {
      "max-lines-per-function": ["warn", { max: 300, skipBlankLines: true, skipComments: true }],
    },
  },
];
