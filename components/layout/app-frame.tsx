import { MOBILE_FRAME_WIDTH } from "@/lib/constants/layout";
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
 * - 데스크톱: 고정 너비 컨테이너를 중앙에 배치하고 그라데이션 배경 적용
 */
export function AppFrame({ children, className }: AppFrameProps) {
  return (
    <div className="from-background via-background to-muted/20 relative min-h-screen w-full bg-linear-to-br">
      {/* 데스크톱에서만 보이는 장식 요소 */}
      <div className="pointer-events-none absolute inset-0 hidden lg:block">
        <div className="bg-brand-primary/5 absolute top-1/4 left-1/4 h-72 w-72 rounded-full blur-3xl" />
        <div className="bg-brand-secondary/5 absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full blur-3xl" />
      </div>

      {/* 메인 컨테이너 */}
      <div
        className={cn(
          // 모바일: 전체 너비
          "relative mx-auto w-full",
          // 데스크톱: 고정 너비, 그림자 효과
          `lg:max-w-[${MOBILE_FRAME_WIDTH}px] lg:shadow-2xl lg:shadow-black/10`,
          className
        )}
      >
        {/* 앱 콘텐츠 영역 */}
        <div className="bg-background relative min-h-screen lg:border-x">
          {children}
        </div>
      </div>
    </div>
  );
}
