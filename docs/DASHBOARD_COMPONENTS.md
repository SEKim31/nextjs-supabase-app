# 대시보드 컴포넌트 구현 문서

## 개요

대시보드 페이지를 구성하는 6개의 핵심 컴포넌트가 구현되었습니다. 모든 컴포넌트는 TypeScript로 작성되었으며, Tailwind CSS와 shadcn/ui를 사용하여 스타일링되었습니다.

## 구현된 컴포넌트 목록

### 1. EmptyGroupState

**위치**: `app/(protected)/dashboard/_components/empty-group-state.tsx`

**목적**: 그룹이 없을 때 표시되는 빈 상태 UI

**주요 기능**:

- 그룹 생성 유도 CTA 버튼
- 초대 링크를 통한 참여 안내
- 친근한 메시지와 아이콘

**사용 예시**:

```tsx
<EmptyGroupState />
```

**UI 요소**:

- Users 아이콘
- "새 그룹 만들기" 버튼 → `/groups/new`로 이동
- 구분선 및 초대 링크 안내 문구

---

### 2. TodaySummaryCard

**위치**: `app/(protected)/dashboard/_components/today-summary-card.tsx`

**목적**: 오늘의 미션 진행 상황을 요약하여 표시

**Props**:
| 이름 | 타입 | 설명 |
|------|------|------|
| completedCount | number | 완료된 미션 수 |
| totalCount | number | 전체 미션 수 |
| dateString | string (선택) | 날짜 문자열 (예: "2024년 1월 12일") |

**주요 기능**:

- 완료/전체 미션 수 표시
- 진행률 계산 및 Progress Bar 표시
- 모든 미션 완료 시 축하 메시지
- 현재 날짜 표시

**사용 예시**:

```tsx
<TodaySummaryCard completedCount={1} totalCount={3} />
```

**특징**:

- 클라이언트 컴포넌트 (`"use client"`)
- 0으로 나누기 방지 로직 포함
- 모든 미션 완료 시 CheckCircle2 아이콘 표시

---

### 3. DashboardHeader

**위치**: `app/(protected)/dashboard/_components/dashboard-header.tsx`

**목적**: 대시보드 상단 헤더 (환영 메시지 및 날짜 표시)

**Props**:
| 이름 | 타입 | 설명 |
|------|------|------|
| userName | string (선택) | 사용자 닉네임 |
| dateString | string (선택) | 날짜 문자열 |

**주요 기능**:

- 시간대별 인사말 (아침/오후/저녁)
- 사용자 닉네임 표시
- 현재 날짜 및 요일 표시
- Calendar 아이콘

**사용 예시**:

```tsx
<DashboardHeader userName="김민준" />
```

**특징**:

- 클라이언트 컴포넌트
- 시간대 자동 감지 (0-12시: 아침, 12-18시: 오후, 18-24시: 저녁)

---

### 4. MissionSection

**위치**: `app/(protected)/dashboard/_components/mission-section.tsx`

**목적**: 미션 목록 섹션 (그룹별 구분)

**Props**:
| 이름 | 타입 | 설명 |
|------|------|------|
| missions | Mission[] | 미션 목록 |
| isLoading | boolean (선택) | 로딩 상태 |

**Mission 인터페이스**:

```typescript
interface Mission {
  id: string;
  title: string;
  groupName: string;
  isCompleted: boolean;
  completionRate: number; // 0-100
}
```

**주요 기능**:

- 그룹별로 미션 자동 분류
- 완료/미완료 상태 표시 (CheckCircle2 / Circle 아이콘)
- 그룹 내 전체 인증률 Badge 표시
- 미션 클릭 시 `/missions/[id]`로 이동
- 로딩 스켈레톤 지원

**사용 예시**:

```tsx
<MissionSection missions={SAMPLE_MISSIONS} isLoading={false} />
```

**특징**:

