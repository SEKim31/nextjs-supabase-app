# TodayOverviewCard 컴포넌트

## 개요

오늘의 미션 완료 현황을 시각적으로 표시하는 카드 컴포넌트입니다. Progress 바를 통해 달성률을 직관적으로 확인할 수 있습니다.

## 위치

```
app/(protected)/stats/_components/today-overview-card.tsx
```

## Props

```typescript
interface TodayOverviewCardProps {
  completedMissions: number; // 완료된 미션 수
  totalMissions: number; // 전체 미션 수
  completionRate: number; // 완료율 (0.0 ~ 1.0)
}
```

## 사용 예시

### 기본 사용법

```typescript
import { TodayOverviewCard } from "@/app/(protected)/stats/_components";
import { getMockTodayStatus, getCurrentUserId } from "@/lib/mocks";

export default function StatsPage() {
  const userId = getCurrentUserId();
  const todayStatus = getMockTodayStatus(userId);

  return (
    <div className="space-y-6 p-4">
      <TodayOverviewCard
        completedMissions={todayStatus.completedMissions}
        totalMissions={todayStatus.totalMissions}
        completionRate={todayStatus.completionRate}
      />
    </div>
  );
}
```

### 다양한 완료율 케이스

```typescript
// 0% 완료
<TodayOverviewCard
  completedMissions={0}
  totalMissions={5}
  completionRate={0}
/>

// 40% 완료
<TodayOverviewCard
  completedMissions={2}
  totalMissions={5}
  completionRate={0.4}
/>

// 100% 완료
<TodayOverviewCard
  completedMissions={5}
  totalMissions={5}
  completionRate={1.0}
/>

// 미션 없음
<TodayOverviewCard
  completedMissions={0}
  totalMissions={0}
  completionRate={0}
/>
```

## UI 구조

```
Card
├── CardHeader
│   └── CardTitle: "오늘의 현황"
└── CardContent
    ├── 완료 미션 수 텍스트
    └── Progress 바 + 퍼센트 표시
```

## 주요 기능

1. **미션 완료 현황 표시**: "완료된 미션 X개 / 전체 Y개" 형식으로 표시
2. **Progress 바**: completionRate를 0-100% 범위로 변환하여 시각화
3. **퍼센트 표시**: 우측 정렬로 정확한 퍼센트 값 표시

## 디자인 특징

- **shadcn/ui Card 컴포넌트** 사용
- **shadcn/ui Progress 컴포넌트** 사용
- **Tailwind CSS** 스타일링
- **반응형 디자인** 지원
- **다크모드** 지원 (next-themes)

## 테스트

테스트 페이지에서 다양한 케이스를 확인할 수 있습니다:

```
http://localhost:3000/stats/test-today-overview
```

## 관련 파일

- `components/ui/card.tsx` - Card 컴포넌트
- `components/ui/progress.tsx` - Progress 컴포넌트
- `lib/mocks/index.ts` - getMockTodayStatus 함수
- `app/(protected)/stats/test-today-overview/page.tsx` - 테스트 페이지

## 검증 완료 항목

- ✅ TypeScript 타입 에러 없음
- ✅ ESLint 검사 통과
- ✅ Prettier 포맷팅 적용
- ✅ 프로덕션 빌드 성공
- ✅ 0% ~ 100% 범위에서 정상 동작
- ✅ Progress 바가 completionRate에 따라 적절히 표시
- ✅ Props를 받아 올바르게 렌더링
