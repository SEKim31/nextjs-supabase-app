interface StatsHeaderProps {
  /** 헤더 제목 */
  title?: string;
  /** 헤더 부제목 (선택사항) */
  subtitle?: string;
}

/**
 * 통계 페이지 상단 헤더 컴포넌트
 * 페이지 제목과 부제목을 표시합니다.
 */
export function StatsHeader({
  title = "통계",
  subtitle = "미션 달성 현황을 확인하세요",
}: StatsHeaderProps) {
  return (
    <div className="space-y-1 px-4 py-6">
      <h1 className="text-2xl font-bold">{title}</h1>
      {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
    </div>
  );
}
