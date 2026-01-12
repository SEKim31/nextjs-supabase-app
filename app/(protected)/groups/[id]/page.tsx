"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import {
  GroupHeader,
  InviteShareModal,
  MemberSection,
  MissionListSection,
  WeeklyStatsSection,
} from "@/app/(protected)/groups/_components";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getMockGroupById, getMockMembersForGroup } from "@/lib/mocks/groups";
import { getMockMissionsForGroup } from "@/lib/mocks/missions";
import type { Group, GroupMember, Mission, User } from "@/lib/types/database";
import { RELATIONSHIP_LABELS } from "@/lib/types/enums";

/**
 * 그룹 상세 페이지
 * 그룹 정보, 멤버 목록, 주간 달성률, 미션 목록 표시
 */
export default function GroupDetailPage() {
  const params = useParams();
  const groupId = params.id as string;

  const [group, setGroup] = useState<Group | null>(null);
  const [members, setMembers] = useState<(GroupMember & { user: User })[]>([]);
  const [missions, setMissions] = useState<Mission[]>([]);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);

  // 더미 데이터 로드
  useEffect(() => {
    const groupData = getMockGroupById(groupId);
    const membersData = getMockMembersForGroup(groupId);
    const missionsData = getMockMissionsForGroup(groupId);

    setGroup(groupData || null);
    setMembers(membersData);
    setMissions(missionsData);
  }, [groupId]);

  // 주간 달성률 하드코딩 데이터 (월~일)
  const weeklyData = [
    { label: "월", value: 80 },
    { label: "화", value: 100 },
    { label: "수", value: 60 },
    { label: "목", value: 90 },
    { label: "금", value: 100 },
    { label: "토", value: 70 },
    { label: "일", value: 85 },
  ];

  // 초대 버튼 클릭 핸들러
  const handleInvite = () => {
    setIsInviteModalOpen(true);
  };

  if (!group) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">그룹을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* 헤더 */}
      <GroupHeader groupName={group.name} />

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto space-y-6 p-4 pb-8">
        {/* 그룹 정보 카드 */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">그룹 정보</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {/* 그룹 설명 */}
            {group.description && (
              <p className="text-sm text-muted-foreground">
                {group.description}
              </p>
            )}

            {/* 관계 유형 뱃지 */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">관계 유형:</span>
              <Badge variant="secondary">
                {RELATIONSHIP_LABELS[group.relationship_type]}
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* 멤버 섹션 */}
        <MemberSection members={members} onInvite={handleInvite} />

        {/* 주간 통계 섹션 */}
        <WeeklyStatsSection weeklyData={weeklyData} />

        {/* 미션 목록 섹션 */}
        <MissionListSection missions={missions} />
      </main>

      {/* 초대 공유 모달 */}
      <InviteShareModal
        groupId={groupId}
        isOpen={isInviteModalOpen}
        onOpenChange={setIsInviteModalOpen}
      />
    </div>
  );
}
