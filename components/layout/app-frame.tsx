import { cn } from "@/lib/utils";

interface AppFrameProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * AppFrame 컴포넌트
 *
 * 모바일 퍼스트 레이아웃의 핵심 컴포넌트입니다.
 * - 모바일: 전체 너비 사용
 * - 데스크톱: 430px 고정 너비 컨테이너를 중앙에 배치하고 그라데이션 배경 적용
 */
export function AppFrame({ children, className }: AppFrameProps) {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-background via-background to-muted/20">
      {/* 데스크톱에서만 보이는 장식 요소 */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="absolute left-1/4 top-1/4 h-72 w-72 rounded-full bg-brand-primary/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-brand-secondary/5 blur-3xl" />
      </div>

      {/* 메인 컨테이너 */}
      <div
        className={cn(
          // 모바일: 전체 너비
          "relative mx-auto w-full",
          // 데스크톱: 430px 고정 너비, 그림자 효과
          "lg:max-w-[430px] lg:shadow-2xl lg:shadow-black/10",
          className
        )}
      >
        {/* 앱 콘텐츠 영역 */}
        <div className="relative min-h-screen bg-background lg:border-x">
          {children}
        </div>
      </div>
    </div>
  );
}