- 그룹별 Separator 자동 추가
- 미션이 없을 때 안내 메시지
- 각 미션 카드 hover 효과

---

### 5. FeedSection

**위치**: `app/(protected)/dashboard/_components/feed-section.tsx`

**목적**: 피드/활동 섹션 (그룹원들의 최근 인증 활동)

**Props**:
| 이름 | 타입 | 설명 |
|------|------|------|
| feeds | FeedItem[] | 피드 아이템 목록 |
| onCheer | (feedId: string) => void (선택) | 응원 버튼 클릭 핸들러 |
| isLoading | boolean (선택) | 로딩 상태 |

**FeedItem 인터페이스**:

```typescript
interface FeedItem {
  id: string;
  userName: string;
  userAvatar?: string;
  missionTitle: string;
  timeAgo: string; // 예: "10분 전"
  verificationType: "photo" | "text" | "check";
  photoUrl?: string; // 사진 타입인 경우
  text?: string; // 텍스트 타입인 경우
  cheerCount: number;
  isCheered: boolean;
}
```

**주요 기능**:

- 인증 타입별 표시 (사진/텍스트/완료)
- 사진 인증: Next.js Image 컴포넌트로 최적화
- 텍스트 인증: 텍스트 내용 표시
- 응원 버튼 ("최고야!") - Heart 아이콘
- 사용자 Avatar 표시
- 상대 시간 표시 (예: "10분 전")

**사용 예시**:

```tsx
<FeedSection
  feeds={SAMPLE_FEEDS}
  onCheer={(feedId) => {
    // 응원 API 호출
  }}
/>
```

**특징**:

- 클라이언트 컴포넌트
- 응원 상태에 따라 버튼 스타일 변경
- 로딩 스켈레톤 지원

---

### 6. QuickVerifyFab

**위치**: `app/(protected)/dashboard/_components/quick-verify-fab.tsx`

**목적**: 빠른 인증을 위한 Floating Action Button (FAB)

**Props**:
| 이름 | 타입 | 설명 |
|------|------|------|
| onClick | () => void (선택) | 버튼 클릭 핸들러 (Link 대신 커스텀 동작) |
| className | string (선택) | 추가 CSS 클래스 |

**주요 기능**:

- 화면 우측 하단에 고정
- Plus 아이콘
- 클릭 시 `/missions/verify`로 이동 (기본)
- 또는 커스텀 onClick 핸들러 실행
- Hover 시 확대 애니메이션
- Active 시 축소 애니메이션

**사용 예시**:

```tsx
{
  /* Link 기본 동작 */
}
<QuickVerifyFab />;

{
  /* 커스텀 동작 */
}
<QuickVerifyFab onClick={() => console.log("clicked")} />;
```

**특징**:

- 클라이언트 컴포넌트
- iOS Safe Area 대응 (`mb-safe`)
- z-index: 50 (하단 탭바보다 위)
- 하단 탭바와 겹치지 않도록 `bottom-20` 설정

---

## 대시보드 페이지 구조

**위치**: `app/(protected)/dashboard/page.tsx`

```tsx
"use client";

export default function DashboardPage() {
  // 그룹이 없는 경우
  if (!hasGroups) {
    return (
      <>
        <DashboardHeader userName={userName} />
        <EmptyGroupState />
      </>
    );
  }

  // 그룹이 있는 경우
  return (
    <>
      <DashboardHeader userName={userName} />

      <div className="space-y-6 pb-6">
        <div className="px-4">
          <TodaySummaryCard
            completedCount={completedCount}
            totalCount={totalCount}
          />
        </div>

        <Suspense fallback={<MissionSection missions={[]} isLoading={true} />}>
          <MissionSection missions={SAMPLE_MISSIONS} />
        </Suspense>

        <Suspense fallback={<FeedSection feeds={[]} isLoading={true} />}>
          <FeedSection
            feeds={SAMPLE_FEEDS}
            onCheer={(feedId) => {
              // TODO: 응원 API 호출
            }}
          />
        </Suspense>
      </div>

      <QuickVerifyFab />
    </>
  );
}
```

