import { Suspense } from "react";

import { AppFrame } from "@/components/layout/app-frame";
import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import { Header } from "@/components/layout/header";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppFrame>
      <div className="min-h-screen-dynamic flex flex-col">
        {/* 헤더 - Safe Area 상단 대응 */}
        <Header className="pt-safe" />

        {/* 메인 콘텐츠 영역 */}
        {/* pb-16: 하단 탭바 높이만큼 여백 */}
        {/* pb-safe: Safe Area 하단 여백 추가 (iOS 홈바 등) */}
        <main className="pb-safe flex-1 pb-16">{children}</main>

        {/* 하단 탭바 */}
        <Suspense>
          <BottomTabBar />
        </Suspense>
      </div>
    </AppFrame>
  );
}
