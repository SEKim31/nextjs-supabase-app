import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";
import importX from "eslint-plugin-import-x";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 전역 무시 패턴
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "coverage/**",
    ],
  },

  // Next.js 기본 설정
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // import 정렬 및 검사
  {
    plugins: {
      "import-x": importX,
    },
    rules: {
      // import 순서 정렬
      "import-x/order": [
        "warn",
        {
          groups: [
            "builtin", // Node.js 내장 모듈
            "external", // npm 패키지
            "internal", // 프로젝트 내부 alias (@/)
            "parent", // 상위 디렉토리
            "sibling", // 같은 디렉토리
            "index", // index 파일
            "type", // 타입 import
          ],
          pathGroups: [
            {
              pattern: "react",
              group: "external",
              position: "before",
            },
            {
              pattern: "next/**",
              group: "external",
              position: "before",
            },
            {
              pattern: "@/**",
              group: "internal",
              position: "before",
            },
          ],
          pathGroupsExcludedImportTypes: ["react", "next"],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      // 중복 import 금지
      "import-x/no-duplicates": "warn",
    },
  },

  // 추가 규칙
  {
    rules: {
      // 미사용 변수 경고 (_ 접두사는 허용)
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      // console.log 경고 (개발 중 실수 방지)
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },

  // Prettier 충돌 방지 (항상 마지막에 위치)
  eslintConfigPrettier,
];

export default eslintConfig;
