# Development Guidelines

## 프로젝트 개요

| 항목              | 내용                         |
| ----------------- | ---------------------------- |
| 프레임워크        | Next.js 15 (App Router)      |
| 인증/데이터베이스 | Supabase                     |
| UI 컴포넌트       | shadcn/ui (new-york 스타일)  |
| 스타일링          | Tailwind CSS                 |
| 언어              | TypeScript (엄격 모드)       |
| 아이콘            | lucide-react                 |
| 테마              | next-themes (다크 모드 지원) |

---

## 디렉토리 구조 규칙

### 파일 배치

| 디렉토리         | 용도                | 규칙                                   |
| ---------------- | ------------------- | -------------------------------------- |
| `app/`           | 페이지 및 라우트    | App Router 규칙 준수                   |
| `app/auth/`      | 인증 관련 페이지    | login, sign-up, forgot-password 등     |
| `app/protected/` | 인증 필수 페이지    | 미인증 시 `/auth/login`으로 리다이렉트 |
| `components/`    | 재사용 컴포넌트     | 비즈니스 로직 컴포넌트 배치            |
| `components/ui/` | shadcn/ui 컴포넌트  | **직접 수정 금지**                     |
| `lib/`           | 유틸리티 함수       | 공통 유틸리티                          |
| `lib/supabase/`  | Supabase 클라이언트 | 3가지 클라이언트 패턴                  |
| `docs/`          | 문서화              | PRD, ROADMAP 등                        |

### 새 파일 생성 규칙

- **페이지 추가**: `app/[경로]/page.tsx` 생성
- **레이아웃 추가**: `app/[경로]/layout.tsx` 생성
- **API 라우트**: `app/api/[경로]/route.ts` 생성
- **컴포넌트 추가**: `components/[컴포넌트명].tsx` 생성
- **UI 컴포넌트 추가**: `npx shadcn@latest add [컴포넌트명]` 실행

---

## Supabase 클라이언트 사용 규칙

### 클라이언트 선택 기준

| 사용 위치          | 클라이언트 파일          | import 경로             |
| ------------------ | ------------------------ | ----------------------- |
| Server Components  | `lib/supabase/server.ts` | `@/lib/supabase/server` |
| Client Components  | `lib/supabase/client.ts` | `@/lib/supabase/client` |
| Middleware (proxy) | `lib/supabase/proxy.ts`  | `@/lib/supabase/proxy`  |

### 올바른 사용법

```typescript
// Server Component - 올바른 예시
import { createClient } from "@/lib/supabase/server";

export default async function ServerComponent() {
  const supabase = await createClient(); // 함수 내에서 생성
  const { data } = await supabase.from("table").select();
  return <div>{JSON.stringify(data)}</div>;
}
```

```typescript
// Client Component - 올바른 예시
"use client";
import { createClient } from "@/lib/supabase/client";

export default function ClientComponent() {
  const handleClick = async () => {
    const supabase = createClient(); // 함수 내에서 생성
    const { data } = await supabase.from("table").select();
  };
  return <button onClick={handleClick}>Load</button>;
}
```

### 잘못된 사용법

```typescript
// 금지: 전역 변수에 클라이언트 저장
const supabase = createClient(); // 모듈 스코프에서 생성 금지

export default function Component() {
  // supabase 사용...
}
```

---

## 컴포넌트 작성 규칙

### Client Components

- 파일 최상단에 `"use client"` 지시어 필수
- 상태 관리, 이벤트 핸들러 사용 시 필수
- Supabase 클라이언트는 `@/lib/supabase/client` 사용

### Server Components

- `"use client"` 없이 작성
- `async` 함수로 데이터 페칭 가능
- Supabase 클라이언트는 `@/lib/supabase/server` 사용

### 스타일링 규칙

- Tailwind CSS 클래스 사용
- 조건부 클래스: `cn()` 유틸리티 사용 (`@/lib/utils`)
- 반응형: `md:`, `lg:` 등 Tailwind 브레이크포인트 사용

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "flex flex-col gap-4",
  isActive && "bg-accent",
  className
)} />
```

### 아이콘 사용

```typescript
import { IconName } from "lucide-react";