---

## 설치된 shadcn/ui 컴포넌트

구현 과정에서 다음 shadcn/ui 컴포넌트가 추가로 설치되었습니다:

- `skeleton` - 로딩 스켈레톤 UI
- `separator` - 구분선 컴포넌트

**설치 명령**:

```bash
npx shadcn@latest add skeleton separator
```

---

## 사용된 기존 shadcn/ui 컴포넌트

- `button` - 버튼
- `card` - 카드 컨테이너
- `badge` - 뱃지 (진행률, 미션 제목 등)
- `progress` - 진행률 바
- `avatar` - 사용자 프로필 이미지
- `checkbox` - 체크박스

---

## 스타일링 특징

### 반응형 디자인

- 모바일 우선 디자인
- Tailwind CSS의 유틸리티 클래스 사용
- `space-y-*`, `gap-*` 등으로 일관된 간격 유지

### 다크모드 지원

- Tailwind의 다크모드 클래스 자동 적용
- `text-muted-foreground`, `bg-card` 등 시맨틱 컬러 사용

### Safe Area 대응

- iOS 홈바 등을 고려한 `mb-safe`, `pb-safe` 클래스
- QuickVerifyFab에서 특히 중요

### 애니메이션

- `hover:scale-110`, `active:scale-95` - FAB 버튼
- `transition-colors` - 미션 카드 hover
- `animate-pulse` - 로딩 스켈레톤

---

## TODO: 향후 작업

### 데이터 연동

현재는 샘플 데이터로 구현되어 있으며, 다음 작업이 필요합니다:

1. **Supabase 데이터 페칭**
   - 사용자 정보 가져오기 (닉네임, 프로필 사진)
   - 그룹 목록 및 미션 목록 가져오기
   - 최근 인증 피드 가져오기

2. **응원 기능 API 연동**
   - `onCheer` 핸들러에 실제 API 호출 구현
   - 낙관적 UI 업데이트 적용

3. **실시간 업데이트**
   - Supabase Realtime을 사용한 실시간 피드 업데이트
   - 새 인증이 추가되면 자동으로 피드에 표시

4. **로딩 상태 관리**
   - React Query 또는 SWR을 사용한 데이터 페칭 및 캐싱
   - 에러 바운더리 추가

5. **성능 최적화**
   - 이미지 최적화 (Next.js Image loader 설정)
   - 무한 스크롤 또는 페이지네이션 구현 (피드 섹션)

---

## 테스트

### 코드 품질 검사

```bash
npm run check-all  # ✅ 통과
```

### 빌드 테스트

```bash
npm run build      # ✅ 성공
```

### 타입 체크

```bash
npm run typecheck  # ✅ 통과
```

---

## 컴포넌트 계층 구조

```
DashboardPage (Client Component)
├── DashboardHeader (Client Component)
├── EmptyGroupState (Server Component)
│   └── [그룹이 없을 때만 표시]
├── TodaySummaryCard (Client Component)
├── MissionSection (Server Component)
│   └── MissionCard
│       ├── CheckCircle2 / Circle Icon
│       ├── Badge (completionRate)
│       └── Link to /missions/[id]
├── FeedSection (Client Component)
│   └── FeedCard
│       ├── Avatar
│       ├── Badge (missionTitle)
│       ├── Image (사진 인증)
│       └── Button (응원)
└── QuickVerifyFab (Client Component)
```

---

## 참고 자료

- [Next.js 15 문서](https://nextjs.org/docs)
- [shadcn/ui 문서](https://ui.shadcn.com/)
- [Tailwind CSS 문서](https://tailwindcss.com/docs)
- [Lucide React 아이콘](https://lucide.dev/)
- [PRD.md](./PRD.md) - 프로젝트 요구사항
