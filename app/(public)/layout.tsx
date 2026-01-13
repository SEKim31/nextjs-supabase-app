import { AppFrame } from "@/components/layout/app-frame";
import { PublicAuthBar } from "@/components/layout/public-auth-bar";
import { PublicHeader } from "@/components/layout/public-header";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppFrame>
      <div className="min-h-screen-dynamic flex flex-col">
        {/* 헤더 - Safe Area 상단 대응 */}
        <PublicHeader className="pt-safe" />

        {/* 메인 콘텐츠 영역 */}
        {/* pb-16: 하단 인증 바 높이만큼 여백 */}
        {/* pb-safe: Safe Area 하단 여백 추가 (iOS 홈바 등) */}
        <main className="pb-safe flex-1 pb-16">{children}</main>

        {/* 하단 인증 바 (로그인/회원가입) */}
        <PublicAuthBar />
      </div>
    </AppFrame>
  );
}
