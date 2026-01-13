/**
 * 전역 로딩 UI
 * Next.js App Router에서 페이지 로딩 시 자동으로 표시되는 Suspense 폴백
 */
export default function Loading() {
  return (
    <div className="bg-background flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* 스피너 애니메이션 */}
        <div className="border-muted border-t-primary h-12 w-12 animate-spin rounded-full border-4" />

        {/* 로딩 텍스트 */}
        <p className="text-muted-foreground text-sm">로딩 중...</p>
      </div>
    </div>
  );
}
