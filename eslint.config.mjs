import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import love from 'eslint-config-love'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ...love,
    files: ['**/*.tsx', '**/*.ts'],
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off",
    }
  },
];

export default eslintConfig;
