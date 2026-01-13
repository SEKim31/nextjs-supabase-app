import { Suspense } from "react";

import Link from "next/link";

import { Camera, Heart, Users } from "lucide-react";

import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* 헤더 */}
      <header className="bg-background/95 supports-backdrop-filter:bg-background/60 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-brand-primary text-2xl font-bold">
              하루모아
            </span>
          </Link>

          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/auth/login">로그인</Link>
            </Button>
            <Button
              asChild
              className="bg-brand-primary hover:bg-brand-primary/90"
            >
              <Link href="/auth/sign-up">시작하기</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* 히어로 섹션 */}
      <section className="container flex flex-1 flex-col items-center justify-center space-y-8 py-20 text-center md:py-32">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            습관을 함께, <span className="text-brand-primary">하루모아</span>
          </h1>
          <p className="text-muted-foreground mx-auto max-w-[700px] text-lg md:text-xl">
            혼자서는 어려운 습관 만들기, 이제 친구들과 함께해보세요.
            <br />
            매일의 작은 실천이 모여 큰 변화를 만듭니다.
          </p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          <Button
            size="lg"
            asChild
            className="bg-brand-primary hover:bg-brand-primary/90"
          >
            <Link href="/auth/sign-up">무료로 시작하기</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">기능 알아보기</Link>
          </Button>
        </div>
      </section>

      {/* 기능 소개 섹션 */}
      <section id="features" className="container space-y-12 py-20 md:py-32">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            하루모아의 특별한 기능
          </h2>
          <p className="text-muted-foreground mx-auto mt-4 max-w-[600px] md:text-lg">
            함께하는 습관 만들기를 위한 모든 것
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {/* 기능 카드 1: 그룹 습관 */}
          <Card className="hover:border-brand-primary border-2 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="bg-brand-primary/10 mb-4 flex h-14 w-14 items-center justify-center rounded-lg">
                <Users className="text-brand-primary h-7 w-7" />
              </div>
              <CardTitle className="text-2xl">그룹 습관 만들기</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                친구들과 함께 습관 그룹을 만들고, 같은 목표를 향해 나아가세요.
                함께하면 더 쉽고 재미있습니다.
              </p>
            </CardContent>
          </Card>

          {/* 기능 카드 2: 데일리 인증 */}
          <Card className="hover:border-brand-primary border-2 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="bg-brand-primary/10 mb-4 flex h-14 w-14 items-center justify-center rounded-lg">
                <Camera className="text-brand-primary h-7 w-7" />
              </div>
              <CardTitle className="text-2xl">데일리 인증</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                매일 사진으로 습관 실천을 인증하세요. 나의 성장 과정을 기록하고
                친구들과 공유할 수 있습니다.
              </p>
            </CardContent>
          </Card>

          {/* 기능 카드 3: 응원 시스템 */}
          <Card className="hover:border-brand-primary border-2 transition-all hover:shadow-lg">
            <CardHeader>
              <div className="bg-brand-primary/10 mb-4 flex h-14 w-14 items-center justify-center rounded-lg">
                <Heart className="text-brand-primary h-7 w-7" />
              </div>
              <CardTitle className="text-2xl">응원하고 격려하기</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                친구들의 인증에 좋아요와 댓글로 응원을 보내세요. 서로 격려하며
                함께 성장하는 즐거움을 경험하세요.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="bg-muted/50 border-t">
        <div className="container flex flex-col items-center justify-center space-y-6 py-20 text-center md:py-32">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            지금 바로 시작하세요
          </h2>
          <p className="text-muted-foreground max-w-[600px] md:text-lg">
            하루모아와 함께 습관을 만들고, 목표를 달성하세요.
            <br />
            가입은 무료이며, 바로 시작할 수 있습니다.
          </p>
          <Button
            size="lg"
            asChild
            className="bg-brand-primary hover:bg-brand-primary/90"
          >
            <Link href="/auth/sign-up">무료로 시작하기</Link>
          </Button>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="border-t">
        <div className="container flex flex-col items-center justify-between gap-4 py-8 md:flex-row">
          <p className="text-muted-foreground text-sm">
            © 2026 하루모아. All rights reserved.
          </p>
          <Suspense fallback={<div className="h-9 w-9" />}>
            <ThemeSwitcher />
          </Suspense>
        </div>
      </footer>
    </main>
  );
}
