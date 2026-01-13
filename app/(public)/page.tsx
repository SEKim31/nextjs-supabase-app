import { Camera, Heart, Users } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* 히어로 섹션 */}
      <section className="flex flex-col items-center justify-center space-y-6 px-4 py-12 text-center">
        <div className="space-y-3">
          <h1 className="text-3xl font-bold tracking-tight">
            습관을 함께, <span className="text-brand-primary">하루모아</span>
          </h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            혼자서는 어려운 습관 만들기, 이제 친구들과 함께해보세요.
            <br />
            매일의 작은 실천이 모여 큰 변화를 만듭니다.
          </p>
        </div>
      </section>

      {/* 기능 소개 섹션 */}
      <section className="space-y-4 px-4 pb-8">
        <div className="text-center">
          <h2 className="text-xl font-bold">하루모아의 특별한 기능</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            함께하는 습관 만들기를 위한 모든 것
          </p>
        </div>

        {/* 기능 카드 (세로 배치) */}
        <div className="flex flex-col gap-4">
          {/* 기능 카드 1: 그룹 습관 */}
          <Card className="border-2">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="bg-brand-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Users className="text-brand-primary h-5 w-5" />
                </div>
                <CardTitle className="text-lg">그룹 습관 만들기</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                친구들과 함께 습관 그룹을 만들고, 같은 목표를 향해 나아가세요.
              </p>
            </CardContent>
          </Card>

          {/* 기능 카드 2: 데일리 인증 */}
          <Card className="border-2">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="bg-brand-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Camera className="text-brand-primary h-5 w-5" />
                </div>
                <CardTitle className="text-lg">데일리 인증</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                매일 사진으로 습관 실천을 인증하고 나의 성장 과정을 기록하세요.
              </p>
            </CardContent>
          </Card>

          {/* 기능 카드 3: 응원 시스템 */}
          <Card className="border-2">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-3">
                <div className="bg-brand-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <Heart className="text-brand-primary h-5 w-5" />
                </div>
                <CardTitle className="text-lg">응원하고 격려하기</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground text-sm">
                친구들의 인증에 좋아요와 댓글로 응원을 보내세요.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="bg-muted/50 border-t px-4 py-8 text-center">
        <h2 className="text-lg font-bold">지금 바로 시작하세요</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          하루모아와 함께 습관을 만들고, 목표를 달성하세요.
          <br />
          가입은 무료이며, 바로 시작할 수 있습니다.
        </p>
      </section>
    </div>
  );
}
