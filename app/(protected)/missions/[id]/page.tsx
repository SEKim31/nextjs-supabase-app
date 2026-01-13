"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { Plus } from "lucide-react";

import {
  MissionHeader,
  MissionInfoCard,
  MonthlyCalendarSection,
  VerificationFeedSection,
} from "@/app/(protected)/missions/_components";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { MOCK_CHEERS } from "@/lib/mocks/cheers";
import { MOCK_USER_IDS } from "@/lib/mocks/helpers";
import { getMockMissionById } from "@/lib/mocks/missions";
import {
  createVerificationFeeds,
  getMockVerificationsForMission,
} from "@/lib/mocks/verifications";
import type {
  Mission,
  VerificationWithCheers,
  VerificationWithUser,
} from "@/lib/types/database";

/**
 * 미션 상세 페이지
 * 미션 정보, 월간 캘린더, 인증 피드 표시
 */
export default function MissionDetailPage() {
  const params = useParams();
  const router = useRouter();
  const missionId = params.id as string;

  // 현재 사용자 ID (하드코딩 - 실제로는 auth에서 가져옴)
  const currentUserId = MOCK_USER_IDS.USER_1;

  const [mission, setMission] = useState<Mission | null>(null);
  const [verifications, setVerifications] = useState<
    (VerificationWithUser & VerificationWithCheers)[]
  >([]);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // 더미 데이터 로드
  useEffect(() => {
    const missionData = getMockMissionById(missionId);
    const verificationsData = getMockVerificationsForMission(missionId);

    // 인증 데이터에 사용자 정보 및 응원 정보 추가
    const feedData = createVerificationFeeds(verificationsData, MOCK_CHEERS);

    setMission(missionData || null);
    setVerifications(feedData);
  }, [missionId]);

  // 수정 버튼 클릭 핸들러
  const handleEdit = () => {
    router.push(`/missions/${missionId}/edit`);
  };

  // 삭제 버튼 클릭 핸들러
  const handleDelete = () => {
    setIsDeleteDialogOpen(true);
  };

  // 삭제 확인 핸들러
  const handleConfirmDelete = () => {
    // TODO: 실제 삭제 API 호출
    // eslint-disable-next-line no-console
    console.log("미션 삭제:", missionId);

    // 그룹 상세 페이지로 이동
    if (mission) {
      router.push(`/groups/${mission.group_id}`);
    }
  };

  // 응원하기 핸들러
  const handleCheer = (verificationId: string) => {
    // TODO: 실제 응원 API 호출
    // eslint-disable-next-line no-console
    console.log("응원하기:", verificationId);
  };

  // 로딩 또는 미션이 없는 경우
  if (!mission) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-muted-foreground">미션을 찾을 수 없습니다.</p>
      </div>
    );
  }

  // 인증 날짜 추출 (캘린더 하이라이트용)
  const verificationDates = verifications.map((v) => v.verified_at);

  return (
    <div className="bg-background min-h-screen pb-20">
      {/* 헤더 */}
      <MissionHeader
        missionTitle={mission.title}
        backUrl={`/groups/${mission.group_id}`}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {/* 메인 콘텐츠 */}
      <main className="container mx-auto space-y-6 p-4">
        {/* 미션 정보 카드 */}
        <MissionInfoCard
          description={mission.description}
          repeatType={mission.repeat_type}
          repeatDays={mission.repeat_days}
          verificationType={mission.verification_type}
        />

        {/* 월간 캘린더 섹션 */}
        <MonthlyCalendarSection verificationDates={verificationDates} />

        {/* 인증 피드 섹션 */}
        <VerificationFeedSection
          verifications={verifications}
          currentUserId={currentUserId}
          onCheer={handleCheer}
        />
      </main>

      {/* 하단 FAB: 인증하기 버튼 */}
      <div className="fixed right-6 bottom-6">
        <Button size="lg" className="h-14 w-14 rounded-full shadow-lg" asChild>
          <Link href={`/missions/${missionId}/verify`}>
            <Plus className="h-6 w-6" />
            <span className="sr-only">인증하기</span>
          </Link>
        </Button>
      </div>

      {/* 삭제 확인 다이얼로그 */}
      <AlertDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>미션을 삭제하시겠습니까?</AlertDialogTitle>
            <AlertDialogDescription>
              이 작업은 되돌릴 수 없습니다. 미션과 관련된 모든 인증 기록이
              삭제됩니다.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>취소</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmDelete}>
              삭제
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
