# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 주요 기술 스택

- **프레임워크**: Next.js (최신 버전, App Router)
- **인증/데이터베이스**: Supabase (@supabase/ssr, @supabase/supabase-js)
- **스타일링**: Tailwind CSS
- **UI 컴포넌트**: shadcn/ui (new-york 스타일, Radix UI 기반)
- **테마**: next-themes (다크 모드 지원)
- **아이콘**: Lucide React
- **타입스크립트**: 엄격 모드 활성화

## 개발 명령어

```bash
# 개발 서버 실행 (Turbopack 사용)
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start

# 코드 검사 및 포맷팅
npm run lint           # ESLint 검사
npm run lint:fix       # ESLint 자동 수정
npm run format         # Prettier 포맷팅
npm run format:check   # Prettier 검사만
npm run typecheck      # TypeScript 타입 체크
npm run check-all      # 모든 검사 통합 실행 (권장)
```

## ⚡ 자주 사용하는 명령어

```bash
# 개발
npm run dev         # 개발 서버 실행 (Turbopack)
npm run build       # 프로덕션 빌드
npm run check-all   # 모든 검사 통합 실행 (권장)

# UI 컴포넌트
npx shadcn@latest add button    # 새 컴포넌트 추가
```

## ✅ 작업 완료 체크리스트

```bash
npm run check-all   # 모든 검사 통과 확인
npm run build       # 빌드 성공 확인
```

## 아키텍처 개요

Next.js 15 App Router + Supabase Auth 기반의 풀스택 스타터킷입니다.

### Supabase 클라이언트 패턴

세 가지 Supabase 클라이언트 유틸리티가 존재하며, 사용 위치에 따라 구분합니다:

- `lib/supabase/server.ts` - Server Components/Server Actions에서 사용
- `lib/supabase/client.ts` - Client Components에서 사용 (브라우저)
- `lib/supabase/proxy.ts` - Proxy에서 세션 갱신용 (proxy.ts에서 호출)

**중요**: Fluid compute 환경에서는 클라이언트를 전역 변수에 저장하지 말고, 매 요청마다 새로 생성해야 합니다.

### 인증 흐름

- `proxy.ts` - 모든 요청에서 세션을 검증하고 갱신
- 미인증 사용자가 보호된 경로 접근 시 `/auth/login`으로 리다이렉트
- 인증 관련 페이지는 `/auth/*` 경로에 위치 (login, sign-up, forgot-password, update-password)

### 환경 변수

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

## UI 컴포넌트

- shadcn/ui (new-york 스타일) - `components/ui/`
- Radix UI 기반
- Tailwind CSS + CSS 변수
- lucide-react 아이콘
- next-themes로 다크모드 지원

## 코드 스타일 가이드

### Prettier 설정

- 세미콜론: 사용
- 따옴표: 큰따옴표 (`"`)
- 들여쓰기: 2칸
- Tailwind 클래스 자동 정렬 (`prettier-plugin-tailwindcss`)

### import 순서 규칙

ESLint `import-x/order` 규칙에 따라 자동 정렬됩니다:

1. React, Next.js
2. 외부 패키지 (npm)
3. 내부 모듈 (`@/`)
4. 상대 경로
5. 타입 import

### 설정 파일

- `.prettierrc` - Prettier 설정
- `.prettierignore` - Prettier 제외 파일
- `.editorconfig` - 에디터 설정
- `eslint.config.mjs` - ESLint Flat Config

### Supabase 클라이언트 사용 시 주의사항

1. **Server Components/Route Handlers**:

   ```typescript
   import { createClient } from "@/lib/supabase/server";

   export default async function ServerComponent() {
     // 매번 새로 생성 (전역 변수 X)
     const supabase = await createClient();
     const { data } = await supabase.from("table").select();
   }
   ```

2. **Client Components**:

   ```typescript
   "use client";
   import { createClient } from "@/lib/supabase/client";

   export default function ClientComponent() {
     const supabase = createClient();
     // ...
   }
   ```

3. **Middleware 수정 시**:
   - `createServerClient`와 `supabase.auth.getClaims()` 사이에 코드를 추가하지 말 것
   - 새로운 Response 객체를 만들 경우 반드시 쿠키를 복사할 것

### TypeScript 타입

- Supabase 데이터베이스 타입은 `lib/supabase/database.types.ts`에 정의됨
- 타입 생성: Supabase CLI를 사용하여 자동 생성 가능

## MCP 서버 설정

프로젝트는 다음 MCP 서버를 사용합니다:

- **supabase**: Supabase 데이터베이스 연동
- **playwright**: 브라우저 자동화
- **context7**: 문서 검색
- **shadcn**: shadcn/ui 컴포넌트 관리
- **shrimp-task-manager**: 작업 관리

## Git Hooks

프로젝트는 Husky를 사용하여 커밋 전 자동 검증을 수행합니다:

- **pre-commit**: 스테이지된 파일에 대해 ESLint + Prettier 자동 실행
- 커밋 전 자동으로 코드 품질 검사 및 포맷팅 수행

## 추가 참고사항

- **Turbopack**: 개발 서버는 Turbopack을 사용하여 더 빠른 개발 경험 제공
- **폰트**: Geist Sans 폰트를 기본으로 사용
- **다크 모드**: next-themes를 통해 시스템 설정 기반 자동 전환 지원
