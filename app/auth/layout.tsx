import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
}

/**
 * 인증 페이지 전용 레이아웃
 *
 * 로그인, 회원가입, 비밀번호 찾기 등 인증 관련 페이지에 공통 적용되는 레이아웃입니다.
 * - 모바일: 전체 너비 사용 (Safe Area 대응)
 * - 데스크톱: 430px 고정 너비 컨테이너를 중앙에 배치하고 그라데이션 배경 적용
 * - 하단 탭바 없는 단순한 레이아웃
 */
export default function AuthLayout({ children }: AuthLayoutProps) {
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
          // 데스크톱: 430px 고정 너비, 그림자 효과
          "lg:max-w-[430px] lg:shadow-2xl lg:shadow-black/10"
        )}
      >
        {/* 인증 콘텐츠 영역 */}
        <div className="bg-background relative min-h-screen lg:border-x">
          {/* Safe Area 대응 padding */}
          <div className="pb-safe pt-safe min-h-screen">{children}</div>
        </div>
      </div>
    </div>
  );
}
