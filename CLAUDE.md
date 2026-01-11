# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 개발 명령어

```bash
npm run dev      # 개발 서버 실행 (localhost:3000)
npm run build    # 프로덕션 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 실행
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
