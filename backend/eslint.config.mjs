import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { files: ["**/*.js"], languageOptions: { sourceType: "commonjs" } },
  { languageOptions: { globals: globals.node } },
  {
    rules: {
      "no-console": "warn",
      "no-undef": "error",
      eqeqeq: "warn",
      "no-invalid-this": "error",
      "no-return-assign": "error",
      "no-unused-expressions": ["error", { allowTernary: true }],
      "no-useless-concat": "error",
      "no-constant-condition": "warn",
      "no-unused-vars": ["warn", { argsIgnorePattern: "req|res|next|__" }],
    },
  },
  pluginJs.configs.recommended,
];
