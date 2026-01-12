"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import { GroupCard } from "@/components/common/group-card";
import { Button } from "@/components/ui/button";
import { getMockGroupCardsForUser } from "@/lib/mocks/groups";
import { MOCK_USER_IDS } from "@/lib/mocks/helpers";

import { EmptyGroupState } from "../dashboard/_components/empty-group-state";

/**
 * 그룹 목록 페이지
 * 사용자가 참여 중인 그룹 목록을 표시합니다.
 */
export default function GroupsPage() {
  const router = useRouter();

  // 더미 데이터: 사용자 1의 그룹 목록
  const groups = getMockGroupCardsForUser(MOCK_USER_IDS.USER_1);

  // 그룹이 없을 때 EmptyGroupState 표시
  if (groups.length === 0) {
    return <EmptyGroupState />;
  }

  return (
    <div className="container mx-auto p-4">
      {/* 헤더 */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">내 그룹</h1>
        <p className="mt-1 text-muted-foreground">
          참여 중인 그룹을 확인하고 관리하세요
        </p>
      </div>

      {/* 그룹 카드 목록 */}
      <div className="grid grid-cols-1 gap-4">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            onClick={() => router.push(`/groups/${group.id}`)}
          />
        ))}
      </div>

      {/* 플로팅 버튼 - 새 그룹 만들기 */}
      <Button
        asChild
        size="lg"
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full p-0 shadow-lg"
      >
        <Link href="/groups/new">
          <Plus className="h-6 w-6" />
          <span className="sr-only">새 그룹 만들기</span>
        </Link>
      </Button>
    </div>
  );
}