<IconName size={16} strokeWidth={2} />
```

---

## 인증 흐름 규칙

### 라우트 보호

| 경로           | 인증 요구 | 동작                                   |
| -------------- | --------- | -------------------------------------- |
| `/auth/*`      | 불필요    | 인증 페이지 (login, sign-up 등)        |
| `/protected/*` | 필수      | 미인증 시 `/auth/login`으로 리다이렉트 |
| `/`            | 불필요    | 공개 페이지                            |

### 인증 상태 확인

```typescript
// Server Component에서 인증 확인
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

async function checkAuth() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    redirect("/auth/login");
  }

  return data.claims;
}
```

### 새 보호된 페이지 추가

1. `app/protected/[새경로]/page.tsx` 생성
2. 페이지 내에서 `supabase.auth.getClaims()` 호출
3. 인증 실패 시 `/auth/login`으로 리다이렉트

---

## UI 컴포넌트 추가 규칙

### shadcn/ui 컴포넌트 추가

```bash
# 새 컴포넌트 추가
npx shadcn@latest add [컴포넌트명]

# 예시
npx shadcn@latest add dialog
npx shadcn@latest add toast
```

### 컴포넌트 사용

```typescript
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
```

### 컴포넌트 커스터마이징

- `components/ui/` 내 파일 직접 수정 **금지**
- 커스터마이징 필요 시 래퍼 컴포넌트 생성

```typescript
// components/custom-button.tsx
import { Button, ButtonProps } from "@/components/ui/button";

export function CustomButton(props: ButtonProps) {
  return <Button className="custom-styles" {...props} />;
}
```

---

## 코드 품질 규칙

### 필수 검사

```bash
# 작업 완료 후 반드시 실행
npm run check-all
```

### 개별 검사

| 명령어              | 용도                 |
| ------------------- | -------------------- |
| `npm run typecheck` | TypeScript 타입 검사 |
| `npm run lint`      | ESLint 검사          |
| `npm run lint:fix`  | ESLint 자동 수정     |
| `npm run format`    | Prettier 포맷팅      |

### 코드 스타일

| 항목      | 규칙           |
| --------- | -------------- |
| 들여쓰기  | 2칸            |
| 따옴표    | 큰따옴표 (`"`) |
| 세미콜론  | 사용           |
| 후행 쉼표 | ES5 호환       |

### import 순서

1. React, Next.js
2. 외부 패키지 (npm)
3. 내부 모듈 (`@/`)
4. 상대 경로
5. 타입 import

---

## 금지 사항

### Supabase 관련

- **금지**: Supabase 클라이언트를 전역 변수에 저장
- **금지**: Server Component에서 `@/lib/supabase/client` 사용
- **금지**: Client Component에서 `@/lib/supabase/server` 사용

### Middleware 관련

- **금지**: `proxy.ts`의 `createServerClient`와 `supabase.auth.getClaims()` 사이에 코드 추가
- **금지**: Middleware에서 새 Response 객체 생성 시 쿠키 복사 누락

### UI 관련

- **금지**: `components/ui/` 디렉토리 내 파일 직접 수정
- **금지**: shadcn/ui 컴포넌트 수동 생성 (반드시 CLI 사용)

### 코드 품질

- **금지**: `npm run check-all` 실패 상태에서 커밋
- **금지**: TypeScript `any` 타입 무분별한 사용
- **금지**: ESLint 규칙 무시 (`// eslint-disable`) 남용

---

## AI 의사결정 가이드

### 파일 위치 결정

```
Q: 새 컴포넌트를 어디에 배치할까?
├─ UI 기본 컴포넌트? → shadcn CLI 사용
├─ 인증 관련? → components/ 루트에 배치
├─ 특정 페이지 전용? → 해당 페이지 폴더 또는 components/에 배치
└─ 공통 유틸리티? → lib/에 배치
```

### 컴포넌트 타입 결정

```
Q: Server vs Client Component?
├─ 상태(useState) 필요? → Client Component
├─ 이벤트 핸들러 필요? → Client Component
├─ 브라우저 API 필요? → Client Component
├─ 데이터 페칭만? → Server Component
└─ 정적 렌더링만? → Server Component
```

### Supabase 클라이언트 선택

```
Q: 어떤 Supabase 클라이언트?
├─ Server Component/Route Handler? → @/lib/supabase/server
├─ Client Component? → @/lib/supabase/client
└─ Middleware? → @/lib/supabase/proxy
```

### 인증 필요 여부

```
Q: 이 페이지에 인증이 필요한가?
├─ 사용자 데이터 표시? → /protected/ 하위에 배치
├─ 공개 콘텐츠? → /app/ 루트에 배치
└─ 인증 흐름? → /auth/ 하위에 배치
```

---

## 관련 파일 동시 수정 규칙

### 환경 변수 추가 시

- `.env.local` 수정
- `.env.example` 동시 수정 (값 제외)

### 새 UI 컴포넌트 추가 시

- `npx shadcn@latest add` 실행
- 필요시 `components.json` 설정 확인

### 데이터베이스 스키마 변경 시

- Supabase 대시보드에서 변경
- `lib/supabase/database.types.ts` 재생성

### 문서 업데이트 필요 시

- 기능 추가/변경 → `docs/PRD.md` 업데이트
- 작업 완료 → `docs/ROADMAP.md` 체크
