import Link from "next/link";

import { Plus, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

/**
 * 그룹이 없을 때 표시되는 빈 상태 UI 컴포넌트
 * 그룹 생성 또는 초대 링크를 통한 참여를 유도합니다.
 */
export function EmptyGroupState() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="bg-muted mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full">
            <Users className="text-muted-foreground h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">아직 그룹이 없어요</CardTitle>
          <CardDescription className="text-base">
            혼자서는 힘들었던 습관,
            <br />
            소중한 사람과 함께 만들어보세요!
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button asChild className="w-full" size="lg">
            <Link href="/groups/new">
              <Plus className="mr-2 h-5 w-5" />새 그룹 만들기
            </Link>
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background text-muted-foreground px-2">
                또는
              </span>
            </div>
          </div>
          <p className="text-muted-foreground text-center text-sm">
            친구에게 받은 초대 링크로
            <br />
            그룹에 참여할 수 있어요
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
