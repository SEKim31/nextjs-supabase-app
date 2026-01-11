import { Suspense } from "react";

import { BottomTabBar } from "@/components/layout/bottom-tab-bar";
import { Header } from "@/components/layout/header";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* 헤더 */}
      <Header />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 pb-16">{children}</main>

      {/* 하단 탭바 */}
      <Suspense>
        <BottomTabBar />
      </Suspense>
    </div>
  );
}
